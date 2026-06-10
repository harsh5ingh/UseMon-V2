# Digital Wellbeing + macOS Activity Monitoring Dashboard

Production-oriented full-stack web application for screen time, active-window monitoring, app limits, notification analytics, mindful streaks, and an immersive Three.js burning-rope focus timer.

## Stack

- Frontend: React 19, Vite, TypeScript, Tailwind CSS, Framer Motion, GSAP, Zustand, React Query, Recharts, Three.js, React Three Fiber
- Backend: Node.js, Express, TypeScript, Socket.io, Prisma ORM, PostgreSQL, Redis, cron jobs
- Desktop Agent: Electron, Node.js, active-window sampling, browser metadata, focus and idle detection, notification sampling

## Structure

```text
frontend/src/
  pages/ components/ sections/ hooks/ store/ services/
  layouts/ animations/ charts/ three/ types/

backend/src/
  controllers/ routes/ services/ websocket/ middleware/
  trackers/ jobs/ utils/

desktop-agent/
  trackers/ browser-monitor/ active-window/
  notification-monitor/ focus-engine/ screenshots/ src/
```

## Quick Start

```bash
npm install
docker compose up -d
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
cp desktop-agent/.env.example desktop-agent/.env
npm run prisma:generate --workspace backend
npm run prisma:migrate --workspace backend
npm run dev
```

Frontend: `http://localhost:5173`

Backend API: `http://localhost:8080/api/health`

Run the Electron monitoring agent in another terminal:

```bash
npm run dev:agent
```

## Environment

Backend:

- `PORT`: API port, default `8080`
- `DATABASE_URL`: PostgreSQL connection string
- `REDIS_URL`: Redis connection string
- `FRONTEND_URL`: allowed CORS origin
- `AGENT_TOKEN`: shared secret for desktop-agent ingestion

Frontend:

- `VITE_API_URL`: backend HTTP URL
- `VITE_SOCKET_URL`: backend Socket.io URL

Desktop Agent:

- `BACKEND_URL`: backend URL
- `AGENT_TOKEN`: must match backend token
- `TRACKING_INTERVAL_MS`: active-window sampling interval
- `SCREENSHOT_INTERVAL_MS`: reserved screenshot cadence

## Features

- Responsive layout for mobile, tablet, laptop, desktop, and ultra-wide screens
- Desktop sidebar, mobile bottom navigation, and ultra-wide real-time utility panel
- Glassmorphism cards with hover lift, glow borders, accessible focus states, and reduced-motion support
- Screen time, pickups, focus time, notification totals, and productivity score
- Daily, weekly, monthly, yearly app usage charts
- Focus heatmap and macOS-style 24-hour activity timeline
- Three.js burning rope focus timer with flame shader, embers, smoke, rope depletion, and fullscreen focus mode
- Monthly mindful streak calendar with fire icons, missed days, streak counters, and gamification levels
- App limits with warning and exceeded states
- Notification analytics by source and hour
- Real-time Socket.io monitoring from the Electron desktop agent
- Prisma models for users, applications, sessions, focus sessions, notifications, app limits, and streak days

## API Routes

- `GET /api/health`
- `GET /api/dashboard/summary`
- `GET /api/dashboard/apps`
- `GET /api/dashboard/usage?range=daily|weekly|monthly|yearly`
- `GET /api/dashboard/timeline`
- `GET /api/dashboard/notifications`
- `GET /api/dashboard/limits`
- `GET /api/dashboard/streak?month=0&year=2026`
- `GET /api/dashboard/insights`
- `GET /api/dashboard/realtime`
- `POST /api/agent/activity`
- `POST /api/agent/notification`

Agent routes require `x-agent-token`.

## Socket.io Events

- `activity:update`: current active app, window title, category, productivity score, session length, idle time, activity counts
- `notification:new`: notification event from the agent
- `focus:started`: emitted by the frontend when focus mode begins
- `focus:completed`: emitted when a focus timer completes

## Production Notes

- Replace demo analytics in `backend/src/services/mockData.ts` with Prisma aggregation queries once the agent has accumulated real events.
- Use a managed PostgreSQL instance and Redis service in production.
- Set `AGENT_TOKEN` to a strong secret and distribute it only to trusted desktop agents.
- Package the Electron agent with platform-specific signing and macOS privacy permission prompts for production distribution.
