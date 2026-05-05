<!-- Generated from mobile_app_codex_product_requirements_document_updated.docx. Keep this file in sync with the PRD source. -->

# 1 Mobile App Proof-of-Concept Build Brief for Codex

Project working title: Verified Staffing Marketplace App Business name: To be decided Founders: Three physiotherapy students Document purpose: Product requirements document and Codex build prompt Build stage: Supabase-backed proof of concept / early MVP with local demo fallback Primary market: Sporting organisations needing verified sports trainers Long-term market: Broader sport, allied health, and healthcare staffing Last updated: 2 May 2026. Build-readiness update incorporated: Supabase-first implementation, local demo fallback, interactive core booking/rating/verification flow.

## Current Build Slice: Stage 2A

Stage 2A prioritises a polished interactive local demo flow while keeping Supabase configured for auth and schema context. Marketplace state mutations persist through AsyncStorage/local state in this slice.

Interactive in Stage 2A:

- Organisation creates a shift with trainer pay, 15% platform fee, and total organisation cost.
- Trainer browses open/application-received shifts and applies if verified.
- Organisation reviews applications, accepts exactly one trainer, automatically declines competing pending applications, and creates a booking.
- Admin approves/rejects pending credentials and updates trainer verification state.
- Organisation marks a booking completed, rates the trainer, and updates trainer rating/reliability display.
- Admin dashboard shows marketplace health metrics and can reset local demo data.

Still out of scope for Stage 2A: payment processing, payouts, real credential API checks, push notifications, in-app messaging, maps/routing, advanced reliability algorithms, dispute resolution, multi-worker shift allocation, and app-store deployment.

## 1.1 1. Executive Summary

This project is a mobile-first proof-of-concept application for a verified, on-demand staffing marketplace. The app connects sporting organisations that need short-term staff coverage with qualified and verified sports trainers who want flexible paid work.

The initial beachhead market is sport. The first target use case is a sporting club, school, academy, tournament organiser, or similar organisation posting a one-off or short-term shift for a sports trainer. Verified sports trainers can browse available shifts, view pay, location, time, role requirements, and apply for or accept suitable work.

The long-term vision is to expand beyond sports trainers into broader allied health and healthcare staffing. Future users may include allied health assistants, physiotherapists, occupational therapists, speech pathologists, nurses, clinics, NDIS providers, hospitals, and other healthcare organisations. The proof of concept should therefore be designed with flexible terminology and scalable architecture, while still focusing clearly on sports trainer staffing first.

The app should eventually be suitable for submission to the Apple App Store and Google Play Store. For this reason, the proof of concept should be built as a mobile app rather than a web-only product. The recommended stack is Expo React Native with TypeScript, Expo Router, and Supabase for authentication and database functionality. The first build should include real login functionality but can use mock or seed data for shifts, profiles, credentials, ratings, and payments.

The immediate goal is not to build a production-ready marketplace. The immediate goal is to build a credible, clickable, testable proof of concept that demonstrates the main user journeys:

- An organisation logs in, creates a profile, posts a sports trainer shift, and views applicants.
- A sports trainer logs in, creates a profile, adds credentials, browses available shifts, applies for a shift, and views their bookings.
- An admin/founder can view platform activity, users, shifts, verification status, and marketplace metrics.
The proof of concept should clearly show the business model: organisations pay the advertised trainer amount plus a 15% platform service fee, while trainers receive the full advertised shift amount.

## 1.2 2. Business Context

### 1.2.1 2.1 Problem

Sporting organisations often struggle to fill temporary sports trainer roles. This may occur when regular staff are unavailable, when additional match-day coverage is required, when a tournament needs multiple trainers, or when a club has limited access to qualified personnel.

The current process is often informal and inefficient. Organisations rely on personal contacts, group chats, social media, university networks, or word of mouth. This creates several problems:

- Limited reach when searching for available trainers.
- Slow and manual communication.
- Uncertainty around qualifications, insurance, and reliability.
- Repeated administrative work for club staff.
- Risk of last-minute cancellations or no-shows.
- Lack of transparent ratings or performance history.
- Inconsistent expectations around duties, pay, equipment, and arrival times.

### 1.2.2 2.2 Solution

The solution is a two-sided mobile marketplace that allows organisations to post short-term shifts and allows verified trainers to accept or apply for those shifts.

Organisations can post clear job details, including pay, location, date, time, sport, expected duties, required qualifications, and any equipment requirements. Trainers can browse shifts, view all key details, apply or accept, and build a reputation over time through ratings and reliability tracking.

The platform reduces admin burden for organisations while creating flexible work opportunities for qualified trainers.

### 1.2.3 2.3 Initial Positioning

Verified sports trainer staffing, on demand.

Supporting message:

Fill sports trainer shifts quickly with qualified, verified, and reliable people.

### 1.2.4 2.4 Long-Term Positioning

A trusted staffing marketplace for sport, allied health, and healthcare.

Supporting message:

Short-term healthcare staffing that is faster, safer, and more reliable.

## 1.3 3. Product Goal

The first Codex build should create a mobile app proof of concept that can be installed locally, demoed to potential users, and used by the founders to validate the idea.

The app should demonstrate:

- Role-based login.
- Organisation shift posting.
- Trainer shift browsing and applications.
- Credential verification placeholders.
- Ratings and reliability indicators.
- 15% organisation-side service fee calculation.
- Admin/founder overview.
- A design direction that feels credible for sport and healthcare.
The proof of concept should be realistic enough to show to sporting clubs, trainers, mentors, app developers, and early stakeholders.

## 1.4 4. Recommended Technical Direction

### 1.4.1 4.1 Recommended Stack

Use the following stack unless there is a strong reason not to:

- Framework: Expo React Native
- Language: TypeScript
- Navigation: Expo Router
- Authentication: Supabase Auth
- Database: Supabase Postgres, with optional local mock data fallback
- Styling: React Native StyleSheet or NativeWind/Tailwind-style classes
- Forms: React Hook Form or simple controlled inputs
- Icons: Lucide React Native or Expo vector icons
- State management: React Context or Zustand for simple MVP state
- Testing: Lightweight manual testing plus basic TypeScript checks
- Build pathway: Expo Application Services for future iOS and Android builds

### 1.4.2 4.2 Why Mobile App First

