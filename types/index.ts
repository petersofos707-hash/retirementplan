export type UserRole = "organisation" | "trainer" | "admin";

export type AppUser = {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  createdAt: string;
};

export type OrganisationProfile = {
  id: string;
  userId: string;
  organisationName: string;
  organisationType: "sports_club" | "school" | "university" | "academy" | "tournament" | "clinic" | "other";
  contactPerson: string;
  phone: string;
  email: string;
  abn?: string;
  primarySport?: string;
  location: string;
  description: string;
  verificationStatus: "unverified" | "pending" | "verified";
  averageRating?: number;
};

export type TrainerProfile = {
  id: string;
  userId: string;
  fullName: string;
  bio: string;
  location: string;
  travelRadiusKm: number;
  sportsCovered: string[];
  experienceLevel: "student" | "early_career" | "experienced" | "senior";
  verificationStatus: "unverified" | "pending" | "partially_verified" | "verified" | "rejected";
  averageRating: number;
  reliabilityScore: number;
  completedShifts: number;
  cancelledShifts: number;
  noShows: number;
};

export type Credential = {
  id: string;
  trainerId: string;
  type: "first_aid" | "cpr" | "sports_trainer" | "wwcc" | "police_check" | "insurance" | "ahpra" | "other";
  displayName: string;
  status: "missing" | "pending" | "verified" | "expired" | "rejected";
  expiryDate?: string;
  uploadedFileName?: string;
  notes?: string;
};

export type ShiftStatus = "open" | "application_received" | "booked" | "completed" | "cancelled";

export type Shift = {
  id: string;
  organisationId: string;
  title: string;
  sport: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  requiredQualification: string;
  experienceLevelRequired: "student_ok" | "qualified" | "experienced";
  duties: string;
  equipmentNotes?: string;
  uniformNotes?: string;
  trainerPay: number;
  platformFeePercent: number;
  platformFeeAmount: number;
  organisationTotal: number;
  status: ShiftStatus;
  createdAt: string;
};

export type ApplicationStatus = "pending" | "accepted" | "declined" | "cancelled" | "completed";

export type ShiftApplication = {
  id: string;
  shiftId: string;
  trainerId: string;
  status: ApplicationStatus;
  message?: string;
  appliedAt: string;
};

export type BookingStatus = "upcoming" | "completed" | "cancelled" | "no_show";

export type Booking = {
  id: string;
  shiftId: string;
  organisationId: string;
  trainerId: string;
  status: BookingStatus;
  trainerPay: number;
  platformFeeAmount: number;
  organisationTotal: number;
  createdAt: string;
  completedAt?: string;
};

export type Rating = {
  id: string;
  bookingId: string;
  raterUserId: string;
  ratedUserId: string;
  attendance: number;
  punctuality: number;
  communication: number;
  professionalism: number;
  preparedness: number;
  overall: number;
  comment?: string;
  createdAt: string;
};

export type MarketplaceData = {
  users: AppUser[];
  organisations: OrganisationProfile[];
  trainers: TrainerProfile[];
  credentials: Credential[];
  shifts: Shift[];
  applications: ShiftApplication[];
  bookings: Booking[];
  ratings: Rating[];
};
