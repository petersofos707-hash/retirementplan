# Mobile App Proof-of-Concept PRD

This repository implements the Stage 1 scaffold for a verified sports trainer staffing marketplace proof of concept.

## Product Goal

Build a mobile-first Expo React Native app that connects sporting organisations needing short-term sports trainer coverage with verified sports trainers looking for flexible paid work.

The proof of concept should demonstrate:

- Role-based login for Organisation, Trainer, and Admin users.
- Organisation shift posting.
- Trainer shift browsing and applications.
- Manual credential verification placeholders.
- Ratings and reliability indicators.
- 15% organisation-side platform fee calculation.
- Supabase-backed auth/data with local demo fallback.

## Data Modes

### Supabase Mode

Used when `EXPO_PUBLIC_SUPABASE_URL` and `EXPO_PUBLIC_SUPABASE_ANON_KEY` are configured. Supabase should manage authentication, users, profiles, organisations, trainer profiles, shifts, applications, bookings, credentials, and ratings.

### Local Demo Mode

Used when Supabase env vars are missing. Local demo mode loads seeded mock users and marketplace data, allows role-based demo login, persists basic changes locally with AsyncStorage, and should visually behave like Supabase mode where possible.

## Stage 1 Scope

Stage 1 includes:

- Expo React Native TypeScript app setup.
- Expo Router route groups.
- Auth, login, and sign-up screens.
- Demo login buttons for Organisation, Trainer, and Admin.
- Supabase client setup.
- Local demo fallback mode.
- Seeded mock data for organisations, trainers, shifts, applications, credentials, bookings, and ratings.
- Initial Organisation, Trainer, and Admin dashboards.

## Stage 2 Scope

Build the core marketplace flow:

1. Organisation creates a shift.
2. Trainer browses open shifts.
3. Trainer applies for a shift.
4. Organisation reviews applicants.
5. Organisation accepts one trainer.
6. Other applications for that shift automatically become declined.
7. Booking status updates correctly.
8. Admin approves or rejects credentials.
9. Organisation marks shift completed.
10. Organisation rates trainer.
11. Trainer rating/reliability display updates.

## Out Of Scope For V1

- Payment processing and payouts.
- Insurance validation.
- AHPRA/API validation.
- Push notifications.
- In-app messaging.
- Maps/location routing.
- Advanced reliability algorithm.
- Dispute resolution.
- Multi-worker shift allocation.
- App Store or Google Play deployment.

## Acceptance Criteria

The proof of concept is complete when:

- A user can sign up or log in.
- A user can select or be assigned Organisation, Trainer, or Admin role.
- Organisation can create a shift.
- Trainer can browse and apply for open shifts.
- Admin can approve trainer credentials.
- Organisation can accept a trainer.
- Other applications for the same shift are automatically declined.
- Booking status updates correctly.
- Organisation can mark a shift completed.
- Organisation can rate the trainer.
- Trainer rating updates on profile.
- Organisation cost displays trainer pay plus 15% platform fee.
- Trainer pay remains protected and does not subtract the platform fee.
- Admin dashboard displays basic marketplace metrics.
- App can run in Supabase mode or local demo mode.