The founders want the product to eventually be available through the Apple App Store and Google Play Store. Therefore, the proof of concept should avoid being built as a web-only product. A mobile app build is more aligned with the future product because trainers will likely browse and accept shifts from their phones, while organisations may also need fast mobile posting for last-minute cover.

### 1.4.3 4.3 Backend Approach

Primary approach:

Use Supabase Auth and Supabase Postgres for the main first build. Supabase mode is required because the proof of concept needs real email/password sign-up and login, persisted marketplace data, and a structure that can later support Apple App Store and Google Play pathways.

Supabase mode should manage authentication, users, profiles, organisations, trainer profiles, shifts, applications, bookings, credentials, and ratings.

Fallback approach:

If Supabase environment variables are missing, the app must automatically use a local demo mode with seeded users and marketplace data. Local demo mode should use AsyncStorage or equivalent local state so the app can still be opened, demonstrated, and reviewed without backend setup.

Priority order: Primary mode is Supabase-backed login and persisted data. Fallback mode is local demo mode with seeded users, shifts, applications, bookings, credentials, and ratings.

The UI should not break when Supabase is not configured. It should visually behave the same as Supabase mode wherever possible.

## 1.5 5. Core Assumptions for the Proof of Concept

The proof of concept should be built around these assumptions:

- The app has three main user roles: Organisation, Trainer, and Admin.
- The first market is sports trainer staffing for sporting organisations.
- The app should support real login or a clear demo login pathway.
- The business name is not final, so use a neutral placeholder.
- No real payment processing is required in the first version.
- No real credential verification API integration is required in the first version.
- Credential verification should be represented as an upload/checklist/status feature.
- No real AHPRA, police check, Working With Children Check, or insurance validation is required yet.
- No real push notifications are required yet, but notification placeholders can be included.
- No in-app messaging is required in the first version, unless simple static contact prompts are easy to include.
- The trainer receives the full advertised shift amount.
- The organisation pays the advertised trainer amount plus a 15% platform service fee.
- The app must be designed in a way that can later support clinics, NDIS providers, hospitals, and broader allied health roles.

## 1.6 6. User Roles

### 1.6.1 6.1 Organisation User

The organisation user represents a club, school, academy, tournament organiser, clinic, or other service needing short-term staff.

For the proof of concept, organisation examples should focus on sport:

- Soccer clubs
- Local AFL clubs
- Basketball clubs
- Netball clubs
- Rugby clubs
- University sport programs
- School sport programs
- Tournament organisers
- Sports academies
Organisation users should be able to:

- Create an account.
- Select the organisation role.
- Create or edit an organisation profile.
- Post a sports trainer shift.
- View posted shifts.
- View trainer applicants.
- Accept a trainer for a shift.
- View estimated total cost including platform fee.
- Rate a trainer after a completed shift.
- View past bookings.

### 1.6.2 6.2 Trainer User

The trainer user represents a sports trainer or healthcare-adjacent worker looking for flexible work.

For the proof of concept, trainer examples should include:

- Sports trainers
- Physiotherapy students with first aid/sports trainer qualifications
- Exercise science students
- Allied health students
- First aid qualified staff
Trainer users should be able to:

- Create an account.
- Select the trainer role.
- Create or edit a trainer profile.
- Add credentials.
- View verification status.
- Browse available shifts.
- Filter shifts by location, date, sport, pay, and required qualification.
- View shift details.
- Apply for or accept a shift.
- View upcoming bookings.
- View past bookings.
- View ratings and reliability score.

### 1.6.3 6.3 Admin / Founder User

The admin user represents the founding team during the pilot stage.

Admin users should be able to:

- View total users.
- View verified and unverified trainers.
- View active organisations.
- View open shifts.
- View filled shifts.
- View pending applications.
- View basic marketplace metrics.
- View revenue estimates.
- Review credential statuses.
- Mark a trainer as verified in the proof-of-concept environment.

## 1.7 7. Core User Journeys

### 1.7.1 7.1 Organisation Journey: Post a Shift

- Organisation opens the app.
- Organisation logs in.
- Organisation lands on the organisation dashboard.
- Organisation taps “Post a Shift”.
- Organisation enters shift details:
- Role title
- Sport
- Date
- Start time
- End time
- Location
- Required qualification
- Duties
- Equipment provided or required
- Advertised trainer pay
- App calculates service fee at 15%.
- App shows total organisation cost.
- Organisation confirms and posts the shift.
- Shift appears in the organisation’s active shifts list.
- Shift appears in the trainer shift marketplace.

### 1.7.2 7.2 Trainer Journey: Apply for a Shift

- Trainer opens the app.
- Trainer logs in.
- Trainer lands on the trainer dashboard.
- Trainer sees available shifts.
- Trainer filters or browses shifts.
- Trainer taps a shift card.
- Trainer views full shift details.
- Trainer confirms they meet required credentials.
- Trainer taps “Apply”.
- Shift appears in the trainer’s pending applications.
- Organisation can review the application.
- If accepted, shift moves to trainer’s upcoming bookings.

### 1.7.3 7.3 Organisation Journey: Accept a Trainer

- Organisation opens active shift.
- Organisation views applicants.
- Organisation sees trainer profile summary:
- Name
- Rating
- Reliability score
- Credentials
- Completed shifts
- Location
- Organisation selects a trainer.
- App marks shift as filled.
- Trainer receives booking status update.
- Booking appears in both users’ upcoming bookings.

### 1.7.4 7.4 Post-Shift Rating Journey

- After the shift end time, the booking becomes eligible for completion.
- Organisation taps “Mark as Completed”.
- Organisation rates the trainer on:
- Attendance
- Punctuality
- Communication
- Professionalism
- Preparedness
- Overall experience
- App updates trainer rating and reliability display.
- Trainer may rate the organisation in a future version.

### 1.7.5 7.5 Admin Journey: Verify a Trainer

- Admin logs in.
- Admin opens admin dashboard.
- Admin views trainers with pending credentials.
- Admin opens trainer profile.
- Admin reviews credential checklist.
- Admin marks credential status as verified, pending, expired, or rejected.
- Trainer profile badge updates accordingly.

## 1.8 8. Required App Screens

### 1.8.1 8.1 Public / Pre-Login Screens

#### 1.8.1.1 Splash Screen

Purpose:

Introduce the app and establish brand positioning.

Required content:

