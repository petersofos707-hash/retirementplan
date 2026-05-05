create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role text not null check (role in ('organisation', 'trainer', 'admin')),
  created_at timestamptz default now()
);

create table if not exists public.organisations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  organisation_name text not null,
  organisation_type text,
  contact_person text,
  phone text,
  email text,
  abn text,
  primary_sport text,
  location text,
  description text,
  verification_status text default 'unverified' check (verification_status in ('unverified', 'pending', 'verified')),
  average_rating numeric default 0,
  created_at timestamptz default now()
);

create table if not exists public.trainers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade,
  full_name text not null,
  bio text,
  location text,
  travel_radius_km int default 20,
  sports_covered text[] default '{}',
  experience_level text,
  verification_status text default 'unverified' check (verification_status in ('unverified', 'pending', 'partially_verified', 'verified', 'rejected')),
  average_rating numeric default 0,
  reliability_score int default 100,
  completed_shifts int default 0,
  cancelled_shifts int default 0,
  no_shows int default 0,
  created_at timestamptz default now()
);

create table if not exists public.credentials (
  id uuid primary key default gen_random_uuid(),
  trainer_id uuid references public.trainers(id) on delete cascade,
  type text not null,
  display_name text not null,
  status text default 'missing' check (status in ('missing', 'pending', 'verified', 'expired', 'rejected')),
  expiry_date date,
  uploaded_file_name text,
  notes text,
  created_at timestamptz default now()
);

create table if not exists public.shifts (
  id uuid primary key default gen_random_uuid(),
  organisation_id uuid references public.organisations(id) on delete cascade,
  title text not null,
  sport text,
  shift_date date,
  start_time time,
  end_time time,
  location text,
  address text,
  required_qualification text,
  experience_level_required text,
  duties text,
  equipment_notes text,
  uniform_notes text,
  trainer_pay numeric not null,
  platform_fee_percent numeric default 0.15,
  platform_fee_amount numeric not null,
  organisation_total numeric not null,
  status text default 'open' check (status in ('open', 'application_received', 'booked', 'completed', 'cancelled')),
  created_at timestamptz default now()
);

create table if not exists public.shift_applications (
  id uuid primary key default gen_random_uuid(),
  shift_id uuid references public.shifts(id) on delete cascade,
  trainer_id uuid references public.trainers(id) on delete cascade,
  status text default 'pending' check (status in ('pending', 'accepted', 'declined', 'cancelled', 'completed')),
  message text,
  applied_at timestamptz default now(),
  unique (shift_id, trainer_id)
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  shift_id uuid references public.shifts(id) on delete cascade,
  organisation_id uuid references public.organisations(id) on delete cascade,
  trainer_id uuid references public.trainers(id) on delete cascade,
  status text default 'upcoming' check (status in ('upcoming', 'completed', 'cancelled', 'no_show')),
  trainer_pay numeric not null,
  platform_fee_amount numeric not null,
  organisation_total numeric not null,
  created_at timestamptz default now(),
  completed_at timestamptz
);

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid references public.bookings(id) on delete cascade,
  rater_user_id uuid references public.profiles(id) on delete cascade,
  rated_user_id uuid references public.profiles(id) on delete cascade,
  attendance int check (attendance between 1 and 5),
  punctuality int check (punctuality between 1 and 5),
  communication int check (communication between 1 and 5),
  professionalism int check (professionalism between 1 and 5),
  preparedness int check (preparedness between 1 and 5),
  overall int check (overall between 1 and 5),
  comment text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.organisations enable row level security;
alter table public.trainers enable row level security;
alter table public.credentials enable row level security;
alter table public.shifts enable row level security;
alter table public.shift_applications enable row level security;
alter table public.bookings enable row level security;
alter table public.ratings enable row level security;

-- POC policies: authenticated users can read marketplace data. Tighten these before production.
create policy "profiles_read_authenticated" on public.profiles for select to authenticated using (true);
create policy "organisations_read_authenticated" on public.organisations for select to authenticated using (true);
create policy "trainers_read_authenticated" on public.trainers for select to authenticated using (true);
create policy "credentials_read_authenticated" on public.credentials for select to authenticated using (true);
create policy "shifts_read_authenticated" on public.shifts for select to authenticated using (true);
create policy "applications_read_authenticated" on public.shift_applications for select to authenticated using (true);
create policy "bookings_read_authenticated" on public.bookings for select to authenticated using (true);
create policy "ratings_read_authenticated" on public.ratings for select to authenticated using (true);
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "profiles_update_own" on public.profiles for update to authenticated using (auth.uid() = id);
