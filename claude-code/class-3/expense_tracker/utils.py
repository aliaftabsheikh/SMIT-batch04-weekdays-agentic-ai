"""Shared utilities: password hashing, date handling, formatting, and input.

These helpers are deliberately dependency-free (standard library only) and are
reused across auth.py, expense.py, and main.py.
"""

from __future__ import annotations

import hashlib
import hmac
import os
from datetime import date, datetime

from models import CATEGORIES

# PBKDF2 parameters. 200k iterations of SHA-256 is a reasonable cost for a
# local application in 2026.
_PBKDF2_ITERATIONS = 200_000
_SALT_BYTES = 16


# --------------------------------------------------------------------------- #
# Password hashing
# --------------------------------------------------------------------------- #
def hash_password(password: str) -> str:
    """Hash a password with a random per-user salt.

    Returns a ``salt$hash`` string (both hex) suitable for storing in the DB.
    """
    salt = os.urandom(_SALT_BYTES)
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, _PBKDF2_ITERATIONS
    )
    return f"{salt.hex()}${digest.hex()}"


def verify_password(password: str, stored: str) -> bool:
    """Check a plaintext password against a stored ``salt$hash`` value."""
    try:
        salt_hex, hash_hex = stored.split("$", 1)
        salt = bytes.fromhex(salt_hex)
    except (ValueError, AttributeError):
        return False
    digest = hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), salt, _PBKDF2_ITERATIONS
    )
    # Constant-time comparison to avoid timing side channels.
    return hmac.compare_digest(digest.hex(), hash_hex)


# --------------------------------------------------------------------------- #
# Date handling (ISO 8601)
# --------------------------------------------------------------------------- #
def parse_date(value: str) -> date:
    """Validate and parse an ISO 8601 date string (``YYYY-MM-DD``).

    Raises ``ValueError`` if the string is not a valid ISO 8601 date.
    """
    return date.fromisoformat(value.strip())


def today_iso() -> str:
    """Return today's date as an ISO 8601 string."""
    return date.today().isoformat()


def now_iso() -> str:
    """Return the current timestamp as an ISO 8601 string (seconds precision)."""
    return datetime.now().replace(microsecond=0).isoformat()


# --------------------------------------------------------------------------- #
# Formatting
# --------------------------------------------------------------------------- #
def format_pkr(amount: float) -> str:
    """Format a monetary amount as PKR with thousands separators."""
    return f"PKR {amount:,.2f}"


# --------------------------------------------------------------------------- #
# Interactive input helpers
# --------------------------------------------------------------------------- #
def prompt_nonempty(label: str) -> str:
    """Prompt until the user enters a non-empty value."""
    while True:
        value = input(f"{label}: ").strip()
        if value:
            return value
        print("  ! This field cannot be empty.")


def prompt_amount(label: str = "Amount (PKR)") -> float:
    """Prompt until the user enters a positive number."""
    while True:
        raw = input(f"{label}: ").strip()
        try:
            amount = float(raw)
        except ValueError:
            print("  ! Please enter a valid number.")
            continue
        if amount <= 0:
            print("  ! Amount must be greater than zero.")
            continue
        return round(amount, 2)


def prompt_category(label: str = "Category") -> str:
    """Prompt the user to choose a category from CATEGORIES by number."""
    print(f"{label}:")
    for index, category in enumerate(CATEGORIES, start=1):
        print(f"  {index}. {category}")
    while True:
        raw = input("  Choose a number: ").strip()
        if raw.isdigit() and 1 <= int(raw) <= len(CATEGORIES):
            return CATEGORIES[int(raw) - 1]
        print(f"  ! Enter a number between 1 and {len(CATEGORIES)}.")


def prompt_date(label: str = "Date (YYYY-MM-DD)", allow_blank_today: bool = False) -> str:
    """Prompt until the user enters a valid ISO 8601 date.

    If ``allow_blank_today`` is True, an empty input defaults to today.
    Returns the date as an ISO 8601 string.
    """
    while True:
        raw = input(f"{label}: ").strip()
        if not raw and allow_blank_today:
            return today_iso()
        try:
            return parse_date(raw).isoformat()
        except ValueError:
            print("  ! Invalid date. Use the ISO format YYYY-MM-DD (e.g. 2026-06-15).")
