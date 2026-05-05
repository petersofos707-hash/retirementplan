# Verified Staffing Marketplace POC

Mobile-first proof of concept for a verified sports trainer staffing marketplace. The app is built with Expo React Native, TypeScript, Expo Router, Supabase Auth/Postgres, and a local demo fallback mode.

The PRD lives at [docs/mobile_app_prd.md](docs/mobile_app_prd.md).

## Stage 1 Status

Implemented:

- Expo React Native TypeScript project structure.
- Expo Router route groups for auth, organisation, trainer, and admin roles.
- Login and sign-up screens.
- Demo login buttons for Organisation, Trainer, and Admin.
- Supabase client setup with environment variable detection.
- Local demo fallback mode when Supabase env vars are missing.
- Seeded mock data for users, organisations, trainers, credentials, shifts, applications, bookings, and ratings.
- Basic role dashboards so each role lands in the right part of the app.
- Supabase `schema.sql` and optional `seed.sql`.

Not implemented yet:

- Posting shifts.
- Trainer applications.
- Organisation applicant review and booking.
- Admin credential approval actions.
- Rating submission and rating/reliability recalculation.
- Payments, payouts, real credential API integrations, push notifications, maps, messaging, and app store deployment.

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
   npx expo start
   ```

4. Open in Expo Go, an iOS simulator, Android emulator, or web.

## Data Modes

### Supabase Mode

Used when both `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` are present. Supabase handles email/password sign-up and login. Run [supabase/schema.sql](supabase/schema.sql) in your Supabase SQL editor before using persisted data.

### Local Demo Mode

Used automatically when Supabase environment variables are missing. Demo mode uses seeded local users and marketplace data, then persists the active session with AsyncStorage.

Demo accounts:

- Organisation: `org@example.com` / `password123`
- Trainer: `trainer@example.com` / `password123`
- Admin: `admin@example.com` / `password123`

The demo buttons also sign in to these seeded roles.

## Known Limitations

Stage 1 establishes the app shell, auth flow, data model, and seed data only. Marketplace state mutations are intentionally left for Stage 2 so the core organisation-to-trainer flow can be implemented cleanly.
