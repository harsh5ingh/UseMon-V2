# Deployment Guide

## Backend

1. Provision PostgreSQL and Redis.
2. Set environment variables from `backend/.env.example`.
3. Generate Prisma client and run migrations:

```bash
npm run prisma:generate --workspace backend
npm run prisma:migrate --workspace backend
```

4. Build and start:

```bash
npm run build --workspace backend
npm run start --workspace backend
```

For container platforms, expose port `8080` and configure health checks against `/api/health`.

## Frontend

1. Set `VITE_API_URL` and `VITE_SOCKET_URL` to the deployed backend URL.
2. Build:

```bash
npm run build --workspace frontend
```

3. Serve `frontend/dist` from a static host or CDN.

## Desktop Agent

1. Set `BACKEND_URL` and `AGENT_TOKEN`.
2. Build:

```bash
npm run build --workspace desktop-agent
```

3. Package and sign the Electron app for macOS.
4. Request macOS privacy permissions for input monitoring, screen recording when screenshots are enabled, and notification access.

## Security Checklist

- Use HTTPS for frontend and backend.
- Rotate `AGENT_TOKEN` periodically.
- Restrict CORS to deployed frontend origins.
- Store database and Redis credentials in a secret manager.
- Enable audit logging for agent ingestion routes.
- Use signed Electron builds and notarization on macOS.
