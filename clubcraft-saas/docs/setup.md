# Setup Guide

## Prerequisites
- Node.js 20+
- pnpm 8+
- Docker + Docker Compose
- Terraform 1.6+

## Local Development
1. Copy environment variables:
   ```bash
   cp config/.env.example .env
   ```
2. Start dependencies:
   ```bash
   docker-compose up -d postgres redis
   ```
3. Run database migrations:
   ```bash
   pnpm --filter backend db:migrate
   ```
4. Launch the backend API:
   ```bash
   pnpm --filter backend dev
   ```
5. Launch the frontend application:
   ```bash
   pnpm --filter frontend dev
   ```

## Testing
- `pnpm --filter backend test`
- `pnpm --filter frontend lint`

## Deployment Notes
- Configure AWS credentials for Terraform before running `terraform apply`.
- Stripe webhook secret must be provided in production environments.
