# 🚀 Setup & Execution Guide: SmartPort AI Platform

This step-by-step guide will walk you through setting up, configuring, and running the **SmartPort AI** full-stack system locally.

---

## 1. System Requirements & Prerequisites

Ensure the following tools are installed on your workstation:

| Requirement | Recommended Version | Download Link |
|-------------|---------------------|---------------|
| **Node.js** | v18.0.0 or higher | [nodejs.org](https://nodejs.org/) |
| **npm** | v9.0.0 or higher | (Included with Node.js) |
| **MongoDB** | v6.0 or higher | [mongodb.com/community](https://www.mongodb.com/try/download/community) |
| **Web Browser** | Chrome, Edge, Firefox, Safari | Latest standard |

> [!NOTE]
> MongoDB can be run locally via MongoDB Community Server or remotely via a free **MongoDB Atlas** cloud connection string.

---

## 2. Project Directory Structure

Ensure your project files are arranged as follows:

```
smartport-ai-frontend/
├── docs/                         # Documentation files
│   ├── problem-statement.md
│   ├── solution-overview.md
│   ├── architecture.md
│   └── setup-guide.md
├── src/                          # React Frontend
├── server/                       # Express + MongoDB Backend
├── package.json                  # Frontend Dependencies
└── vite.config.js
```

---

## 3. Step-by-Step Installation

### Step 3.1: Install Frontend Dependencies

Open your terminal in the root directory (`smartport-ai-frontend`):

```bash
npm install
```

### Step 3.2: Install Backend Dependencies

Navigate to the `server` directory and install server dependencies:

```bash
cd server
npm install
cd ..
```

---

## 4. Database Setup & Configuration

### Option A: Local MongoDB (Default & Recommended)
Ensure your local MongoDB service is started:
- **Windows**: The `MongoDB` service usually runs automatically in the background. If not, start it from Windows Services or run `mongod` in a separate terminal.
- **Default Connection String**: `mongodb://127.0.0.1:27017/smartport`

### Option B: MongoDB Atlas (Cloud)
If you prefer MongoDB Atlas, create a `.env` file inside the `server/` directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/smartport?retryWrites=true&w=majority
```

> [!TIP]
> **Automatic Seeding**: You do not need to manually import any database dump! When the backend server boots for the first time, it detects empty collections and automatically seeds all vessels, berths, cranes, alerts, analytics, and default credentials.

---

## 5. Starting the Applications

You will run **two terminal windows** (one for the backend and one for the frontend):

### Terminal 1: Start Backend API (Port 5000)

```bash
cd server
npm start
```

**Expected Console Output:**
```
🗄️  MongoDB connected: 127.0.0.1/smartport
🌱 Seeding database with initial port data...
✅ Database seeded successfully with 6 vessels, 6 berths, 6 cranes, 4 alerts, analytics & settings.
⚓ SmartPort AI Backend running on http://localhost:5000
📡 REST API mounted at http://localhost:5000/api
```

---

### Terminal 2: Start Frontend Application (Port 5173)

In a new terminal window from the root directory (`smartport-ai-frontend`):

```bash
npm run dev
```

**Expected Console Output:**
```
  VITE v6.4.3  ready in 420 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 6. Accessing & Using the Application

1. Open your browser and navigate to: **[http://localhost:5173](http://localhost:5173)**
2. Log in using the default terminal operator credentials:
   - **Email**: `operator@smartport.ai`
   - **Password**: `password123`
3. Click **"Sign In to Terminal"** to enter the live operations dashboard.

---

## 7. Automated API Verification Test

To verify that all REST endpoints and database models are working properly:

```bash
cd server
node test-api.mjs
```

**Expected Test Output:**
```
Testing endpoints...
✅ [200] /api/health 
✅ [200] /api/dashboard 
✅ [200] /api/dashboard/summary 
✅ [200] /api/vessels (6 items)
✅ [200] /api/berths (6 items)
✅ [200] /api/alerts (4 items)
✅ [200] /api/analytics/kpis 
✅ [200] /api/settings 
✅ [200] /api/prediction/forecast (6 items)
✅ [200] POST /api/auth/login -> User: Port Operator
✅ [200] POST /api/prediction/predict -> Congestion Score: 40% (Low)
```

---

## 8. Troubleshooting FAQ

### Q1: `Error: connect ECONNREFUSED 127.0.0.1:27017`
**Solution**: Ensure your MongoDB server is running. On Windows, check `services.msc` and ensure **MongoDB Server (MongoDB)** is running.

### Q2: `Port 5000 or 5173 is already in use`
**Solution**: Another instance of the server or application is active. Stop existing background processes or change the port in `server/.env` and `vite.config.js`.

### Q3: API calls fail with 404 in development
**Solution**: Ensure the Vite proxy in `vite.config.js` is active and target points to `http://localhost:5000`.
