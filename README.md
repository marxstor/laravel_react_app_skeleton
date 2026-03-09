# Laravel + React Skeleton App

A full-stack web application skeleton with a decoupled **Laravel REST API** backend and a **React + TypeScript** frontend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Backend | Laravel 12 |
| Frontend | React 19 + TypeScript + Vite |
| Authentication | Laravel Sanctum (Bearer Token) |
| UI Components | shadcn/ui + Tailwind CSS |
| HTTP Client | Axios |
| Routing | React Router v7 |

---

## Prerequisites

Make sure the following are installed before proceeding:

- **PHP** 8.2+
- **Composer** 2.x
- **Node.js** 18+
- **npm** 9+
- **MySQL** 8.0+ or MariaDB 10.6+

---

## Getting Started

### Backend Setup

```bash
cd backend
composer install
cp .env.example .env
php artisan migrate
php artisan serve
```

> **Important:** Open `.env` and update the database credentials before running migrations.

```env
DB_DATABASE=your_database_name
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

The API will be running at `http://localhost:8000`.

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`.

> **Important:** Open `src/api/v1/api-service.ts` and update `baseUrl` to match the port your backend is running on.

```ts
const baseUrl = 'http://localhost:8000/api'; // change port if needed
```

---

## Troubleshooting

### CORS Error (Backend)

If you encounter a CORS error, open `config/cors.php` in the backend and update `allowed_origins` to match the URL your frontend is running on:

```php
'allowed_origins' => ['http://localhost:5173'], // change to your frontend URL
```

---

## Folder Structure

### Frontend (`/frontend/src`)

```
src/
├── api/            # Axios instance and API service modules
├── components/     # Reusable UI components (shadcn/ui + custom)
├── pages/          # Page-level components mapped to routes
├── layouts/        # Layout wrappers (AppLayout, AuthLayout, etc.)
├── routes/         # React Router configuration and ProtectedRoute
├── context/        # React Context providers for global state
└── hooks/          # Custom React hooks
```

### Backend (`/backend`)

In addition to the standard Laravel folder structure:

```
app/
├── Http/
│   ├── Controllers/    # Handle incoming requests and return responses
│   ├── Requests/       # Form Request classes — all validation logic lives here
│   └── Middleware/
├── Models/             # Eloquent models
└── Services/           # Business logic layer — keeps controllers thin
```

**`Services/`** — All business logic is handled here rather than in controllers. Controllers delegate to a service and return the result.

**`Requests/`** — Each endpoint has its own Form Request class for input validation, keeping controllers clean.

---

## Available Scripts

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |

### Backend

| Command | Description |
|---|---|
| `php artisan serve` | Start local development server |
| `php artisan migrate` | Run database migrations |