- Placeholder app name.
- Tagline: “Verified sports staffing, on demand.”
- Buttons:
- Log in
- Create account
- View demo

#### 1.8.1.2 Welcome / Landing Screen

Purpose:

Explain the app quickly.

Required sections:

- For organisations: “Post shifts and find verified trainers.”
- For trainers: “Find flexible sports trainer work.”
- Trust features:
- Verified credentials
- Transparent pay
- Reliability tracking
- Ratings

#### 1.8.1.3 Login Screen

Purpose:

Allow existing users to log in.

Required fields:

- Email
- Password
Required actions:

- Log in
- Forgot password placeholder
- Create account
- Demo organisation login
- Demo trainer login
- Demo admin login

#### 1.8.1.4 Sign-Up Screen

Purpose:

Allow new users to create an account.

Required fields:

- Full name
- Email
- Password
- Confirm password
- Role selection:
- Organisation
- Trainer
After sign-up, route the user to role-specific onboarding.

### 1.8.2 8.2 Organisation Screens

#### 1.8.2.1 Organisation Dashboard

Purpose:

Give organisations a quick overview of their staffing needs.

Required elements:

- Welcome message.
- Quick action: Post a shift.
- Active shifts.
- Filled shifts.
- Pending applicants.
- Estimated platform spend.
- Recent trainer applications.

#### 1.8.2.2 Organisation Profile Screen

Required fields:

- Organisation name
- Organisation type
- Contact person
- Email
- Phone
- ABN placeholder
- Primary sport/service
- Primary location
- Short description
- Verification status

#### 1.8.2.3 Post a Shift Screen

Required fields:

- Shift title
- Sport
- Date
- Start time
- End time
- Location
- Address
- Required qualification
- Experience level
- Duties
- Equipment notes
- Uniform notes
- Trainer pay
- Platform fee, automatically calculated at 15%
- Total cost to organisation
Business rule:

The trainer pay should remain unchanged. The 15% service fee is added on top of the trainer pay and paid by the organisation.

Example:

- Trainer pay: $200
- Platform fee: $30
- Organisation total: $230
- Trainer receives: $200

#### 1.8.2.4 Organisation Active Shifts Screen

Show all shifts posted by the organisation.

Each shift card should show:

- Title
- Date/time
- Location
- Trainer pay
- Organisation total cost
- Status: Open, Pending Applicants, Filled, Completed, Cancelled
- Number of applicants

#### 1.8.2.5 Shift Applicants Screen

For each applicant, show:

- Trainer name
- Profile photo placeholder
- Average rating
- Reliability score
- Credential status
- Completed shifts
- Distance/location placeholder
- View profile button
- Accept trainer button

#### 1.8.2.6 Organisation Booking Detail Screen

Show:

- Shift details
- Accepted trainer
- Booking status
- Payment summary placeholder
- Completion/rating button after completion

### 1.8.3 8.3 Trainer Screens

#### 1.8.3.1 Trainer Dashboard

Purpose:

Show trainer opportunities and upcoming bookings.

Required elements:

- Welcome message.
- Verification badge.
- Average rating.
- Reliability score.
- Upcoming bookings.
- Recommended shifts.
- Pending applications.

#### 1.8.3.2 Trainer Profile Screen

Required fields:

- Full name
- Profile photo placeholder
- Bio
- Location
- Travel radius
- Sports covered
- Qualification summary
- Experience level
- Availability summary
- Average rating
- Reliability score
- Completed shifts

#### 1.8.3.3 Credentials Screen

Required credentials for sports trainer MVP:

- First aid certificate
- CPR certificate
- Sports trainer qualification
- Working With Children Check
- Police check placeholder
- Insurance placeholder
Each credential should show:

- Credential name
- Status: Missing, Pending Review, Verified, Expired, Rejected
- Expiry date
- Upload button placeholder
- Notes field placeholder
No real file upload is required in the first proof of concept, but the UI should be designed as if files could be uploaded later.

#### 1.8.3.4 Browse Shifts Screen

Show available shifts with filters.

Filters:

- Date
- Location
- Sport
- Pay range
- Qualification required
- Shift status
Each shift card should show:

- Organisation name
- Shift title
- Sport
- Date/time
- Location
- Trainer pay
- Required qualification
- Verification required badge

#### 1.8.3.5 Shift Detail Screen

Show:

- Organisation name
- Organisation rating placeholder
- Shift title
- Sport
- Date/time
- Address
- Duties
- Required qualification
- Equipment notes
- Trainer pay
- Status
- Apply button
Important:

Only show trainer pay to trainers. Do not show the organisation-side platform fee as a deduction from trainer pay.

#### 1.8.3.6 My Applications Screen

Show pending applications.

Each card:

- Shift title
- Organisation
- Date/time
- Trainer pay
- Status: Pending, Accepted, Declined, Cancelled

#### 1.8.3.7 Upcoming Bookings Screen

Show accepted future shifts.

Each card:

- Shift title
- Organisation
- Date/time
- Location
- Trainer pay
- Contact placeholder

#### 1.8.3.8 Past Bookings Screen

Show completed shifts and ratings.

Each card:

- Shift title
- Organisation
- Date
- Trainer pay
- Rating received
- Completed status

### 1.8.4 8.4 Admin Screens

#### 1.8.4.1 Admin Dashboard

Required metrics:

- Total users
- Total trainers
- Verified trainers
- Pending trainer verification
- Total organisations
- Open shifts
- Filled shifts
- Completed shifts
- Total gross shift value
- Estimated platform revenue
- Average fill rate placeholder
- Average trainer rating placeholder

#### 1.8.4.2 Admin Users Screen

Show user lists with tabs:

- Trainers
- Organisations
- Admins
Trainer list should show:

- Name
- Verification status
- Credentials pending
- Completed shifts
- Rating
- Reliability score
Organisation list should show:

- Organisation name
- Shifts posted
- Active shifts
- Completed bookings
- Rating placeholder

#### 1.8.4.3 Admin Verification Screen

Show all credentials awaiting review.

Actions:

- Mark as verified
- Mark as rejected
- Mark as expired
- Return to pending

#### 1.8.4.4 Admin Shift Overview Screen

Show all shifts across marketplace.

Fields:

- Shift title
- Organisation
- Date/time
- Trainer pay
- Organisation total
- Status
- Applicants
- Accepted trainer

## 1.9 9. Data Model

