"""Expense management: CRUD operations, filtering, and reporting.

Every operation is scoped by ``user_id`` so users can only see and modify their
own expenses. All persistence goes through db.py with parameterized queries.
"""

from __future__ import annotations

import sqlite3

import db
from models import CATEGORIES, Expense
from utils import parse_date


class ExpenseError(Exception):
    """Raised for invalid expense input (bad category, amount, or date)."""


def _row_to_expense(row: sqlite3.Row) -> Expense:
    return Expense(
        id=row["id"],
        user_id=row["user_id"],
        amount=row["amount"],
        category=row["category"],
        date=row["date"],
    )


def _validate(amount: float, category: str, date: str) -> str:
    """Validate expense fields and return the normalized ISO date string."""
    if amount <= 0:
        raise ExpenseError("Amount must be greater than zero.")
    if category not in CATEGORIES:
        raise ExpenseError(f"Category must be one of: {', '.join(CATEGORIES)}.")
    try:
        return parse_date(date).isoformat()
    except ValueError as exc:
        raise ExpenseError("Date must be in ISO format YYYY-MM-DD.") from exc


# --------------------------------------------------------------------------- #
# CRUD
# --------------------------------------------------------------------------- #
def add_expense(user_id: int, amount: float, category: str, date: str) -> Expense:
    """Create a new expense for the given user."""
    iso_date = _validate(amount, category, date)
    expense_id = db.execute(
        "INSERT INTO expenses (user_id, amount, category, date) VALUES (?, ?, ?, ?)",
        (user_id, round(amount, 2), category, iso_date),
    )
    expense = get_expense(expense_id, user_id)
    assert expense is not None  # just inserted
    return expense


def get_expense(expense_id: int, user_id: int) -> Expense | None:
    """Fetch a single expense owned by the user, or ``None``."""
    row = db.fetch_one(
        "SELECT * FROM expenses WHERE id = ? AND user_id = ?",
        (expense_id, user_id),
    )
    return _row_to_expense(row) if row else None


def list_expenses(user_id: int) -> list[Expense]:
    """Return all expenses for the user, newest date first."""
    rows = db.fetch_all(
        "SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC, id DESC",
        (user_id,),
    )
    return [_row_to_expense(row) for row in rows]


def update_expense(
    expense_id: int,
    user_id: int,
    amount: float,
    category: str,
    date: str,
) -> Expense:
    """Update an existing expense owned by the user.

    Raises ``ExpenseError`` if the expense does not exist or is not owned by
    the user.
    """
    if get_expense(expense_id, user_id) is None:
        raise ExpenseError("Expense not found.")
    iso_date = _validate(amount, category, date)
    db.execute(
        "UPDATE expenses SET amount = ?, category = ?, date = ? "
        "WHERE id = ? AND user_id = ?",
        (round(amount, 2), category, iso_date, expense_id, user_id),
    )
    updated = get_expense(expense_id, user_id)
    assert updated is not None
    return updated


def delete_expense(expense_id: int, user_id: int) -> bool:
    """Delete an expense owned by the user. Returns True if a row was removed."""
    if get_expense(expense_id, user_id) is None:
        return False
    db.execute(
        "DELETE FROM expenses WHERE id = ? AND user_id = ?",
        (expense_id, user_id),
    )
    return True


# --------------------------------------------------------------------------- #
# Filtering
# --------------------------------------------------------------------------- #
def filter_by_category(user_id: int, category: str) -> list[Expense]:
    """Return the user's expenses in a given category."""
    rows = db.fetch_all(
        "SELECT * FROM expenses WHERE user_id = ? AND category = ? "
        "ORDER BY date DESC, id DESC",
        (user_id, category),
    )
    return [_row_to_expense(row) for row in rows]


def filter_by_date(user_id: int, date: str) -> list[Expense]:
    """Return the user's expenses on a specific ISO date."""
    iso_date = parse_date(date).isoformat()
    rows = db.fetch_all(
        "SELECT * FROM expenses WHERE user_id = ? AND date = ? ORDER BY id DESC",
        (user_id, iso_date),
    )
    return [_row_to_expense(row) for row in rows]


def filter_by_date_range(user_id: int, start: str, end: str) -> list[Expense]:
    """Return the user's expenses within an inclusive ISO date range."""
    start_iso = parse_date(start).isoformat()
    end_iso = parse_date(end).isoformat()
    rows = db.fetch_all(
        "SELECT * FROM expenses WHERE user_id = ? AND date BETWEEN ? AND ? "
        "ORDER BY date DESC, id DESC",
        (user_id, start_iso, end_iso),
    )
    return [_row_to_expense(row) for row in rows]


# --------------------------------------------------------------------------- #
# Reporting
# --------------------------------------------------------------------------- #
def total_expenses(user_id: int) -> float:
    """Return the sum of all the user's expenses (0.0 if none)."""
    row = db.fetch_one(
        "SELECT COALESCE(SUM(amount), 0) AS total FROM expenses WHERE user_id = ?",
        (user_id,),
    )
    return float(row["total"]) if row else 0.0


def expenses_by_category(user_id: int) -> dict[str, float]:
    """Return a mapping of category -> total amount for the user."""
    rows = db.fetch_all(
        "SELECT category, SUM(amount) AS total FROM expenses "
        "WHERE user_id = ? GROUP BY category ORDER BY total DESC",
        (user_id,),
    )
    return {row["category"]: float(row["total"]) for row in rows}
