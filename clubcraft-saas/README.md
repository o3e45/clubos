# ClubCraft SaaS

ClubCraft SaaS is a full-stack platform for managing private clubs, real estate investments, and proposal workflows. The project is organized as a pnpm workspace with a Next.js frontend, Fastify backend, infrastructure as code via Terraform, and SDKs for client integrations.

## Project Structure

```
clubcraft-saas/
├── backend/        # Fastify + TypeScript API server
├── frontend/       # Next.js 14 + TailwindCSS app
├── infra/          # Terraform for AWS (EKS, RDS, S3, CloudFront)
├── docs/           # Markdown documentation (API, SDK, setup)
├── sdk/            # Client SDKs (JavaScript, Python)
├── docker-compose.yml # Local Postgres + Redis + Stripe CLI
└── pnpm-workspace.yaml
```

## Getting Started

1. Install dependencies (WSL-friendly):

   ```bash
   corepack enable
   pnpm install
   ```

2. Copy environment variables:

   ```bash
   cp config/.env.example .env
   ```

3. Start local services:

   ```bash
   docker-compose up -d
   ```

4. Run the backend in development mode:

   ```bash
   pnpm --filter backend dev
   ```

5. Run the frontend:

   ```bash
   pnpm --filter frontend dev
   ```

## Testing

Run unit and integration tests via pnpm:

```bash
pnpm test
```

## Deployment

- CI/CD is defined in `.github/workflows/ci.yml` and executes linting, tests, and Terraform plan.
- Infrastructure definitions are under `infra/`. Review Terraform variables before applying.

## Licensing

MIT License. See `LICENSE` file for details.
