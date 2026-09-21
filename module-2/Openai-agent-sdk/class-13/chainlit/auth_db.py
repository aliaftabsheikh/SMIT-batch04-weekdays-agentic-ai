"""Identity + persistence for the Nova chat app.

Two things have to be true before Chainlit will show chat history in the sidebar:

1. There must be an authenticated user. The /project/threads endpoint returns
   "unauthorized" when current_user is None (chainlit/server.py:967).
2. There must be a data layer, and it needs a storage provider, or every element
   (images, files) is dropped the moment a thread is reloaded.

Chainlit ships storage clients for S3/GCS/Azure but none for the local disk, so
LocalStorageClient below fills that gap by writing into public/, which Chainlit
already serves at /public/{path} (chainlit/server.py:265).
"""

import os
import sqlite3
from pathlib import Path
from typing import Any, Dict, Optional, Union

import aiofiles
import chainlit as cl
from chainlit.data.sql_alchemy import SQLAlchemyDataLayer
from chainlit.data.storage_clients.base import BaseStorageClient

APP_DIR = Path(__file__).parent
DB_PATH = APP_DIR / "chat_history.db"
SCHEMA_PATH = APP_DIR / "schema.sql"
UPLOADS_DIR = APP_DIR / "public" / "uploads"

# The identity every visitor is signed in as. Single-user by design: this is a
# local teaching app, not a multi-tenant deployment.
GUEST_IDENTIFIER = "guest"


def init_db() -> None:
    """Create the tables if they are missing.

    Runs the schema on every startup rather than only when the file is absent --
    every statement is IF NOT EXISTS, so this is idempotent, and it means adding a
    table to schema.sql doesn't require deleting the database by hand.
    """
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    with sqlite3.connect(DB_PATH) as conn:
        conn.executescript(SCHEMA_PATH.read_text())


class LocalStorageClient(BaseStorageClient):
    """Persists element payloads to public/uploads so they survive a reload."""

    def __init__(self, base_dir: Path = UPLOADS_DIR, url_prefix: str = "/public/uploads"):
        self.base_dir = base_dir
        self.url_prefix = url_prefix
        self.base_dir.mkdir(parents=True, exist_ok=True)

    def _resolve(self, object_key: str) -> Path:
        """Map an object key to a path, refusing anything that escapes base_dir.

        Keys are built from user id + element id + filename (sql_alchemy.py:609),
        and the filename comes from the user on upload, so "../" is reachable input.
        """
        target = (self.base_dir / object_key).resolve()
        if not target.is_relative_to(self.base_dir.resolve()):
            raise ValueError(f"Refusing to write outside uploads dir: {object_key}")
        return target

    async def upload_file(
        self,
        object_key: str,
        data: Union[bytes, str],
        mime: str = "application/octet-stream",
        overwrite: bool = True,
        content_disposition: Optional[str] = None,
    ) -> Dict[str, Any]:
        target = self._resolve(object_key)
        if target.exists() and not overwrite:
            return {"object_key": object_key, "url": f"{self.url_prefix}/{object_key}"}

        target.parent.mkdir(parents=True, exist_ok=True)
        if isinstance(data, str):
            data = data.encode("utf-8")
        async with aiofiles.open(target, "wb") as f:
            await f.write(data)

        return {"object_key": object_key, "url": f"{self.url_prefix}/{object_key}"}

    async def delete_file(self, object_key: str) -> bool:
        try:
            self._resolve(object_key).unlink(missing_ok=True)
            return True
        except (OSError, ValueError):
            return False

    async def get_read_url(self, object_key: str) -> str:
        return f"{self.url_prefix}/{object_key}"

    async def close(self) -> None:
        return None


@cl.header_auth_callback
def auth_from_header(headers) -> Optional[cl.User]:
    """Sign everyone in as the same guest user, with no login screen.

    When headerAuth is enabled the frontend POSTs /auth/header automatically on
    load and redirects straight into the app, so the login page never renders.
    """
    return cl.User(
        identifier=GUEST_IDENTIFIER,
        metadata={"role": "user", "provider": "header"},
    )


@cl.data_layer
def get_data_layer() -> SQLAlchemyDataLayer:
    return SQLAlchemyDataLayer(
        conninfo=f"sqlite+aiosqlite:///{DB_PATH}",
        storage_provider=LocalStorageClient(),
    )


init_db()
