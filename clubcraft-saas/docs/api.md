# API Documentation

## Authentication
All API requests require a JWT Bearer token. Obtain a token via the `/auth/login` endpoint.

### Login
- **POST** `/auth/login`
- **Body:** `{ "email": string, "password": string }`
- **Response:** `{ "token": string, "user": User }`

## Clubs
CRUD endpoints for managing clubs.

### List Clubs
- **GET** `/clubs`
- **Query:** `page`, `pageSize`
- **Response:** `{ "data": Club[], "meta": { "page": number, "pageSize": number, "total": number } }`

### Create Club
- **POST** `/clubs`
- **Body:** `{ "name": string, "description?": string }`
- **Permissions:** Owner, Admin, Treasurer

### Get Club
- **GET** `/clubs/:id`

### Update Club
- **PUT** `/clubs/:id`
- **Permissions:** Owner, Admin

### Delete Club
- **DELETE** `/clubs/:id`
- **Permissions:** Owner

## Stripe Billing
- **POST** `/billing/subscribe`
- **Body:** `{ "priceId": string, "paymentMethodId": string }`
- **Response:** `{ "subscriptionId": string, "status": string }`

## Webhooks
- **POST** `/webhooks/stripe`
- Handles subscription lifecycle events. Verify signatures using `STRIPE_WEBHOOK_SECRET`.