The proof of concept should use these data objects. They can be represented as TypeScript interfaces, Supabase tables, or seeded local mock data.

### 1.9.1 9.1 User

type UserRole = 'organisation' | 'trainer' | 'admin'; type User = { id: string; email: string; fullName: string; role: UserRole; createdAt: string; };

### 1.9.2 9.2 Organisation Profile

type OrganisationProfile = { id: string; userId: string; organisationName: string; organisationType: 'sports_club' | 'school' | 'university' | 'academy' | 'tournament' | 'clinic' | 'other'; contactPerson: string; phone: string; email: string; abn?: string; primarySport?: string; location: string; description: string; verificationStatus: 'unverified' | 'pending' | 'verified'; averageRating?: number; };

### 1.9.3 9.3 Trainer Profile

type TrainerProfile = { id: string; userId: string; fullName: string; bio: string; location: string; travelRadiusKm: number; sportsCovered: string[]; experienceLevel: 'student' | 'early_career' | 'experienced' | 'senior'; verificationStatus: 'unverified' | 'pending' | 'verified' | 'partially_verified'; averageRating: number; reliabilityScore: number; completedShifts: number; cancelledShifts: number; noShows: number; };

### 1.9.4 9.4 Credential

type Credential = { id: string; trainerId: string; type: 'first_aid' | 'cpr' | 'sports_trainer' | 'wwcc' | 'police_check' | 'insurance' | 'ahpra' | 'other'; displayName: string; status: 'missing' | 'pending' | 'verified' | 'expired' | 'rejected'; expiryDate?: string; uploadedFileName?: string; notes?: string; };

### 1.9.5 9.5 Shift

type ShiftStatus = 'open' | 'pending_applicants' | 'filled' | 'completed' | 'cancelled'; type Shift = { id: string; organisationId: string; title: string; sport: string; date: string; startTime: string; endTime: string; location: string; address: string; requiredQualification: string; experienceLevelRequired: 'student_ok' | 'qualified' | 'experienced'; duties: string; equipmentNotes?: string; uniformNotes?: string; trainerPay: number; platformFeePercent: number; platformFeeAmount: number; organisationTotal: number; status: ShiftStatus; createdAt: string; };

### 1.9.6 9.6 Shift Application

type ApplicationStatus = 'pending' | 'accepted' | 'declined' | 'withdrawn'; type ShiftApplication = { id: string; shiftId: string; trainerId: string; status: ApplicationStatus; message?: string; appliedAt: string; };

### 1.9.7 9.7 Booking

type BookingStatus = 'upcoming' | 'completed' | 'cancelled' | 'no_show'; type Booking = { id: string; shiftId: string; organisationId: string; trainerId: string; status: BookingStatus; trainerPay: number; platformFeeAmount: number; organisationTotal: number; createdAt: string; completedAt?: string; };

### 1.9.8 9.8 Rating

type Rating = { id: string; bookingId: string; raterUserId: string; ratedUserId: string; attendance: number; punctuality: number; communication: number; professionalism: number; preparedness: number; overall: number; comment?: string; createdAt: string; };

## 1.10 10. Business Logic

### 1.10.1 10.1 Platform Fee Logic

The platform service fee is added to the organisation’s total cost. It is not deducted from trainer pay.

Formula:

const platformFeePercent = 0.15; const platformFeeAmount = trainerPay * platformFeePercent; const organisationTotal = trainerPay + platformFeeAmount;

Example:

- Trainer advertised pay: $200
- Platform fee: $30
- Organisation total: $230
- Trainer receives: $200
- Platform keeps: $30

### 1.10.2 10.2 Shift Status Logic

A shift can have the following statuses in v1:

- open: Posted and visible to eligible trainers.
- application_received: At least one trainer has applied, but no trainer has been accepted.
- booked: One trainer has been accepted and a booking has been created.
- completed: The organisation has marked the booking complete.
- cancelled: The shift is no longer active.
For v1, assume one trainer per shift. Multi-position jobs such as “2 trainers required” are out of scope for the proof of concept.

### 1.10.3 10.3 Application Logic

Application states should include: pending, accepted, declined, cancelled, and completed.

A trainer can apply to an open shift only if they meet required verified-credential rules for that shift.

Applying changes the shift status from open to application_received.

An organisation can accept one trainer for a shift. Accepting a trainer creates a booking, changes the accepted application to accepted, changes all other pending applications for that same shift to declined, and changes the shift status to booked.

When the organisation marks the shift complete, the booking status and accepted application status become completed, and the shift status becomes completed.

### 1.10.4 10.4 Verification Logic

Admin verification should modify live demo state in both Supabase mode and local demo mode.

The Admin must be able to view pending trainer credentials, approve a credential, reject a credential, and change trainer verification status from pending to verified.

Once approved, the trainer should become eligible to apply for verified shifts.

This is manual admin verification for proof-of-concept purposes only. No real AHPRA, WWCC, police check, insurance, or credential-validation API integration is required in v1.

Suggested trainer verification states: unverified, pending, partially_verified, verified, rejected.

### 1.10.5 10.5 Reliability Score Logic

The reliability score should be a simple demo calculation, not a final algorithm.

Suggested formula:

const baseScore = 100; const cancellationPenalty = cancelledShifts * 5; const noShowPenalty = noShows * 20; const ratingAdjustment = averageRating >= 4.5 ? 5 : averageRating < 3.5 ? -10 : 0; const reliabilityScore = Math.max(0, Math.min(100, baseScore - cancellationPenalty - noShowPenalty + ratingAdjustment));

Display as:

- 90-100: Excellent
- 75-89: Good
- 60-74: Developing
- Below 60: Needs review
This is only a proof-of-concept representation. The final algorithm would require careful design to avoid unfairly penalising users.

## 1.11 11. Seed Data for Demo

Create seeded demo users, organisations, trainers, shifts, credentials, applications, bookings, and ratings.

### 1.11.1 11.1 Demo Accounts

Use these for local testing. Passwords can be changed in implementation.

Organisation demo: Email: org@example.com Password: password123 Role: organisation Trainer demo: Email: trainer@example.com Password: password123 Role: trainer Admin demo: Email: admin@example.com Password: password123 Role: admin

### 1.11.2 11.2 Demo Organisations

#### 1.11.2.1 Organisation 1

