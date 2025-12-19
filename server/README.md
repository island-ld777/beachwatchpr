# BeachWatchPR Server

## Overview
Express.js backend for BeachWatchPR using PostgreSQL. Exposes a REST API for creating, validating, listing, and deleting reports. Serves uploaded images under `/uploads`.

## Run with Docker (recommended)
From the repository root:
```bash
docker compose up -d server
```
- API: http://localhost:5000
- Uses the Postgres service defined in `docker-compose.yml` and auto-initializes the DB from [server/sql](sql).

Logs:
```bash
docker compose logs -f server
```

## Run locally (without Docker)
Prerequisites: Node.js 18+, npm, and a running PostgreSQL instance. You can either:
- Use the Dockerized database from the repo (`db` service), or
- Use your own PostgreSQL.

1) Start the Dockerized database (option A):
```bash
docker compose up -d db
```

2) Create `.env` in `server/`:

Using the Dockerized DB (host port 5433):
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5433
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=mydb
```

Using your own PostgreSQL:
```
PORT=5000
NODE_ENV=development
DB_HOST=<your_db_host>
DB_PORT=<your_db_port>
DB_USER=<your_db_user>
DB_PASSWORD=<your_db_password>
DB_NAME=<your_db_name>
```

3) Install and run:
```bash
cd server
npm install
npm run dev   # or: npm start
```

## API
- Base URL: `http://localhost:5000/api`
- Static files: `http://localhost:5000/uploads`

### Reports
- GET `/api/reports` — List all reports
- GET `/api/reports/:id` — Get a report by ID
- POST `/api/reports` — Create a new report (multipart form, supports `images` field)
- PATCH `/api/reports/:id/validate` — Validate or reject a report (`{ status: "validated" | "rejected" }`)
- PUT `/api/reports/:id` — Update an existing report
- DELETE `/api/reports/:id` — Delete a report

### Quick checks
```bash
curl http://localhost:5000/api/reports
curl -X PATCH http://localhost:5000/api/reports/1/validate \
   -H "Content-Type: application/json" \
   -d '{"status":"validated"}'
```

## Notes
- When run via Docker Compose, the server’s DB env vars are provided by `docker-compose.yml` (no `.env` needed inside the container).
- CORS is configured for `http://localhost:5173` during development and `http://localhost` in production.

## Overview
This project is an Express.js backend for the BeachWatchPR application, designed to manage Reports using a PostgreSQL database. It provides a RESTful API for performing CRUD operations on Reports.