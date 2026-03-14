# A.M.T Imports - Courier Business System

An online system for managing courier operations: customer management, order tracking, invoice generation, online payments, and email notifications.

## Features

- **Public Landing Page** - Company info, services, pricing, and contact details
- **Admin Dashboard** - Manage customers, orders, invoices, and payments
- **Customer Portal** - View orders, invoices, pay online, and download receipts
- **Stripe Integration** - Secure online payments via Stripe Checkout
- **Email Notifications** - Automated emails for invoices, payments, and order updates

## Tech Stack

- **Frontend**: Next.js 16 + TypeScript + Tailwind CSS
- **Database & Auth**: Supabase (Postgres + Auth + Row Level Security)
- **Payments**: Stripe Checkout
- **Email**: Resend
- **Backend**: FastAPI (optional, for extended features)
- **Deployment**: Docker

## Prerequisites

- Node 20+
- Python 3.11+ (for API service)
- Supabase project
- Stripe account
- Resend account

## Quick Start

### 1. Install dependencies

```bash
cd apps/web
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Fill in the required values:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key (for admin operations) |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `RESEND_API_KEY` | Yes | Resend API key for email |
| `EMAIL_FROM` | No | Sender email (defaults to Resend onboarding) |
| `ADMIN_EMAIL` | No | Admin notification email |
| `NEXT_PUBLIC_SITE_URL` | No | Public URL (defaults to localhost:3000) |

### 3. Run locally

```bash
cd apps/web
npm run dev
```

Visit http://localhost:3000

### 4. Set up Stripe webhook (for local dev)

```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### 5. Create your first admin user

1. Sign up at `/login`
2. In Supabase SQL Editor, update your profile role:
   ```sql
   UPDATE profiles SET role = 'admin' WHERE id = 'your-user-id';
   ```

## Project Structure

```
apps/web/src/
  app/
    page.tsx                        # Public landing page
    login/                          # Authentication
    dashboard/                      # Admin dashboard
      page.tsx                      # Overview with stats
      customers/                    # Customer CRUD
      orders/                       # Order management with status workflow
      invoices/                     # Invoice management (create, send, view)
      payments/                     # Payment history
    portal/                         # Customer portal
      page.tsx                      # Customer dashboard
      invoices/                     # View and pay invoices
      orders/                       # Track order status
    api/
      stripe/checkout/              # Stripe Checkout session creation
      stripe/webhook/               # Stripe payment webhook
      notify/invoice-sent/          # Email notification: invoice sent
      notify/order-status/          # Email notification: order status
  components/ui/                    # Shared UI components
  lib/
    supabase/                       # Supabase client helpers
    email/send.ts                   # Email sending utilities
    types.ts                        # TypeScript types and helpers
  proxy.ts                          # Auth + role-based route protection (Next.js 16 proxy)
```

## Database Schema

- **profiles** - User roles (admin/customer), extends Supabase Auth
- **customers** - Customer records managed by admins
- **orders** - Delivery orders with status tracking
- **invoices** - Customer invoices with line items
- **invoice_items** - Individual line items per invoice
- **invoice_payments** - Payment records

## Order Status Workflow

```
Processing -> Ready for Pickup -> Out for Delivery -> Completed
```

## Deploy

- **Docker**: `docker-compose up --build`
- **Vercel**: Connect repo, set root to `apps/web`, add env vars
- **Railway**: Add web service from `apps/web`, add env vars