- Name: Alamein FC
- Type: Sports club
- Sport: Soccer
- Location: Melbourne, VIC
- Description: Community football club requiring match-day sports trainer coverage.
- Verification status: Verified

#### 1.11.2.2 Organisation 2

- Name: Melbourne Uni Soccer Club
- Type: University sport
- Sport: Soccer
- Location: Parkville, VIC
- Description: University club seeking casual sports trainer support for weekend fixtures.
- Verification status: Pending

#### 1.11.2.3 Organisation 3

- Name: Eastern Metro Basketball Tournament
- Type: Tournament organiser
- Sport: Basketball
- Location: Box Hill, VIC
- Description: Tournament organiser requiring multiple first aid/sports trainer staff.
- Verification status: Verified

### 1.11.3 11.3 Demo Trainers

#### 1.11.3.1 Trainer 1

- Name: Sarah Nguyen
- Location: Melbourne, VIC
- Sports covered: Soccer, netball, basketball
- Experience: Early career
- Verification: Verified
- Rating: 4.8
- Reliability score: 96
- Completed shifts: 18

#### 1.11.3.2 Trainer 2

- Name: James O’Connor
- Location: Brunswick, VIC
- Sports covered: AFL, soccer, rugby
- Experience: Student
- Verification: Partially verified
- Rating: 4.5
- Reliability score: 88
- Completed shifts: 7

#### 1.11.3.3 Trainer 3

- Name: Priya Patel
- Location: Clayton, VIC
- Sports covered: Basketball, netball, athletics
- Experience: Experienced
- Verification: Pending
- Rating: 4.9
- Reliability score: 94
- Completed shifts: 25

### 1.11.4 11.4 Demo Shifts

#### 1.11.4.1 Shift 1

- Organisation: Alamein FC
- Title: Match-Day Sports Trainer
- Sport: Soccer
- Date: Saturday
- Time: 11:00 AM - 4:00 PM
- Location: Ashburton, VIC
- Required qualification: First aid + CPR + sports trainer qualification
- Duties: Pre-game strapping, acute injury management, first aid coverage, communication with coaching staff.
- Trainer pay: $220
- Platform fee: $33
- Organisation total: $253
- Status: Open

#### 1.11.4.2 Shift 2

- Organisation: Melbourne Uni Soccer Club
- Title: Senior Men’s Match Coverage
- Sport: Soccer
- Date: Sunday
- Time: 1:00 PM - 5:30 PM
- Location: Parkville, VIC
- Required qualification: First aid + CPR
- Duties: Sideline coverage, basic taping, injury response, incident documentation.
- Trainer pay: $180
- Platform fee: $27
- Organisation total: $207
- Status: Pending Applicants

#### 1.11.4.3 Shift 3

- Organisation: Eastern Metro Basketball Tournament
- Title: Tournament First Aid/Sports Trainer
- Sport: Basketball
- Date: Saturday
- Time: 8:00 AM - 2:00 PM
- Location: Box Hill, VIC
- Required qualification: First aid + CPR
- Duties: First aid station, acute injury response, escalation to emergency services if required.
- Trainer pay: $260
- Platform fee: $39
- Organisation total: $299
- Status: Open

## 1.12 12. Design Direction

### 1.12.1 12.1 Brand Feel

The app should feel like a sport-health hybrid:

- Trustworthy enough for healthcare.
- Fast and simple enough for casual staffing.
- Professional enough for sporting organisations.
- Friendly enough for students and early-career trainers.

### 1.12.2 12.2 Visual Style

Suggested style:

- Clean white or off-white background.
- Navy or dark blue primary colour.
- Green accent for verified, completed, and safe statuses.
- Amber/orange accent for pending statuses.
- Red accent for expired, cancelled, or rejected statuses.
- Rounded cards.
- Clear badges.
- Minimal clutter.
- Mobile-first spacing.
- Strong typography hierarchy.

### 1.12.3 12.3 UX Priorities

Prioritise:

- Fast login.
- Clear role separation.
- Clear shift cards.
- Transparent pay.
- Obvious verification status.
- Easy posting and applying.
- Dashboard-style summaries.
Avoid:

- Complex onboarding.
- Too many fields.
- Production-level payment flows.
- Overly clinical design.
- Overly casual gig-work design.

## 1.13 13. Navigation Structure

Use role-based navigation after login.

### 1.13.1 13.1 Pre-Login Navigation

- Splash
- Welcome
- Login
- Sign up
- Role selection, if not included in sign-up

### 1.13.2 13.2 Organisation Navigation

Suggested bottom tabs:

- Dashboard
- Shifts
- Post
- Applicants
- Profile

### 1.13.3 13.3 Trainer Navigation

Suggested bottom tabs:

- Dashboard
- Browse
- Applications
- Bookings
- Profile

### 1.13.4 13.4 Admin Navigation

Suggested bottom tabs:

- Overview
- Users
- Shifts
- Verification
- Settings

## 1.14 14. Proof-of-Concept Feature Priority

### 1.14.1 Must Have

Interactive in v1:

- Login/sign-up with Supabase email/password.
- Demo login buttons for Organisation, Trainer, and Admin.
- Role-based onboarding and navigation.
- Organisation creates a shift.
- Trainer browses shifts and applies for a shift.
- Organisation reviews applications and accepts one trainer.
- Automatic decline of other applications for the same shift.
- Booking status updates.
- Admin approves or rejects trainer credentials.
- Organisation completes a shift and rates the trainer.
- Trainer profile rating and reliability display update after the core demo rating flow.
- Fee calculation: trainer pay plus 15% organisation platform fee.
- Supabase mode with local demo fallback.
- Seed data, README, .env.example, and Supabase schema.sql.

### 1.14.2 Should Have

Should have:

- Optional Supabase seed.sql file.
- Responsive layout for multiple phone sizes.
- Simple error handling and loading states.
- Empty states.
- Basic form validation.
- Profile editing placeholders.
- Status badge components.
- Clear comments identifying proof-of-concept placeholders.

### 1.14.3 Could Have

- Calendar-style availability view.
- Push notification placeholders.
- In-app messaging placeholder.
- File upload placeholder.
- Map/location placeholder.
- Advanced filtering.
- Dark mode.

### 1.14.4 Do Not Build Yet

Display-only or out of scope in v1:

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
- Google, Apple, SMS, or social login.

