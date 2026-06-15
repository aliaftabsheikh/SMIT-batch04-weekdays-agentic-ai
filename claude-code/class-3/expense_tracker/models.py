"""Data models and shared constants for the expense tracker.

Defines the predefined expense categories and lightweight dataclasses that
represent rows from the database. Keeping these in one place lets the business
logic (auth.py, expense.py) and the CLI (main.py) share a single source of
truth.
"""

from __future__ import annotations

from dataclasses import dataclass

# Predefined expense categories supported by the application (per spec).
CATEGORIES: list[str] = [
    "Food",
    "Transport",
    "Health",
    "Shopping",
    "Bills",
    "Travel",
    "Other",
]


@dataclass
class User:
    """A registered application user.

    Mirrors the ``users`` table. ``created_at`` is an ISO 8601 timestamp string.
    """

    id: int
    name: str
    email: str
    password_hash: str
    created_at: str


@dataclass
class Expense:
    """A single expense entry belonging to a user.

    Mirrors the ``expenses`` table. ``amount`` is in PKR and ``date`` is an
    ISO 8601 date string (``YYYY-MM-DD``).
    """

    id: int
    user_id: int
    amount: float
    category: str
    date: str
