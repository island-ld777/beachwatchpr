# BeachWatchPR

A full‑stack web application using the PERN (PostgreSQL, Express.js, React, Node.js) stack.

## Purpose
The purpose of this application is to keep track of illicit incidents ocurring on the coastlines of Puerto Rico. This is a Proof of Concept application to validate the idea of having a reporting system housing records of illegal environmental activities. Ideally, this application will serve for environmental non-profit organizations that specialize in reporting local environmental issues.

## Status => (Archived)
No development will be further made to this project.

## Prerequisites
- Docker and Docker Compose v2 installed

## Quick Start (Docker)
From the repository root:

```bash
docker compose build
docker compose up -d
```

Once started:
- Front end: http://localhost
- API: http://localhost:5000
- PostgreSQL (host port): 5433 (container port 5432)

On first run, the database is initialized using SQL scripts in [server/sql](server/sql).

## Common Docker Commands
- Realtime logs (all services):
	```bash
	docker compose logs -f
	```
- Realtime logs (server only):
	```bash
	docker compose logs -f server
	```
- Stop all containers (preserve volumes):
	```bash
	docker compose down
	```
- Stop and remove volumes (reset DB/uploads):
	```bash
	docker compose down -v
	```
- Rebuild after code changes:
	```bash
	docker compose build --no-cache
	docker compose up -d --force-recreate
	```

## Environment Notes
- When using Docker Compose, the server container receives its database settings from `docker-compose.yml` (no `.env` required inside the container).
- If you intend to run the server outside Docker, create [server/.env](server/README.md) as described there and either:
	- Use the Dockerized database: `DB_HOST=localhost`, `DB_PORT=5433`, or
	- Point to your own PostgreSQL instance.

## Data & Uploads
- Database data persists in a named volume (`db_data`).
- Uploaded images persist in a named volume (`uploads_data`) and are served by the API at `http://localhost:5000/uploads`.

## Local Development (without Docker)
- Front end: see [client/README.md](client/README.md)
- Back end: see [server/README.md](server/README.md)

