# AhmedSaad Portfolio

## Current status

Phase 0 foundation only. The repository currently contains a React, TypeScript, Vite, Tailwind CSS, and React Router frontend scaffold plus a .NET 10 Web API solution with a health-check integration test. Portfolio content, project pages, database persistence, contact functionality, deployment configuration, and visual implementation are intentionally not present yet.

## Local prerequisites

- Node.js 24.13.0 and npm 11.6.2, pinned in `.nvmrc` and `frontend/package.json`.
- .NET SDK 10.0.401, pinned in `global.json`.

## Local configuration

- Copy values from `frontend/.env.example` only for local frontend configuration.
- `backend/appsettings.Development.example.json` is documentation, not a runtime secrets file.
- Store real local connection strings in environment variables or .NET User Secrets; never commit database credentials.

## Verification

```powershell
Set-Location frontend
npm ci
npm run lint
npm run typecheck
npm run test:run
npm run build

Set-Location ../backend
dotnet restore Portfolio.slnx
dotnet build Portfolio.slnx --configuration Release --no-restore
dotnet test Portfolio.slnx --configuration Release --no-build
```

The supplied Stitch archive is a local visual reference only and is excluded from Git.
