# BeachWatchPR Server

## Overview
This project is an Express.js backend for the BeachWatchPR application, designed to manage Reports using a PostgreSQL database. It provides a RESTful API for performing CRUD operations on Reports.

## Project Structure
```
server
├── src
│   ├── app.js
│   ├── db
│   │   └── index.js
│   ├── controllers
│   │   └── reportsController.js
│   ├── models
│   │   └── report.js
│   ├── routes
│   │   └── reports.js
│   └── middleware
│       └── errorHandler.js
├── .env
├── package.json
├── README.md
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BeachWatchPR/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root of the server directory and add the following variables:
   ```
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. **Run the server**
   ```bash
   npm start
   ```

## API Endpoints

### Reports
- **GET /reports**: Fetch all reports.
- **GET /reports/:id**: Fetch a report by ID.
- **POST /reports**: Create a new report.
- **PUT /reports/:id**: Update an existing report.
- **DELETE /reports/:id**: Delete a report.

## Usage Examples

### Fetching all reports
```bash
curl -X GET http://localhost:3000/reports
```

### Creating a new report
```bash
curl -X POST http://localhost:3000/reports -H "Content-Type: application/json" -d '{"title": "Report Title", "description": "Report Description"}'
```

## License
This project is licensed under the MIT License.