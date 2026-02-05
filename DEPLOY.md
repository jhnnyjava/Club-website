# Deploy to Production

## Option 1: Vercel (Easiest)

1. **Push to GitHub**
```bash
git add .
git commit -m "Production ready"
git push origin main
```

2. **Deploy via Vercel Dashboard**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repo: `jhnnyjava/Club-website`
- Add environment variables (see below)
- Click "Deploy"

3. **Add Environment Variables in Vercel**
```
DATABASE_URL=your-postgres-url
NEXTAUTH_SECRET=generate-with-openssl
NEXTAUTH_URL=https://your-domain.vercel.app
MPESA_CONSUMER_KEY=your-key
MPESA_CONSUMER_SECRET=your-secret
MPESA_PASSKEY=your-passkey
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_ENVIRONMENT=production
MPESA_CALLBACK_URL=https://your-domain.vercel.app/api/payments/callback
SENDGRID_API_KEY=your-key
SENDGRID_FROM_EMAIL=iecjkuat@gmail.com
SENDGRID_FROM_NAME=ICE JKUAT
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
```

## Option 2: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
```

## Post-Deployment

1. **Run database migrations**
```bash
npx prisma db push
```

2. **Test M-Pesa payments** in sandbox mode first

3. **Custom domain** - Add via Vercel dashboard

Your site will be live at: `https://your-project.vercel.app`
