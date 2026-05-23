# QuantumVoteX MVP

QuantumVoteX is a hackathon MVP for a post-quantum, blockchain-inspired e-voting platform. It includes a Next.js frontend, an Express backend with an in-memory demo database (optional MongoDB), and a sample Solidity contract.

## Requirements

- Node.js 18+
- MongoDB (optional, only if DB_MODE=mongo)

## Setup

### 1) Backend

```
cd backend
npm install
cp .env.example .env
npm run dev
```

By default the backend runs with an in-memory demo database. To switch to MongoDB, update `.env`:

```
DB_MODE=mongo
MONGO_URI=mongodb://localhost:27017/quantumvotex
```

Then seed:

```
npm run seed
```

The API runs on port 5000 by default.

### 2) Frontend

```
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

The frontend runs on port 3000 by default.

## Demo Credentials

Admin:
- Email: admin@quantumvotex.io
- Password: admin123

Voter:
- Email: voter@quantumvotex.io
- Password: voter123

## Demo Flow

1. Register or log in
2. Verify OTP (demo code shown in UI)
3. Simulate face scan
4. Cast vote
5. Watch encryption and blockchain simulation
6. Verify transaction
7. Review admin fraud dashboard
8. View results

## Project Structure

- frontend: Next.js app with futuristic UI and animations
- backend: Express API with JWT auth and simulated blockchain ledger
- contracts: Sample Solidity contract (not deployed)