## 1.15 15. Store Readiness Considerations for Later

The proof of concept does not need to be submitted to the Apple App Store or Google Play Store. However, the architecture should not block future submission.

Future app-store readiness should consider:

- iOS and Android bundle identifiers.
- App icon and splash screen assets.
- Privacy policy.
- Terms of use.
- Account deletion flow.
- Data collection disclosures.
- Secure authentication.
- Secure storage of tokens.
- Permission justification if using location, camera, notifications, or file uploads.
- Avoiding collection of sensitive health information unless legally and operationally prepared.
- Clear user reporting/support pathway.
- Accessibility basics.
For the proof of concept:

- Include a settings screen with placeholder links for Privacy Policy and Terms of Use.
- Include a placeholder “Delete account” button that does not need full backend deletion yet.
- Do not collect sensitive health information.
- Do not store real documents or IDs.
- Do not request unnecessary permissions.

## 1.16 16. Compliance and Legal Planning Considerations

This section is not legal advice. It is a planning checklist for the founders.

The business will likely need advice on:

### 1.16.1 16.1 Worker Classification

Clarify whether trainers are independent contractors, casual employees, or engaged under another arrangement. This affects tax, insurance, superannuation, liability, and platform responsibilities.

### 1.16.2 16.2 Insurance

Clarify what insurance is required for:

- Trainers
- Organisations
- The platform
- Public liability
- Professional indemnity
- Event coverage

### 1.16.3 16.3 Scope of Practice

The app should avoid encouraging trainers to work outside their qualifications. Shift requirements should clearly match trainer credentials.

### 1.16.4 16.4 Credential Verification

The founders need a reliable process for checking:

- First aid
- CPR
- Sports trainer qualification
- Working With Children Check
- Police check
- Insurance
- AHPRA registration for future health professionals

### 1.16.5 16.5 Privacy and Data

The app may eventually store sensitive documents. Data security and privacy obligations should be addressed before storing real documents.

### 1.16.6 16.6 Cancellations and No-Shows

The founders need clear rules for:

- Trainer cancellation.
- Organisation cancellation.
- Late cancellation.
- No-show.
- Payment release.
- Refunds.
- Disputes.

### 1.16.7 16.7 Clinical and Emergency Responsibility

For sports coverage, role expectations must be clear. Trainers should know when to escalate to ambulance, club doctor, physiotherapist, or emergency services.

## 1.17 17. MVP Acceptance Criteria

The build is successful if the following can be demonstrated:

### 1.17.1 17.1 General

The proof of concept is complete when:

- A user can sign up or log in with email/password.
- A user can select or be assigned a role: Organisation, Trainer, or Admin.
- The app can run in Supabase mode when Supabase environment variables are configured.
- The app can run in local demo mode when Supabase environment variables are missing.
- Navigation changes based on user role.
- Seed data appears correctly.
- The UI is coherent and professional.

### 1.17.2 17.2 Organisation Acceptance Criteria

- Organisation can create a profile and create a shift.
- Organisation cost correctly displays trainer pay plus the 15% platform fee.
- Trainer pay remains protected and does not subtract the platform fee.
- New shift appears in organisation active shifts and trainer browse list.
- Organisation can view applications and accept one trainer.
- Other applications for the same shift are automatically declined.
- Booking status updates correctly.
- Organisation can mark a shift completed.
- Organisation can rate the trainer.

### 1.17.3 17.3 Trainer Acceptance Criteria

- Trainer can sign up or log in.
- Trainer can complete a profile and add/select credential records.
- Trainer can view credential statuses.
- Trainer can browse open shifts.
- Trainer can apply for open shifts when eligible.
- Trainer can see pending, accepted, declined, cancelled, and completed application statuses.
- Trainer can see accepted bookings.
- Trainer rating updates on profile after the core demo rating flow.

### 1.17.4 17.4 Admin Acceptance Criteria

- Admin can sign up/log in or use demo login.
- Admin can view marketplace metrics.
- Admin can view users and shifts.
- Admin can view pending trainer credentials.
- Admin can approve or reject credentials.
- Admin can change trainer verification status from pending to verified.
- Admin dashboard displays number of organisations, number of trainers, verified trainers, open shifts, booked shifts, completed shifts, and platform revenue from completed bookings.

### 1.17.5 17.5 Business Model Acceptance Criteria

- The app must clearly show that trainer pay is protected.
- The organisation pays the platform fee on top.
- The 15% fee calculation must be correct.
- Example: $200 trainer pay -> $30 platform fee -> $230 organisation total.

## 1.18 18. Suggested Folder Structure

Use a clear, maintainable structure.

/app /(auth) login.tsx signup.tsx welcome.tsx /(organisation) index.tsx shifts.tsx post-shift.tsx applicants.tsx profile.tsx /(trainer) index.tsx browse.tsx applications.tsx bookings.tsx profile.tsx /(admin) index.tsx users.tsx shifts.tsx verification.tsx settings.tsx shift/[id].tsx /components ShiftCard.tsx ProfileCard.tsx CredentialBadge.tsx RatingDisplay.tsx FeeBreakdown.tsx EmptyState.tsx PrimaryButton.tsx /constants colours.ts sampleData.ts /lib supabase.ts auth.ts calculations.ts reliability.ts /store authStore.ts marketplaceStore.ts /types index.ts /supabase schema.sql seed.sql README.md .env.example

This folder structure can be adjusted if using Expo Router conventions differently, but the separation of auth, role screens, components, data, and utilities should remain.

## 1.19 19. Supabase Database Schema Draft

If using Supabase, include a schema similar to this. Codex can adapt it as needed.

