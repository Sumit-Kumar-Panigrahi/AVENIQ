# Aveniq — Intelligent Incident & Support Management Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18-cyan.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF.svg)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.3-2D3748.svg)](https://www.prisma.io/)

---

## 1. Project Introduction

**Aveniq** is a modern, multi-tenant SaaS platform built to unify customer support operations, technical issue tracking, service disruptions, and critical operational incidents into a cohesive, intelligent workflow.

It provides organizations with structured incident workflows, automated Service Level Agreement (SLA) monitoring, real-time agent collaboration, and AI-powered ticket triage and resolution assistance.

---

## 2. Product Vision

Modern software operations frequently suffer from fragmented tooling: support teams work in customer support software while engineering teams work in separate incident response systems. Aveniq bridges this gap with:

- **Unified Ticket & Incident Lifecycle**: Transition customer bug reports seamlessly into high-priority technical incidents with bi-directional status updates.
- **Role-Based Access Control (RBAC)**: Fine-grained permissions across four defined personas:
  - **Administrator**: Tenant management, system configurations, and integration setup.
  - **Manager**: Team oversight, queue routing, performance metrics, and SLA configuration.
  - **Agent**: Ticket resolution, incident triage, and internal collaboration.
  - **Customer / Requester**: Self-service ticket submission, knowledge base access, and status tracking.
- **SLA & Escalation Automation**: Automated policy enforcement to guarantee response and resolution milestones.
- **AI-Powered Assistance**: Integrated Gemini AI for automated categorization, sentiment analysis, smart response drafting, and post-incident summaries.
- **Real-Time Collaboration**: Instant activity feeds, typing indicators, and presence via WebSockets.

---

## 3. Technology Stack

### Frontend Client

- **Framework**: React 18
- **Language**: TypeScript (Strict Mode)
- **Bundler & Tooling**: Vite
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **Routing**: React Router v7
- **Iconography**: Lucide React
- **Code Quality**: ESLint (Flat Config) + Prettier

### Backend Server

- **Runtime**: Node.js (LTS v22+)
- **Framework**: Express.js
- **Language**: TypeScript (Pure ES Modules)
- **Validation**: Zod (Runtime environment and schema validation)
- **ORM**: Prisma ORM
- **Database**: PostgreSQL
- **Security & Utilities**: CORS, Custom Operational Error Hierarchy (`AppError`), Structured Request Logger

### Future Integrations (Phases 2–8)

- **Real-Time Engine**: Socket.IO
- **Background Jobs & Cache**: Redis & BullMQ
- **Artificial Intelligence**: Google Gemini API
- **API Documentation**: Swagger / OpenAPI

---

## 4. Current Development Phase

> **Phase 1: Project Foundation & Architecture** (Status: **COMPLETED**)
>
> In Phase 1, the foundational monorepo structure, type-safe development environments, strict linting and build pipelines, Prisma PostgreSQL integration setup, centralized API middleware, and system diagnostic endpoints (`GET /api/v1/health`) have been established and verified. Application business logic (Authentication, Ticket queues, Incident response, AI automation) is intentionally deferred to subsequent modular phases.

---

## 5. Project Folder Structure

```
AVENIQ/
├── client/                     # Frontend client workspace (React + Vite)
│   ├── src/
│   │   ├── assets/             # Brand logos and static media
│   │   ├── components/         # Reusable UI components (Badges, Buttons, etc.)
│   │   ├── layouts/            # Page shell containers (RootLayout)
│   │   ├── pages/              # Routed pages (HomePage foundation status)
│   │   ├── routes/             # React Router definitions
│   │   ├── hooks/              # Custom hooks (e.g., useApiHealth)
│   │   ├── services/           # Typed API service wrappers
│   │   ├── types/              # Client TypeScript type contracts
│   │   └── utils/              # Helper utilities (cn class merging, etc.)
│   ├── .env.example            # Client environment variables template
│   ├── index.html              # Vite entry HTML
│   ├── package.json            # Client package definition
│   ├── tailwind.config.js      # Tailwind design configuration
│   ├── tsconfig.json           # Client strict TypeScript configuration
│   └── vite.config.ts          # Vite bundler configuration
├── server/                     # Backend API workspace (Express + Prisma)
│   ├── prisma/
│   │   └── schema.prisma       # Prisma ORM schema & PostgreSQL configuration
│   ├── src/
│   │   ├── config/             # Environment validation (Zod) and Prisma setup
│   │   ├── modules/            # Modular feature domains (health, etc.)
│   │   ├── middleware/         # Logger, CORS, 404, and Error handling
│   │   ├── common/             # System constants and shared singletons
│   │   ├── utils/              # Structured logger and AppError class
│   │   ├── types/              # Server API response and diagnostic types
│   │   ├── app.ts              # Express application assembly
│   │   └── server.ts           # Server listener & graceful shutdown logic
│   ├── tests/                  # Backend test suite directory
│   ├── .env.example            # Server environment variables template
│   ├── package.json            # Server package definition
│   └── tsconfig.json           # Server strict TypeScript configuration
├── docs/
│   └── ARCHITECTURE.md         # Comprehensive architectural blueprint
├── .gitignore                  # Monorepo git ignore rules
├── .prettierrc                 # Code formatting standards
├── package.json                # Monorepo root workspace configuration
└── README.md                   # Project documentation
```

