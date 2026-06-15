"""User authentication: registration and login.

Business logic only — all persistence goes through db.py and all hashing
through utils.py.
"""

from __future__ import annotations

import sqlite3

import db
from models import User
from utils import hash_password, now_iso, verify_password


class AuthError(Exception):
    """Raised for expected authentication failures (e.g. duplicate email)."""


def _row_to_user(row: sqlite3.Row) -> User:
    return User(
        id=row["id"],
        name=row["name"],
        email=row["email"],
        password_hash=row["password_hash"],
        created_at=row["created_at"],
    )


def register(name: str, email: str, password: str) -> User:
    """Create a new user with a hashed password.

    Raises ``AuthError`` if the email is already registered.
    """
    email = email.strip().lower()
    if fetch_user_by_email(email) is not None:
        raise AuthError("An account with this email already exists.")

    try:
        user_id = db.execute(
            "INSERT INTO users (name, email, password_hash, created_at) "
            "VALUES (?, ?, ?, ?)",
            (name.strip(), email, hash_password(password), now_iso()),
        )
    except sqlite3.IntegrityError as exc:
        # Defensive: the UNIQUE constraint guards against a race after the
        # pre-check above.
        raise AuthError("An account with this email already exists.") from exc

    user = fetch_user_by_id(user_id)
    assert user is not None  # just inserted
    return user


def login(email: str, password: str) -> User | None:
    """Return the matching user if credentials are valid, else ``None``."""
    user = fetch_user_by_email(email.strip().lower())
    if user is None or not verify_password(password, user.password_hash):
        return None
    return user


def fetch_user_by_email(email: str) -> User | None:
    row = db.fetch_one("SELECT * FROM users WHERE email = ?", (email,))
    return _row_to_user(row) if row else None


def fetch_user_by_id(user_id: int) -> User | None:
    row = db.fetch_one("SELECT * FROM users WHERE id = ?", (user_id,))
    return _row_to_user(row) if row else None