create table public.profiles ( id uuid primary key references auth.users(id) on delete cascade, full_name text not null, role text not null check (role in ('organisation', 'trainer', 'admin')), created_at timestamp with time zone default now() ); create table public.organisations ( id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete cascade, organisation_name text not null, organisation_type text, contact_person text, phone text, email text, abn text, primary_sport text, location text, description text, verification_status text default 'unverified', average_rating numeric default 0, created_at timestamp with time zone default now() ); create table public.trainers ( id uuid primary key default gen_random_uuid(), user_id uuid references public.profiles(id) on delete cascade, full_name text not null, bio text, location text, travel_radius_km int default 20, sports_covered text[] default '{}', experience_level text, verification_status text default 'unverified', average_rating numeric default 0, reliability_score int default 100, completed_shifts int default 0, cancelled_shifts int default 0, no_shows int default 0, created_at timestamp with time zone default now() ); create table public.credentials ( id uuid primary key default gen_random_uuid(), trainer_id uuid references public.trainers(id) on delete cascade, type text not null, display_name text not null, status text default 'missing', expiry_date date, uploaded_file_name text, notes text, created_at timestamp with time zone default now() ); create table public.shifts ( id uuid primary key default gen_random_uuid(), organisation_id uuid references public.organisations(id) on delete cascade, title text not null, sport text, shift_date date, start_time time, end_time time, location text, address text, required_qualification text, experience_level_required text, duties text, equipment_notes text, uniform_notes text, trainer_pay numeric not null, platform_fee_percent numeric default 0.15, platform_fee_amount numeric not null, organisation_total numeric not null, status text default 'open', created_at timestamp with time zone default now() ); create table public.shift_applications ( id uuid primary key default gen_random_uuid(), shift_id uuid references public.shifts(id) on delete cascade, trainer_id uuid references public.trainers(id) on delete cascade, status text default 'pending', message text, applied_at timestamp with time zone default now() ); create table public.bookings ( id uuid primary key default gen_random_uuid(), shift_id uuid references public.shifts(id) on delete cascade, organisation_id uuid references public.organisations(id) on delete cascade, trainer_id uuid references public.trainers(id) on delete cascade, status text default 'upcoming', trainer_pay numeric not null, platform_fee_amount numeric not null, organisation_total numeric not null, created_at timestamp with time zone default now(), completed_at timestamp with time zone ); create table public.ratings ( id uuid primary key default gen_random_uuid(), booking_id uuid references public.bookings(id) on delete cascade, rater_user_id uuid references public.profiles(id) on delete cascade, rated_user_id uuid references public.profiles(id) on delete cascade, attendance int, punctuality int, communication int, professionalism int, preparedness int, overall int, comment text, created_at timestamp with time zone default now() );

For proof-of-concept speed, row-level security can initially be simplified, but production would require careful RLS policies.

## 1.20 20. Authentication Requirements

### 1.20.1 20.1 Required Behaviour

The first implementation should support real email/password sign-up and login using Supabase Auth.

Users choose a role during sign-up or are assigned one by demo login.

The role determines navigation after login.

User session persists after app restart when Supabase is enabled.

User can log out.

Do not include Google, Apple, SMS, or social login in v1. These can be future features.

### 1.20.2 20.2 Demo Login

Include easy demo login buttons for quick testing:

- Demo Organisation.
- Demo Trainer.
- Demo Admin.
When Supabase environment variables are configured, these may sign in using seeded Supabase accounts. When Supabase is not configured, they should use local demo auth and seeded local marketplace data.

### 1.20.3 20.3 Security Notes

For the proof of concept:

- Do not hard-code real secrets.
- Use .env for Supabase URL and anon key.
- Include .env.example.
- Do not commit real keys.
- Do not store real user documents.

## 1.21 21. README Requirements

The repository must include a clear README with:

- Project overview.
- Tech stack.
- Setup instructions.
- Environment variables.
- How to run locally.
- How to use demo accounts.
- What has been implemented.
- Known limitations.
- Future roadmap.
Suggested commands:

npm install npx expo start

If Supabase is used:

EXPO_PUBLIC_SUPABASE_URL=your_supabase_url EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

## 1.22 22. Build Instructions for Codex

Codex should complete the build in stages.

### 1.22.1 Stage 1: Project Setup

- Create a new Expo React Native TypeScript project if one does not already exist.
- Configure Expo Router and role-based route groups.
- Add basic app theme/constants and placeholder app name.
- Create README.md, .env.example, Supabase client setup, and environment variable support.
- Add Supabase schema.sql and optional seed.sql.

### 1.22.2 Stage 2: Types and Mock Data

- Add TypeScript types for users, organisations, trainers, credentials, shifts, applications, bookings, and ratings.
- Add seed/mock data for local demo mode.
- Add utilities for platform fee, status transitions, and reliability display.
- Add AsyncStorage/local persistence for demo-mode marketplace changes.

### 1.22.3 Stage 3: Authentication

- Build login and sign-up screens.
- Add role selection/onboarding.
- Add Supabase Auth email/password sign-up and login.
- Add demo login buttons for Organisation, Trainer, and Admin.
- Add local demo auth fallback if Supabase is not configured.
- Do not add Google, Apple, SMS, or social auth in v1.

### 1.22.4 Stage 4: Role-Based Navigation

- Route organisation users to organisation tabs.
- Route trainer users to trainer tabs.
- Route admin users to admin tabs.
- Add logout.

### 1.22.5 Stage 5: Organisation Experience

- Build organisation dashboard.
- Build post shift form.
- Build active shifts screen.
- Build applicant review screen.
- Build accept trainer action.
- Build booking detail screen.

### 1.22.6 Stage 6: Trainer Experience

- Build trainer dashboard.
- Build browse shifts screen.
- Build shift detail screen.
- Build apply action.
- Build applications screen.
- Build bookings screen.
- Build profile and credentials screen.

### 1.22.7 Stage 7: Admin Experience

- Build admin overview dashboard.
- Build users screen.
- Build shifts overview.
- Build verification screen.
- Add ability to update mock verification states.

### 1.22.8 Stage 8: Polish

- Add empty states, loading states, and basic form validation.
- Improve card styling and status badges.
- Confirm fee calculations, protected trainer pay, role navigation, and seed data.
- Confirm the full MVP demo script works in Supabase mode and local demo mode.
- Update README with setup instructions, demo accounts, implemented features, known limitations, and future roadmap.

## 1.23 23. Final Codex Prompt

Copy and paste the following into Codex when starting the build:

