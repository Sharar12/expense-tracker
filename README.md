# Expense Tracker

A full-stack expense tracking application built with **Next.js** (frontend) and **Laravel** (backend) connected to a **MySQL** database. Easily create, view, update, and delete daily expenses with categorization and date tracking.

---

## Tech Stack

| Layer      | Technology                                                   |
| ---------- | ------------------------------------------------------------ |
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS 4             |
| **Backend**  | Laravel 12, PHP 8.2+                                        |
| **Database** | MySQL (via XAMPP)                                            |

---

## Features

- **Full CRUD** — Create, read, update, and delete expenses
- **Categorization** — Tag expenses as Food, Transport, Shopping, Entertainment, Bills, or Other
- **Date tracking** — Record the date of each expense with optional notes
- **RESTful API** — Clean Laravel API with resource controllers
- **Responsive UI** — Modern, mobile-friendly interface built with Tailwind CSS

---

## Getting Started

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- XAMPP (or any MySQL server running on port 3306)

### 1. Clone & Database Setup

```bash
git clone <repo-url>
cd expense-tracker
```

Create a MySQL database named `expense_tracker`.

### 2. Backend Setup (Laravel)

```bash
cd backend
composer install
cp .env.example .env
```

Edit `.env` and set your database connection details:

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=expense_tracker
DB_USERNAME=root
DB_PASSWORD=
```

Then run:

```bash
php artisan key:generate
php artisan migrate
php artisan serve --port=8000
```

The API will be available at `http://localhost:8000/api`.

### 3. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## API Endpoints

| Method   | Endpoint             | Description          |
| -------- | -------------------- | -------------------- |
| `GET`    | `/api/expenses`      | List all expenses    |
| `POST`   | `/api/expenses`      | Create an expense    |
| `GET`    | `/api/expenses/{id}` | Get a single expense |
| `PUT`    | `/api/expenses/{id}` | Update an expense    |
| `DELETE` | `/api/expenses/{id}` | Delete an expense    |

### Example Request Body (POST / PUT)

```json
{
  "title": "Groceries",
  "amount": 45.99,
  "category": "Food",
  "date": "2026-07-08",
  "notes": "Weekly groceries"
}
```

---

## Database Schema

**`expenses` table**

| Column   | Type             | Description              |
| -------- | ---------------- | ------------------------ |
| `id`     | bigint (PK)      | Auto-incrementing ID     |
| `title`  | string(255)      | Expense title            |
| `amount` | decimal(10,2)    | Expense amount           |
| `category` | string(100)    | Expense category         |
| `date`   | date             | Date of expense          |
| `notes`  | text (nullable)  | Optional notes           |
| `created_at` | timestamp   | Record creation time     |
| `updated_at` | timestamp   | Record update time       |

---

## Project Structure

```
expense-tracker/
├── frontend/               # Next.js application
│   ├── app/
│   │   ├── expenses/       # Expense CRUD pages
│   │   │   └── page.tsx    # Expense tracker UI component
│   │   ├── globals.css     # Global styles (Tailwind)
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
│
├── backend/                # Laravel API
│   ├── app/
│   │   ├── Http/Controllers/
│   │   │   └── ExpenseController.php   # CRUD logic
│   │   └── Models/
│   │       └── Expense.php             # Eloquent model
│   ├── database/migrations/
│   │   └── ..._create_expenses_table.php
│   ├── routes/
│   │   └── api.php                     # API route definitions
│   ├── .env.example
│   └── composer.json
│
└── README.md
```

---

## License

[MIT](LICENSE)

<!-- [2024-09-25] feat: scaffold expense tracker backend models and transactions API -->

<!-- [2024-09-25] feat: create expense logging form with amount, category, and date inputs -->
