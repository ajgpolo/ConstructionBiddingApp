# Construction Bidding App

A full-stack web application for generating construction project bids based on historical data and industry standards.

## Features

- Generate construction project bids based on:
  - Project type (Residential, Commercial, Industrial)
  - Location
  - Project size
  - Timeline
  - Material specifications
  - Labor type (Union/Non-Union)
- View comparable projects
- Detailed cost breakdown including:
  - Equipment costs
  - Material costs
  - Labor hours
  - Contingency costs and time

## Tech Stack

### Frontend
- React with TypeScript
- Material-UI for components
- Axios for API calls

### Backend
- Node.js with Express
- TypeScript
- Supabase for database (coming soon)

## Setup Instructions

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will run on port 3001.

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The frontend will run on port 3000.

## Project Structure

```
ConstructionBiddingApp/
├── backend/
│   ├── src/
│   │   ├── routes/         # API endpoints
│   │   ├── config/         # Configuration files
│   │   ├── types/          # TypeScript type definitions
│   │   └── server.ts       # Main server file
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/     # React components
    │   ├── App.tsx         # Main App component
    │   └── index.tsx       # Entry point
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details. 