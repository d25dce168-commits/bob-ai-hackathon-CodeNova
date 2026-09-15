# 🏛️ System Architecture: SmartPort AI Platform

## 1. High-Level System Architecture

SmartPort AI is built on a modern, decoupled **Full-Stack MERN-style Architecture** (React 18, Node.js, Express.js, and MongoDB) engineered for high responsiveness, real-time telemetry processing, and clean separation of concerns.

```mermaid
flowchart TD
    subgraph ClientLayer ["Client Presentation Layer (SPA)"]
        UI["React 18 + Vite Web App"]
        Router["React Router v6"]
        Components["UI Components & Recharts"]
        ClientService["API Client Service (api.js)"]
        UI --> Router --> Components --> ClientService
    end

    subgraph GatewayLayer ["Reverse Proxy & Gateway"]
        ViteProxy["Vite Dev Proxy (:5173/api)"]
        ClientService -->|HTTP / JSON| ViteProxy
    end

    subgraph BackendLayer ["Backend Application Layer (Express.js)"]
        ExpressApp["Express API Server (:5000)"]
        ViteProxy -->|Forward| ExpressApp
        
        AuthRouter["/api/auth"]
        DashRouter["/api/dashboard"]
        VesselRouter["/api/vessels"]
        BerthRouter["/api/berths"]
        PredRouter["/api/prediction"]
        AlertRouter["/api/alerts"]
        AnalyticsRouter["/api/analytics"]
        SettingsRouter["/api/settings"]
        
        ExpressApp --> AuthRouter
        ExpressApp --> DashRouter
        ExpressApp --> VesselRouter
        ExpressApp --> BerthRouter
        ExpressApp --> PredRouter
        ExpressApp --> AlertRouter
        ExpressApp --> AnalyticsRouter
        ExpressApp --> SettingsRouter
    end

    subgraph EngineLayer ["Intelligence & Business Logic"]
        AIModel["Predictive AI Engine & Risk Scoring"]
        Recommender["Tactical Recommendation Generator"]
        PredRouter --> AIModel
        AIModel --> Recommender
    end

    subgraph DatabaseLayer ["Data Persistence Layer (MongoDB)"]
        Mongoose["Mongoose ODM Engine"]
        MongoDB[("MongoDB (smartport)")]
        
        UsersCol[("users")]
        VesselsCol[("vessels")]
        BerthsCol[("berths")]
        CranesCol[("cranes")]
        AlertsCol[("alerts")]
        AnalyticsCol[("analytics")]
        SettingsCol[("settings")]
        
        AuthRouter & DashRouter & VesselRouter & BerthRouter & AlertRouter & AnalyticsRouter & SettingsRouter --> Mongoose
        Mongoose --> MongoDB
        MongoDB --> UsersCol & VesselsCol & BerthsCol & CranesCol & AlertsCol & AnalyticsCol & SettingsCol
    end
```

---

## 2. Layer-by-Layer Breakdown

### A. Presentation Layer (Frontend)
- **Framework**: React 18 with Vite for ultra-fast Hot Module Replacement (HMR) and optimized build bundles.
- **Design System**: Custom CSS variables, responsive grid layouts, glassmorphism card styling, and dark maritime color palette.
- **Data Visualization**: `recharts` for dynamic line graphs, area charts, bar graphs, and custom SVG congestion gauges.
- **State & Navigation**: React Router v6 for client-side routing across 8 dedicated operational views with protected authentication guards.

### B. Controller & API Layer (Backend)
- **Runtime**: Node.js v18+ with Express.js RESTful API architecture.
- **Middleware**:
  - `cors`: Cross-Origin Resource Sharing enablement for local and external development environments.
  - `morgan`: Live HTTP request logging in development format (`:method :url :status :response-time ms`).
  - `express.json()`: High-performance JSON request body parsing.
  - Custom Global Error Handler for centralized error management and descriptive responses.

### C. Intelligence & Predictive Engine
- **Congestion Scoring Formula**:
  $$\text{Raw Pressure} = (1.8 \cdot V + 0.45 \cdot B + 3.2 \cdot Q - 0.3 \cdot (C - 50)) \times W_{\text{mult}}$$
  Where:
  - $V$: Number of active vessels in port / inbound
  - $B$: Berth utilization percentage ($0-100\%$)
  - $Q$: Number of vessels waiting in queue
  - $C$: Available crane percentage ($0-100\%$)
  - $W_{\text{mult}}$: Weather severity multiplier ($1.0$ for Clear, $1.15$ for Rain/Fog, $1.35$ for Storm)
- **Recommendation Engine**: Evaluates the computed score against operational safety thresholds and generates contextual mitigations (speed reductions, berth swaps, and crane reassignments).

---

## 3. Database Schema Design (Entity Relationship)

```mermaid
erDiagram
    USER ||--o{ SETTINGS : configures
    VESSEL ||--o| BERTH : "assigned to"
    BERTH ||--o{ CRANE : "paired with"
    ALERT ||--o{ VESSEL : "references"
    ANALYTICS ||--o{ VESSEL : "aggregates"

    USER {
        string userId PK
        string email UK
        string name
        string role
        string password
    }

    VESSEL {
        string vesselId PK
        string name
        string type
        string status
        string eta
        number teu
        string assignedBerth
        string priority
        number waitTime
    }

    BERTH {
        string berthId PK
        string name
        string status
        string currentVessel
        number depth
        number length
        number cranes
    }

    CRANE {
        string craneId PK
        string name
        string berth
        string status
        number movesPerHour
    }

    ALERT {
        string alertId PK
        string type
        string severity
        string message
        string vesselRef
        boolean resolved
        date timestamp
    }

    ANALYTICS {
        string key PK
        object summary
        array congestionTrend
        array throughputHistory
    }

    SETTINGS {
        string key PK
        object profile
        object notifications
    }
```

---

## 4. API Request & Data Flow Lifecycle

```mermaid
sequenceDiagram
    autonumber
    actor Operator as Terminal Operator
    participant UI as React Frontend
    participant Proxy as Vite Proxy (:5173)
    participant API as Express Server (:5000)
    participant Engine as AI Scoring Engine
    participant DB as MongoDB Database

    Operator->>UI: Inputs Forecast Parameters (e.g. 24 Vessels, Rain)
    UI->>Proxy: POST /api/prediction/predict
    Proxy->>API: Forward request to /api/prediction/predict
    API->>Engine: Calculate Congestion Index & Recommendations
    Engine-->>API: Return Score: 78% (High), Wait: 3.5-4.5h, Advisories
    API-->>Proxy: JSON Response
    Proxy-->>UI: Deliver Prediction Data
    UI->>Operator: Render Gauge, Recommendations & Alert Triggers
```

---

## 5. Security & Production Readiness

- **Sanitized Inputs**: Strict request validation across all CRUD endpoints.
- **Environment Isolation**: Configurable ports and MongoDB URIs managed via `.env` files.
- **Auto-Seeding Engine**: Smart database initialization prevents data collision on server restart while providing instant out-of-the-box demo capabilities.
