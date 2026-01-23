# Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database running
- M-Pesa Daraja API credentials
- SendGrid API key (optional, for emails)

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

**Required variables:**
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `MPESA_CONSUMER_KEY`: From Daraja Portal
- `MPESA_CONSUMER_SECRET`: From Daraja Portal
- `MPESA_PASSKEY`: From Daraja Portal

### 3. Setup Database
```bash
# Push schema to database
npm run db:push

# Or create migration
npm run db:migrate
```

### 4. Generate Prisma Client
```bash
npx prisma generate
```

### 5. Run Development Server
```bash
npm run dev
```

Visit http://localhost:3000

## Create Admin User

After signing up, promote a user to admin in the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'your-email@example.com';
```

## Testing M-Pesa (Sandbox)

1. Use sandbox credentials from Daraja Portal
2. Test phone: 254712345678 (or any valid Kenyan number)
3. When prompted, enter any 4-digit PIN

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Database Hosting
- Neon (serverless PostgreSQL)
- Supabase
- Railway
- PlanetScale

## Project Structure

```
IEC/
├── app/                    # Next.js App Router
│   ├── api/               # API endpoints
│   │   ├── auth/         # Authentication
│   │   ├── payments/     # M-Pesa integration
│   │   ├── admin/        # Admin endpoints
│   │   └── cron/         # Scheduled tasks
│   ├── auth/             # Auth pages
│   ├── dashboard/        # User dashboard
│   ├── admin/            # Admin dashboard
│   └── (pages)/          # Public pages
├── components/            # React components
├── lib/                   # Utilities
│   ├── auth.ts           # NextAuth config
│   ├── prisma.ts         # Database client
│   ├── mpesa.ts          # M-Pesa service
│   ├── email.ts          # Email service
│   └── utils.ts          # Helpers
└── prisma/
    └── schema.prisma     # Database schema
```

## Key Features

✅ User authentication (email/password + Google OAuth)
✅ M-Pesa STK Push payments
✅ Membership management (500 KES initial, 250 KES renewal)
✅ Admin dashboard with analytics
✅ Automated renewal reminders (30 days before expiry)
✅ Payment webhooks with idempotency
✅ Email notifications (SendGrid)
✅ Rate limiting and security
✅ Responsive design (mobile-first)
✅ SEO optimized

## Troubleshooting

**Build fails:**
- Run `npm install` again
- Delete `.next` folder and rebuild
- Check Node.js version (18+)

**Database connection issues:**
- Verify `DATABASE_URL` format
- Ensure PostgreSQL is running
- Check network connectivity

**M-Pesa payments not working:**
- Verify credentials are correct
- Check callback URL is publicly accessible
- Use ngrok for local testing: `ngrok http 3000`

**Emails not sending:**
- Verify SendGrid API key
- Check sender email is verified
- Look at email logs in database

## Support

For issues or questions:
- Email: iecjkuat@gmail.com
- GitHub Issues: Create an issue in the repository

## Next Steps

1. ✅ Setup complete - project builds successfully
2. Configure your PostgreSQL database
3. Add M-Pesa credentials
4. Test payment flow
5. Deploy to production
6. Setup automated cron job for renewal reminders

---

Built with ❤️ for IEC JKUAT
