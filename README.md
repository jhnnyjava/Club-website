# IEC JKUAT - Innovation and Entrepreneurship Club

Modern membership platform for the Innovation and Entrepreneurship Club at JKUAT. Features M-Pesa payment integration, automated renewal reminders, and comprehensive admin controls.

![Next.js](https://img.shields.io/badge/Next.js-16+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Prisma](https://img.shields.io/badge/Prisma-5+-green)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4+-cyan)

## Features

- **Authentication**: Email/password and Google OAuth
- **M-Pesa Payments**: STK Push integration
- **Membership**: 500 KES initial, 250 KES renewal
- **Admin Dashboard**: Member and payment management
- **Automated Emails**: Renewal reminders via SendGrid
- **Responsive Design**: Works on all devices

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
npx prisma db push

# Start development
npm run dev
```

Visit http://localhost:3000

## Tech Stack

- Next.js 16 + TypeScript
- Prisma + PostgreSQL
- NextAuth.js
- Tailwind CSS
- M-Pesa Daraja API
- SendGrid

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel dashboard for automatic deployments.

### Environment Variables

Required for production:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXTAUTH_SECRET` - Generate with `openssl rand -base64 32`
- `NEXTAUTH_URL` - Your production URL
- `MPESA_*` - M-Pesa credentials
- `SENDGRID_API_KEY` - Email service key

See `.env.example` for full list.

## License

MIT

## Contact

iecjkuat@gmail.com
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and fill in your credentials:

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database
DATABASE_URL="postgresql://user:pass@localhost:5432/ice_db"

# NextAuth
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# M-Pesa Daraja
MPESA_CONSUMER_KEY="your-consumer-key"
MPESA_CONSUMER_SECRET="your-consumer-secret"
MPESA_PASSKEY="your-passkey"
MPESA_BUSINESS_SHORT_CODE="174379"
MPESA_ENVIRONMENT="sandbox"
MPESA_CALLBACK_URL="https://yourdomain.com/api/payments/callback"

# SendGrid
SENDGRID_API_KEY="your-sendgrid-api-key"
SENDGRID_FROM_EMAIL="iecjkuat@gmail.com"

# App Config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_MEMBERSHIP_FEE="500"
NEXT_PUBLIC_RENEWAL_FEE="250"
NEXT_PUBLIC_MEMBERSHIP_DURATION_DAYS="30"

# Cron Secret (for scheduled tasks)
CRON_SECRET="your-random-secret"
```

### 4. Set up the database

```bash
# Push schema to database
npm run db:push

# Or create a migration
npm run db:migrate

# View database in Prisma Studio
npm run db:studio
```

### 5. Generate NextAuth secret

```bash
openssl rand -base64 32
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
iec-jkuat/
├── app/
│   ├── api/
│   │   ├── auth/           # Authentication endpoints
│   │   ├── payments/       # M-Pesa payment endpoints
│   │   └── cron/           # Scheduled tasks
│   ├── auth/               # Auth pages (signin, signup)
│   ├── dashboard/          # User dashboard
│   ├── about/              # About page
│   ├── membership/         # Membership info
│   ├── faq/                # FAQ page
│   ├── contact/            # Contact page
│   ├── privacy/            # Privacy policy
│   ├── terms/              # Terms of service
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── providers.tsx       # Client providers
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── Footer.tsx          # Footer component
│   └── DashboardContent.tsx # Dashboard content
├── lib/
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client
│   ├── mpesa.ts            # M-Pesa service
│   ├── email.ts            # Email service
│   ├── rate-limit.ts       # Rate limiting
│   └── utils.ts            # Utility functions
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── prisma.config.ts    # Prisma config
├── types/
│   └── next-auth.d.ts      # TypeScript definitions
├── .env                    # Environment variables
├── .env.example            # Example env file
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies
```

## 🔧 Configuration

### M-Pesa Setup

1. Create a Daraja account at [https://developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Create an app to get Consumer Key and Consumer Secret
3. Get the Lipa Na M-Pesa Online Passkey
4. Set up your callback URL (must be HTTPS in production)
5. For testing, use sandbox credentials

### SendGrid Setup

1. Create account at [https://sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Verify sender email (iecjkuat@gmail.com)
4. Configure email templates (optional)

### Database Setup

For production, use managed PostgreSQL:
- **Vercel Postgres**: Integrated with Vercel
- **PlanetScale**: Serverless MySQL (requires adapter)
- **Supabase**: PostgreSQL with extras
- **Railway**: Simple PostgreSQL hosting

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub

2. Import project in Vercel:
   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard

4. Set up cron job for renewal reminders (configured in `vercel.json`)

5. Deploy:
   ```bash
   vercel --prod
   ```

### Important for Production

1. **Update callback URLs** in .env with your production domain
2. **Switch M-Pesa to production** credentials
3. **Add CRON_SECRET** to protect cron endpoints
4. **Enable HTTPS** (automatic with Vercel)
5. **Set up monitoring** (Vercel Analytics, Sentry)

## 📧 Email Templates

The system sends the following automated emails:

- **Welcome Email**: On signup
- **Payment Receipt**: On successful payment
- **Payment Failed**: On payment failure
- **Renewal Reminder**: 30 days before expiry
- **Membership Expired**: When membership expires

Customize templates in `lib/email.ts`.

## 🔒 Security

- **Password Hashing**: bcrypt with salt rounds
- **Session Management**: JWT tokens via NextAuth
- **Rate Limiting**: Prevents payment API abuse
- **CSRF Protection**: Built into Next.js
- **Input Validation**: Zod schemas
- **SQL Injection**: Prisma prevents this
- **Webhook Verification**: M-Pesa callback validation
- **HTTPS Only**: Required in production

## 🧪 Testing

### Test M-Pesa Payment

Use Safaricom's test credentials:
- Test phone: Any Safaricom number
- Test PIN: As provided in Daraja portal

### Manual Cron Testing

```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" \
  http://localhost:3000/api/cron/check-renewals
```

## 📊 Database Schema

Key models:
- **User**: Authentication and profile
- **Membership**: Membership status and dates
- **Payment**: Transaction records
- **EmailLog**: Email delivery tracking
- **AdminLog**: Admin activity audit

See `prisma/schema.prisma` for full schema.

## 🔄 Payment Flow

1. User initiates payment from dashboard
2. Server creates payment record with status PENDING
3. Server calls M-Pesa STK Push API
4. User receives prompt on phone
5. User enters M-Pesa PIN
6. M-Pesa sends callback to `/api/payments/callback`
7. Server updates payment status and activates membership
8. User receives email receipt

## 📱 M-Pesa Testing

### Sandbox Test Credentials

Business Short Code: 174379 (Sandbox)
Passkey: Provided in Daraja portal

### Test Scenarios

- **Successful Payment**: Enter correct PIN
- **Failed Payment**: Cancel on phone
- **Timeout**: Don't respond to STK prompt

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions:
- **Email**: iecjkuat@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/yourusername/iec-jkuat/issues)

## 🙏 Acknowledgments

- JKUAT Innovation and Entrepreneurship Club
- Safaricom Daraja API
- Next.js Team
- Prisma Team
- Vercel

---

Built with ❤️ by IEC JKUAT
