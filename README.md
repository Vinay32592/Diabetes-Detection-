# Diabetes Risk Assessment

A full-stack web application designed to evaluate diabetes risk factors based on eight physiological measurements. Built with a React and TypeScript frontend, an Express (Node.js) backend, and MongoDB for record persistence.

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose)

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── models/
│   │   │   └── Prediction.js
│   │   ├── routes/
│   │   │   └── predictions.js
│   │   ├── db.js
│   │   ├── predictor.js
│   │   ├── validator.js
│   │   └── server.js
│   ├── .env
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB running locally or a connection URI

### Backend Setup

1. Open the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000`.

### Frontend Setup

1. Open the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## API Endpoints

- `GET /` — API status check
- `POST /predict` — Submit health indicators and get calculated risk assessment
- `GET /predict/history` — Fetch paginated list of prior evaluations
- `DELETE /predict/history/:id` — Delete a specific evaluation record
