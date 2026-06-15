"""Database layer for the expense tracker.

All SQLite access lives here so the rest of the application never touches SQL
directly. Every query uses parameterized placeholders (``?``) to prevent SQL
injection. Business logic (auth.py, expense.py) calls the reusable helpers
below rather than opening its own connections.
"""

from __future__ import annotations

import os
import sqlite3
from typing import Any, Sequence

# Resolve the database path relative to this file so the app works regardless
# of the current working directory.
_BASE_DIR = os.path.dirname(os.path.abspath(__file__))
_DATA_DIR = os.path.join(_BASE_DIR, "data")
DB_PATH = os.path.join(_DATA_DIR, "expenses.db")


def get_connection() -> sqlite3.Connection:
    """Open a SQLite connection with row access by column name.

    Foreign key enforcement is enabled per-connection (SQLite defaults it off).
    """
    os.makedirs(_DATA_DIR, exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn


def init_db() -> None:
    """Create the ``users`` and ``expenses`` tables if they do not exist."""
    with get_connection() as conn:
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS users (
                id            INTEGER PRIMARY KEY AUTOINCREMENT,
                name          TEXT    NOT NULL,
                email         TEXT    NOT NULL UNIQUE,
                password_hash TEXT    NOT NULL,
                created_at    TEXT    NOT NULL
            )
            """
        )
        conn.execute(
            """
            CREATE TABLE IF NOT EXISTS expenses (
                id       INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id  INTEGER NOT NULL,
                amount   REAL    NOT NULL,
                category TEXT    NOT NULL,
                date     TEXT    NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id)
            )
            """
        )


def execute(query: str, params: Sequence[Any] = ()) -> int:
    """Run an INSERT/UPDATE/DELETE, commit, and return ``lastrowid``."""
    with get_connection() as conn:
        cursor = conn.execute(query, params)
        return cursor.lastrowid


def fetch_one(query: str, params: Sequence[Any] = ()) -> sqlite3.Row | None:
    """Run a SELECT and return the first matching row, or ``None``."""
    with get_connection() as conn:
        cursor = conn.execute(query, params)
        return cursor.fetchone()


def fetch_all(query: str, params: Sequence[Any] = ()) -> list[sqlite3.Row]:
    """Run a SELECT and return all matching rows."""
    with get_connection() as conn:
        cursor = conn.execute(query, params)
        return cursor.fetchall()
