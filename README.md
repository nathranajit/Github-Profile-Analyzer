# GitHub Profile Analyzer API

A production-ready backend service built with Node.js, Express.js, Prisma ORM, and MySQL that analyzes GitHub user profiles using the GitHub Public API and stores profile insights in a database.

---

# Features

* Analyze GitHub profiles using GitHub Public API
* Store analyzed profiles in MySQL database
* Intelligent database caching (24-hour cache)
* Fetch all analyzed profiles with pagination
* Fetch individual analyzed profile
* Rate limiting for API protection
* Input validation middleware
* Global error handling
* Swagger API documentation
* Dockerized application
* Prisma ORM integration

---

# Tech Stack

| Technology         | Purpose             |
| ------------------ | ------------------- |
| Node.js            | Runtime environment |
| Express.js         | Backend framework   |
| MySQL              | Relational database |
| Prisma ORM         | Database ORM        |
| Axios              | GitHub API requests |
| Swagger UI         | API documentation   |
| Docker             | Containerization    |
| Express Validator  | Request validation  |
| Express Rate Limit | Rate limiting       |

---

# API Endpoints

Base URL:

```bash
/api/v1/github
```

| Method | Endpoint             | Description                             |
| ------ | -------------------- | --------------------------------------- |
| GET    | `/`                  | Fetch all analyzed profiles (paginated) |
| GET    | `/analyze/:username` | Analyze and store GitHub profile        |
| GET    | `/:username`         | Fetch a single analyzed profile         |

---

# Pagination

The `GET /` endpoint supports pagination.

Example:

```bash
/api/v1/github?page=1
```

Default page size:

```bash
10
```

---

# Swagger Documentation

Swagger UI is available at:

```bash
/
```

---

# Project Structure

```bash
src
├── config
├── controllers
├── docs
├── middlewares
├── routes
├── services
├── utils
├── app.js
└── server.js

prisma
├── migrations
└── schema.prisma
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
PORT=5000

DATABASE_URL=mysql://USERNAME:PASSWORD@HOST:PORT/DATABASE_NAME

GITHUB_TOKEN=your_github_personal_access_token

SERVER_URL=http://localhost:5000/api/v1
```

---

# Local Installation

## 1. Clone Repository

```bash
git clone https://github.com/nathranajit/Github-Profile-Analyzer.git
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file and add the required environment variables.

---

## 4. Run Prisma Migrations

```bash
npx prisma migrate dev
```

---

## 5. Generate Prisma Client

```bash
npx prisma generate
```

---

## 6. Start Development Server

```bash
npm run dev
```

---

# Running with Docker

## Build Docker Image

```bash
docker build -t github-profile-analyzer .
```

---

## Run Docker Container

```bash
docker run -p 5000:5000 --env-file .env github-profile-analyzer
```

---

# Caching Strategy

* Profiles are cached in the database for 24 hours
* Cached data is returned if the profile was analyzed recently
* Reduces unnecessary GitHub API requests
* Improves API performance and response time

---

# Rate Limiting

The analyze endpoint is protected with rate limiting:

```bash
5 requests per minute per IP
```

---

# Validation

GitHub usernames are validated before processing:

* Required field validation
* Username length validation
* Allowed character validation

---

# Error Handling

The application uses centralized global error handling middleware for:

* Validation errors
* GitHub API errors
* Database errors
* Rate limit errors
* Internal server errors

---

# Deployment

The application is fully Dockerized and can be deployed on:

* Render
* Railway
* AWS
* DigitalOcean

---

# Author

Ranajit Nath
