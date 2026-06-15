# Expense Tracker Application Specification

## Project Overview

Build a personal expense tracking application that allows users to manage and monitor their daily expenses. The application must support user authentication, expense categorization, and expense history management.

---

## Technology Stack

### Backend

* Language: Python
* Architecture: Local file-based application
* Data Storage: Local database/file storage
* Authentication: Email and password-based authentication

### Database

* Storage Type: Local database/file
* Database module must be implemented in a dedicated file:

  * `db.py`

### Currency

* Default and only supported currency: **PKR (Pakistani Rupees)**
* Never use USD or any other currency in the application.

---

## Database Schema

### Users Table

| Field         | Type     | Description                |
| ------------- | -------- | -------------------------- |
| id            | Integer  | Primary Key                |
| name          | String   | Full Name                  |
| email         | String   | Unique User Email          |
| password_hash | String   | Hashed Password            |
| created_at    | DateTime | Account Creation Timestamp |

### Expenses Table

| Field    | Type    | Description            |
| -------- | ------- | ---------------------- |
| id       | Integer | Primary Key            |
| user_id  | Integer | Foreign Key → Users.id |
| amount   | Decimal | Expense Amount (PKR)   |
| category | String  | Expense Category       |
| date     | Date    | Expense Date           |

---

## Supported Expense Categories

The application must support the following predefined categories:

* Food
* Transport
* Health
* Shopping
* Bills
* Travel
* Other

---

## Functional Requirements

### User Management

* Register a new user.
* Login using email and password.
* Store passwords securely using hashing.
* Prevent duplicate email registrations.

### Expense Management

* Add a new expense.
* View all expenses for the authenticated user.
* Filter expenses by category.
* Filter expenses by date.
* Delete an expense.
* Update an existing expense.

### Reporting

* Display total expenses.
* Display expenses grouped by category.
* Display expenses within a specified date range.

---

## Technical Requirements

### Database Layer

* Implement all database operations inside `db.py`.
* Separate database logic from business logic.
* Use reusable database helper functions.

### Security

* Always use parameterized queries.
* Never concatenate user input directly into SQL queries.
* Store passwords as secure hashes.

### Date Handling

* All dates and timestamps must follow the ISO 8601 format.

Examples:

* `2026-06-15`
* `2026-06-15T18:30:00`

### Code Quality

* Follow Python best practices.
* Use type hints where appropriate.
* Keep functions modular and reusable.
* Add meaningful comments and documentation.

---

## Project Structure

```text
expense_tracker/
│
├── main.py
├── db.py
├── auth.py
├── expense.py
├── models.py
├── utils.py
└── data/
    └── expenses.db
```

---

## Deliverables

1. Database module (`db.py`)
2. User authentication system
3. Expense CRUD operations
4. Category management
5. Expense reporting and summaries
6. Clean and maintainable Python codebase