---

## 6. Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: `v20.0.0` or higher (Tested on `v24.11.1` LTS)
- **npm**: `v10.0.0` or higher (Tested on `v11.6.2`)
- **PostgreSQL**: `v14.0` or higher (Local installation or hosted via Supabase, Neon, AWS RDS, etc.)

---

## 7. Environment Configuration

### Client Environment Setup

Copy the example file to `.env`:

```bash
cp client/.env.example client/.env
```

Default parameters in `client/.env`:

```ini
VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME="Aveniq"
```

### Server Environment Setup

Copy the example file to `.env`:

```bash
cp server/.env.example server/.env
```

Default parameters in `server/.env`:

```ini
PORT=5000
NODE_ENV=development
API_PREFIX=/api/v1
CORS_ORIGIN=http://localhost:5173
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/aveniq_dev?schema=public"
```

> [!IMPORTANT]
> The backend server enforces strict environment variable validation using **Zod** on bootstrap. If any required variable is missing or malformed (such as an invalid `DATABASE_URL` protocol), the server fails fast with explicit error diagnostic messages.

---

## 8. Database Setup Instructions

Aveniq uses **Prisma ORM** with **PostgreSQL**.

### Option A: Local PostgreSQL

1. Ensure your local PostgreSQL service is running:
   ```bash
   # On macOS (Homebrew)
   brew services start postgresql@16

   # On Linux (systemd)
   sudo systemctl start postgresql

   # On Windows
   net start postgresql-x64-16
   ```
2. Create the development database:
   ```sql
   CREATE DATABASE aveniq_dev;
   ```
3. Update `DATABASE_URL` in `server/.env` with your local credentials:
   ```ini
   DATABASE_URL="postgresql://<user>:<password>@localhost:5432/aveniq_dev?schema=public"
   ```

### Option B: Docker Container

Start a PostgreSQL container using Docker:

```bash
docker run --name aveniq-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=aveniq_dev \
  -p 5432:5432 -d postgres:16-alpine
```

### Option C: Cloud Hosted Database (Neon, Supabase, AWS RDS)

Obtain your pooling or direct connection string from your cloud provider and update `server/.env`:

```ini
DATABASE_URL="postgresql://username:password@ep-sample-pooler.us-east-1.aws.neon.tech/aveniq_dev?sslmode=require"
```

### Prisma Commands

```bash
# Validate Prisma schema
npm run prisma:validate --workspace=server

# Generate Prisma Client types
npm run prisma:generate --workspace=server
```

---

## 9. Development Commands

All lifecycle scripts are runnable directly from the project root using npm workspaces:

| Command                | Description                                                                     |
| :--------------------- | :------------------------------------------------------------------------------ |
| `npm install`          | Install all dependencies across root, client, and server                        |
| `npm run dev`          | Concurrently start backend API (`:5000`) and frontend Vite dev server (`:5173`) |
| `npm run dev:server`   | Start backend API in watch mode via `tsx`                                       |
| `npm run dev:client`   | Start frontend client via Vite HMR                                              |
| `npm run build`        | Compile backend TypeScript to `dist/` and build optimized client bundle         |
| `npm run typecheck`    | Run TypeScript strict checks across both client and server                      |
| `npm run lint`         | Execute ESLint flat config validation on client and server                      |
| `npm run format`       | Format the entire codebase using Prettier                                       |
| `npm run format:check` | Verify code formatting compliance                                               |

---

## 10. API Specification (Phase 1 Baseline)

### `GET /api/v1/health`

Returns real-time service health and database connectivity diagnostics.

**Request:**

```http
GET /api/v1/health HTTP/1.1
Host: localhost:5000
Accept: application/json
```

**Response (200 OK):**

```json
{
  "status": "success",
  "data": {
    "status": "ok",
    "service": "Aveniq Backend API",
    "version": "0.1.0",
    "environment": "development",
    "uptime": 45.2,
    "timestamp": "2026-11-09T11:05:30.123Z",
    "database": {
      "status": "connected",
      "provider": "postgresql"
    }
  }
}
```

---

## 11. Architectural Blueprint

For comprehensive architectural specifications, request lifecycles, and future domain module designs, consult [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
