"""Interactive CLI for the personal expense tracker.

Run with ``python main.py``. Presents an authentication menu, then an
expense-management menu for the logged-in user. All amounts are PKR and all
dates are ISO 8601.
"""

from __future__ import annotations

import getpass

import auth
import db
import expense
from models import CATEGORIES, Expense, User
from utils import (
    format_pkr,
    prompt_amount,
    prompt_category,
    prompt_date,
    prompt_nonempty,
)


# --------------------------------------------------------------------------- #
# Display helpers
# --------------------------------------------------------------------------- #
def _read_password(label: str = "Password") -> str:
    """Read a password without echoing; fall back to input() if unavailable."""
    try:
        return getpass.getpass(f"{label}: ")
    except (EOFError, getpass.GetPassWarning):
        return input(f"{label}: ")


def print_expenses(expenses: list[Expense]) -> None:
    """Print a table of expenses, or a friendly message if there are none."""
    if not expenses:
        print("  (no expenses to show)")
        return
    print(f"  {'ID':<5}{'Date':<14}{'Category':<12}{'Amount':>16}")
    print(f"  {'-' * 5}{'-' * 14}{'-' * 12}{'-' * 16}")
    for e in expenses:
        print(f"  {e.id:<5}{e.date:<14}{e.category:<12}{format_pkr(e.amount):>16}")
    total = sum(e.amount for e in expenses)
    print(f"  {'-' * 47}")
    print(f"  {'Total':<31}{format_pkr(total):>16}")


# --------------------------------------------------------------------------- #
# Authentication flows
# --------------------------------------------------------------------------- #
def do_register() -> None:
    print("\n-- Register --")
    name = prompt_nonempty("Full name")
    email = prompt_nonempty("Email")
    password = _read_password()
    if not password:
        print("  ! Password cannot be empty.")
        return
    try:
        user = auth.register(name, email, password)
    except auth.AuthError as exc:
        print(f"  ! {exc}")
        return
    print(f"  Account created for {user.name} ({user.email}). You can now log in.")


def do_login() -> User | None:
    print("\n-- Login --")
    email = prompt_nonempty("Email")
    password = _read_password()
    user = auth.login(email, password)
    if user is None:
        print("  ! Invalid email or password.")
        return None
    print(f"  Welcome back, {user.name}!")
    return user


# --------------------------------------------------------------------------- #
# Expense flows (all require a logged-in user)
# --------------------------------------------------------------------------- #
def do_add_expense(user: User) -> None:
    print("\n-- Add Expense --")
    amount = prompt_amount()
    category = prompt_category()
    date = prompt_date(allow_blank_today=True)
    try:
        created = expense.add_expense(user.id, amount, category, date)
    except expense.ExpenseError as exc:
        print(f"  ! {exc}")
        return
    print(f"  Added expense #{created.id}: {format_pkr(created.amount)} "
          f"({created.category}) on {created.date}.")


def do_view_all(user: User) -> None:
    print("\n-- All Expenses --")
    print_expenses(expense.list_expenses(user.id))


def do_filter_by_category(user: User) -> None:
    print("\n-- Filter by Category --")
    category = prompt_category()
    print_expenses(expense.filter_by_category(user.id, category))


def do_filter_by_date(user: User) -> None:
    print("\n-- Filter by Date --")
    print("  1. Single date")
    print("  2. Date range")
    choice = input("  Choose: ").strip()
    try:
        if choice == "2":
            start = prompt_date("Start date (YYYY-MM-DD)")
            end = prompt_date("End date (YYYY-MM-DD)")
            results = expense.filter_by_date_range(user.id, start, end)
        else:
            single = prompt_date("Date (YYYY-MM-DD)")
            results = expense.filter_by_date(user.id, single)
    except ValueError:
        print("  ! Invalid date.")
        return
    print_expenses(results)


def do_update_expense(user: User) -> None:
    print("\n-- Update Expense --")
    expenses = expense.list_expenses(user.id)
    if not expenses:
        print("  (no expenses to update)")
        return
    print_expenses(expenses)
    raw = input("  Enter expense ID to update: ").strip()
    if not raw.isdigit():
        print("  ! Invalid ID.")
        return
    expense_id = int(raw)
    if expense.get_expense(expense_id, user.id) is None:
        print("  ! Expense not found.")
        return
    print("  Enter new values:")
    amount = prompt_amount()
    category = prompt_category()
    date = prompt_date(allow_blank_today=True)
    try:
        updated = expense.update_expense(expense_id, user.id, amount, category, date)
    except expense.ExpenseError as exc:
        print(f"  ! {exc}")
        return
    print(f"  Updated expense #{updated.id}.")


def do_delete_expense(user: User) -> None:
    print("\n-- Delete Expense --")
    expenses = expense.list_expenses(user.id)
    if not expenses:
        print("  (no expenses to delete)")
        return
    print_expenses(expenses)
    raw = input("  Enter expense ID to delete: ").strip()
    if not raw.isdigit():
        print("  ! Invalid ID.")
        return
    confirm = input(f"  Delete expense #{raw}? (y/N): ").strip().lower()
    if confirm != "y":
        print("  Cancelled.")
        return
    if expense.delete_expense(int(raw), user.id):
        print(f"  Deleted expense #{raw}.")
    else:
        print("  ! Expense not found.")


def do_reports(user: User) -> None:
    print("\n-- Reports --")
    print(f"  Total expenses: {format_pkr(expense.total_expenses(user.id))}")
    print("\n  By category:")
    by_category = expense.expenses_by_category(user.id)
    if not by_category:
        print("    (no expenses recorded)")
        return
    for category in CATEGORIES:
        if category in by_category:
            print(f"    {category:<12}{format_pkr(by_category[category]):>16}")


# --------------------------------------------------------------------------- #
# Menus
# --------------------------------------------------------------------------- #
def expense_menu(user: User) -> None:
    """Loop the expense-management menu until the user logs out."""
    actions = {
        "1": ("Add expense", do_add_expense),
        "2": ("View all expenses", do_view_all),
        "3": ("Filter by category", do_filter_by_category),
        "4": ("Filter by date", do_filter_by_date),
        "5": ("Update expense", do_update_expense),
        "6": ("Delete expense", do_delete_expense),
        "7": ("Reports", do_reports),
    }
    while True:
        print(f"\n=== Expense Tracker — {user.name} ===")
        for key, (label, _) in actions.items():
            print(f"  {key}. {label}")
        print("  8. Logout")
        choice = input("Choose an option: ").strip()
        if choice == "8":
            print("Logged out.")
            return
        action = actions.get(choice)
        if action is None:
            print("  ! Invalid choice.")
            continue
        try:
            action[1](user)
        except Exception as exc:  # keep the CLI alive on unexpected errors
            print(f"  ! Something went wrong: {exc}")


def main() -> None:
    """Application entry point: initialize the DB and run the auth menu."""
    db.init_db()
    print("Welcome to the Expense Tracker (currency: PKR)")
    while True:
        print("\n=== Main Menu ===")
        print("  1. Register")
        print("  2. Login")
        print("  3. Exit")
        choice = input("Choose an option: ").strip()
        if choice == "1":
            do_register()
        elif choice == "2":
            user = do_login()
            if user is not None:
                expense_menu(user)
        elif choice == "3":
            print("Goodbye!")
            return
        else:
            print("  ! Invalid choice.")


if __name__ == "__main__":
    try:
        main()
    except (KeyboardInterrupt, EOFError):
        print("\nGoodbye!")