You are building a mobile app proof of concept for a verified, on-demand sports trainer staffing marketplace. Build it with Expo React Native, TypeScript, and Expo Router. The primary data mode must be Supabase-backed: use Supabase Auth for real email/password sign-up and login, and Supabase Postgres for users, profiles, organisations, trainer profiles, shifts, applications, bookings, credentials, and ratings. If Supabase environment variables are missing, automatically fall back to local demo mode using seeded mock data and AsyncStorage/local state so the app still opens and the full demo can be reviewed. Include demo login buttons for Demo Organisation, Demo Trainer, and Demo Admin. Do not implement Google, Apple, SMS, or social login in v1. The interactive v1 flow is: Organisation posts a shift, Trainer applies, Organisation accepts one trainer, all other pending applications for the shift become declined, a booking is created, Organisation marks the shift completed, Organisation rates the trainer, and the trainer profile rating/reliability display updates. Admin verification must modify live demo state: Admin can view pending trainer credentials, approve or reject them, change trainer verification from pending to verified, and make the trainer eligible to apply for verified shifts. Use these shift states: open, application_received, booked, completed, cancelled. Use these application states: pending, accepted, declined, cancelled, completed. Assume one trainer per shift in v1. The platform fee rule is fixed: trainer pay is protected; the organisation pays trainer pay plus a 15% platform service fee. Example: $200 trainer pay, $30 platform fee, $230 organisation total, trainer receives $200. Include role-based screens for Organisation, Trainer, and Admin; seed/mock data; Supabase schema.sql; optional seed.sql; .env.example; README.md; fee calculation utility; status badges; basic form validation; and clear comments identifying proof-of-concept placeholders. Display-only or out of scope in v1: payment processing, payouts, insurance validation, AHPRA/API validation, push notifications, in-app messaging, maps/location routing, advanced reliability algorithm, dispute resolution, multi-worker shift allocation, and App Store/Google Play deployment. The README must include setup instructions, demo accounts, environment variables, implemented features, known limitations, and future roadmap. Verify the app works in both Supabase mode and local demo mode.

## 1.24 24. Future Roadmap

### 1.24.1 Phase 1: Proof of Concept

- Role-based login.
- Mock marketplace.
- Shift posting and applications.
- Credential placeholders.
- Admin overview.
- Demo data.

### 1.24.2 Phase 2: Pilot MVP

- Real Supabase backend.
- Real user accounts.
- Manual credential review.
- Real shift posting.
- Real applications.
- Manual payment process outside app.
- Pilot with small group of clubs and trainers.

### 1.24.3 Phase 3: Operational MVP

- Payment integration.
- File uploads.
- Credential expiry tracking.
- Booking confirmations.
- Cancellation policy.
- Email notifications.
- Push notifications.
- Basic support/dispute process.

### 1.24.4 Phase 4: Scaled Marketplace

- Automated verification integrations where possible.
- Advanced matching.
- Preferred trainers.
- Organisation subscriptions.
- Trainer availability calendar.
- In-app messaging.
- Replacement coverage workflows.
- Analytics dashboard.
- Expansion into clinics, NDIS providers, and broader allied health roles.

## 1.25 25. Founder Notes

The proof of concept should prioritise clarity over complexity. The founders need something they can use to demonstrate the concept, test user interest, and guide early conversations with sporting organisations and trainers.

The first version should answer these questions:

- Does the marketplace concept make sense when users see it visually?
- Can organisations understand how to post a shift?
- Can trainers understand how to find and apply for work?
- Does the verification/rating concept increase trust?
- Is the 15% organisation-side service fee understandable?
- Does the app feel credible enough to test with real clubs and trainers?
If the proof of concept answers these questions, it has achieved its purpose.

## 1.26 26. External Implementation References

These links are useful for the developer/Codex build process:

- OpenAI Codex developer page: https://developers.openai.com/codex
- Expo documentation: https://docs.expo.dev/
- Expo EAS Build: https://docs.expo.dev/build/introduction/
- Expo build for app stores: https://docs.expo.dev/deploy/build-project/
- Expo submit to app stores: https://docs.expo.dev/deploy/submit-to-app-stores/
- Supabase React Native Auth: https://supabase.com/docs/guides/auth/quickstarts/react-native
- Supabase Expo React Native tutorial: https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native

## 27. Build-Readiness Update: State Contract, Demo Script, and Deliverables

### 27.1 State Management Contract

The app must support two data modes.

Mode A: Supabase mode. Used when Supabase URL and anon key are present in environment variables. Supabase should manage authentication, users, profiles, organisations, trainer profiles, shifts, applications, bookings, credentials, and ratings.

Mode B: Local demo mode. Used when Supabase environment variables are missing. Local demo mode should load seeded mock users and marketplace data, allow role-based demo login, persist basic changes locally during the session or using AsyncStorage, and visually behave the same as Supabase mode where possible.

The UI should not break if Supabase is not configured.

### 27.2 MVP Demo Script

- Step 1: Open app landing screen. Show three role pathways: Organisation, Trainer, Admin.
- Step 2: Organisation signs up/logs in. Organisation completes a simple profile with organisation name, sport type, contact person, and location.
- Step 3: Organisation posts a shift. Example: Title: Match Day Sports Trainer; Organisation: Alamein FC; Date: Saturday; Time: 10:00 AM - 2:00 PM; Location: Melbourne; Trainer pay: $200; Platform fee: 15%; Total organisation cost: $230; Required credentials: First Aid, CPR, Sports Trainer Level 1, WWCC.
- Step 4: Trainer signs up/logs in. Trainer completes profile and uploads/selects credentials.
- Step 5: Admin verifies trainer. Admin views pending credentials and approves them. Trainer status changes to verified.
- Step 6: Trainer browses open shifts. Trainer sees the Alamein FC shift and applies.
- Step 7: Organisation reviews applications. Organisation sees the trainer's profile, rating, credentials, and reliability status.
- Step 8: Organisation accepts trainer. Application becomes accepted. Other applications become declined. Shift status becomes booked.
- Step 9: Shift is marked completed. Organisation completes the booking.
- Step 10: Organisation rates trainer. Rating updates trainer profile.
- Step 11: Admin dashboard shows marketplace health: number of organisations, number of trainers, number of verified trainers, open shifts, booked shifts, completed shifts, and platform revenue from completed bookings.

### 27.3 Implementation Deliverables

- Expo React Native app.
- TypeScript.
- Role-based navigation.
- Supabase client setup.
- Environment variable support.
- .env.example file.
- README.md with setup instructions.
- Seed/mock data file.
- Local demo mode fallback.
- Supabase schema.sql file.
- Optional Supabase seed.sql file.
- Core screens for Organisation, Trainer, and Admin.
- Basic validation on forms.
- Fee calculation utility.
- Status badge components.
- Clear comments showing which features are proof-of-concept placeholders.
- Known limitations section in README.
