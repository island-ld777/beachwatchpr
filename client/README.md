# BeachWatchPR Client (React + Vite)

This front‑end depends on the BeachWatchPR back‑end API being available first.

## Prerequisites
- Node.js 18+ and npm
- Running API at `http://localhost:5000`
	- Start the API via Docker (recommended): from repo root, `docker compose up -d server`
	- Or run it locally: see [server/README.md](../server/README.md)

## Run (Development)
```bash
cd client
npm install
npm run dev
```
- Vite dev server: http://localhost:5173
- The app calls the API at `http://localhost:5000`.

## Build & Preview (Production-like)
```bash
cd client
npm run build
npm run preview
```
- Preview server: http://localhost:4173 (API remains at `http://localhost:5000`).

## Docker Option
To run the client with Docker alongside the API, from the repo root:
```bash
docker compose up -d client server
```
- Client: http://localhost
- API: http://localhost:5000

## Configuration Note
The API base URL is currently referenced directly as `http://localhost:5000` in
[client/src/utils/dataHandler.js](src/utils/dataHandler.js). Update this if your
API runs on a different origin.
