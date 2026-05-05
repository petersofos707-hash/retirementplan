# Verified Staffing Marketplace POC

Mobile-first proof of concept for a verified sports trainer staffing marketplace. The app is built with Expo React Native, TypeScript, Expo Router, Supabase Auth/Postgres, and a local demo fallback mode.

The PRD lives at [docs/mobile_app_prd.md](docs/mobile_app_prd.md).

## Stage 2A Status

Implemented:

- Expo React Native TypeScript project structure.
- Expo Router route groups for auth, organisation, trainer, and admin roles.
- Login and sign-up screens.
- Demo login buttons for Organisation, Trainer, and Admin.
- Supabase client setup with environment variable detection.
- Local demo fallback mode when Supabase env vars are missing.
- Seeded mock data for users, organisations, trainers, credentials, shifts, applications, bookings, and ratings.
- Supabase `schema.sql` and optional `seed.sql`.
- Polished role dashboards with metrics, cards, status badges, and core role actions.
- Organisation shift posting with trainer pay, 15% platform fee, and total organisation cost.
- Trainer shift browsing and local demo applications.
- Organisation applicant review, one-trainer acceptance, automatic decline of competing pending applications, and booking creation.
- Admin manual credential approval/rejection with trainer verification status updates.
- Organisation booking completion and 5-star demo rating submission.
- Trainer rating, reliability, and completed-shift updates in local demo state.
- Local demo reset action from the admin dashboard.

Not implemented yet:

- Payments, payouts, real credential API integrations, push notifications, maps, messaging, app-store deployment, and multi-worker shift allocation.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Optional: configure Supabase:

   ```bash
   cp .env.example .env
   ```

   Then set:

   ```bash
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Start Expo:

   ```bash
   npx.cmd expo start -c
   ```

4. Open in Expo Go, an iOS simulator, Android emulator, or web. On Windows PowerShell, use `npm.cmd` and `npx.cmd` if script execution policy blocks `npm`/`npx`.

## Data Modes

### Supabase Mode

Used when both `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` are present. Supabase handles email/password sign-up and login. Run [supabase/schema.sql](supabase/schema.sql) in your Supabase SQL editor before using persisted data.

### Local Demo Mode

Used automatically when Supabase environment variables are missing. Demo mode uses seeded local users and marketplace data, then persists changes with AsyncStorage.

Demo accounts:

- Organisation: `org@example.com` / `password123`
- Trainer: `trainer@example.com` / `password123`
- Admin: `admin@example.com` / `password123`

The demo buttons also sign in to these seeded roles.

## Stage 2A Demo Script

1. Log in as Admin and open the verification queue.
2. Approve James O'Connor's pending Working With Children Check.
3. Confirm the trainer status changes to verified.
4. Log in as Organisation and post a shift with trainer pay.
5. Confirm the fee breakdown shows trainer pay plus a 15% organisation platform fee.
6. Log in as Trainer and apply for an open shift.
7. Log in as Organisation, review applicants, and accept the trainer.
8. Confirm the application becomes accepted, other pending applications are declined, the shift becomes booked, and a booking is created.
9. Mark the booking completed, then submit the demo rating.
10. Confirm the trainer profile rating, reliability, and completed shift count update.

## Known Limitations

Supabase is configured for auth/schema context, but Stage 2A marketplace writes use local demo state and AsyncStorage. Payments, payouts, maps, messaging, push notifications, real credential API checks, multi-worker shifts, and app-store deployment remain out of scope.
