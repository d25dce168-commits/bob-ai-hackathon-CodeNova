# 🚀 SmartPort AI — Intelligent Port Congestionatform

SmartPort AI is a full-stack maritime operations management and predictive intelligence system. It combines real-time infrastructure telemetry (berths and STS cranes), live vessel traffic management, and predictive AI modeling to optimize port capacity and mitigate congestion.

---
## 👥 Team

| Field | Value |
|---|---|
| **Team Name** | CodeNova |
| **Track** | AI |
| **Team Lead** | Bhargav Shah — 24dce125@charusat.edu.in |
| **Members** | Jiya Bhayani, Harsh Chauhan, Jainil Batra |

## 🎯 Problem Statement

Ports face congestion due to unpredictable vessel arrivals, limited berth capacity, crane availability, and growing vessel queues. Port operators need early insights to identify bottlenecks and make timely decisions for efficient port operations.

---

## 💡 Solution

SmartPort AI uses real-time port data and AI-based prediction to monitor vessels, berths, cranes, and congestion levels. It forecasts congestion risks 24–72 hours ahead and provides actionable recommendations for better resource allocation and vessel flow.

---

## 🌟 Key Features

- 📊 **Real-time Operations Dashboard**: Live port congestion index gauge, operational KPIs, active vessel queue, and berth occupancy telemetry.
- 🚢 **Vessel Fleet Management**: Inbound, approaching, moored, and departing vessel schedules with live search, cargo type filtering, and priority tracking.
- ⚓ **Berth & STS Crane Allocation**: Digital terminal layout (Berths B01–B06) with crane move-rate telemetry, occupancy status, and dynamic vessel assignment.
- 🧠 **AI Congestion Prediction**: Multi-variable predictive scoring based on vessel volume, berth utilization, queue depth, crane availability, and weather factors.
- 🔮 **24–72h Horizon Forecasts**: Predictive bottleneck timeline with automated tactical recommendations (slow-steaming advisories, crane reallocation, standby berth activation).
- 🚨 **Operational Alert Center**: Real-time event notifications categorized by severity (High/Medium/Low/Notice) with one-click resolution and dismiss workflows.
- 📈 **Historical Analytics & Reporting**: Turnaround times, moves/hour throughput, 7-day to 90-day trend visualizations, and CSV export.
- ⚙️ **Operator Preferences**: Configurable notification thresholds, quiet hours, and profile settings.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **Frontend** | React.js |
| **Backend** | Node.js + Express.js |
| **Database** | MongoDB |
| **AI/ML** | Python + Scikit-learn |
| **ML Integration** | REST API between Node.js and Python |
| **Visualization** | Recharts / Chart.js |
| **Authentication** | JWT |
| **Version Control** | Git + GitHub |

---

## 🏗️ Project Architecture

```
smartport-ai-frontend/
├── src/                          # React + Vite Frontend
│   ├── components/               # UI components (dashboard, vessels, berths, etc.)
│   ├── pages/                    # Route pages (Dashboard, Vessels, Berths, Alerts, etc.)
│   ├── services/                 # API client service (api.js)
│   ├── styles/                   # Design system & CSS modules
│   ├── App.jsx                   # Application router & layout
│   └── main.jsx                  # React entry point
│
├── server/                       # Node.js + Express Backend
│   ├── database/                 # MongoDB connection & smart seed script (db.js)
│   ├── models/                   # Mongoose schemas (User, Vessel, Berth, Crane, Alert, etc.)
│   ├── routes/                   # Express REST API routes
│   ├── index.js                  # Express application entry point
│   ├── package.json
│   └── .env.example
│
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) running locally (default: `mongodb://127.0.0.1:27017`)

---

### 1. Clone & Install Dependencies

```bash
# Clone the repository
git clone <YOUR_GITHUB_REPO_URL>
cd smartport-ai-frontend

# Install Frontend dependencies
npm install

# Install Backend dependencies
cd server
npm install
cd ..
```

---

### 2. Configure Environment (Optional)

Create a `server/.env` file (or use default fallback settings):

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/smartport
```

---

### 3. Run the Backend (Express + MongoDB)

```bash
cd server
npm start
```

- Server runs at: `http://localhost:5000`
- REST API mounted at: `http://localhost:5000/api`
- Automatically connects to MongoDB and seeds initial port data if the database is empty.

---

### 4. Run the Frontend (Vite)

In a new terminal from the root directory:

```bash
npm run dev
```

- Vite dev server runs at: `http://localhost:5173`
- Pre-configured proxy forwards `/api/*` requests directly to `http://localhost:5000`.

---

## 📡 Key REST API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | `GET` | Health check & MongoDB status |
| `/api/dashboard/summary` | `GET` | Port overview metrics & congestion index |
| `/api/vessels` | `GET` | List vessels with optional `?q=` search & `?status=` filter |
| `/api/vessels/:id` | `GET` / `PUT` / `DELETE` | Single vessel operations |
| `/api/berths` | `GET` | Berths and occupancy status |
| `/api/berths/cranes` | `GET` | STS Crane telemetry and move rates |
| `/api/berths/:id/assign` | `PUT` | Assign a vessel to a berth |
| `/api/prediction/predict` | `POST` | AI Congestion prediction calculations |
| `/api/prediction/forecast` | `GET` | 24–72 hour risk forecast |
| `/api/alerts` | `GET` / `POST` | Retrieve and create alerts |
| `/api/alerts/:id/resolve` | `PUT` | Mark alert as resolved |
| `/api/analytics/kpis` | `GET` | Historical KPIs and throughput stats |
| `/api/settings` | `GET` / `PUT` | Port operator preferences |

---

## 👤 Default Credentials

- **Email**: `operator@smartport.ai`
- **Password**: `password123`
