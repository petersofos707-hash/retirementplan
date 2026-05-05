import { calculateFeeBreakdown } from "../lib/calculations";
import { MarketplaceData } from "../types";

const shiftOneFees = calculateFeeBreakdown(220);
const shiftTwoFees = calculateFeeBreakdown(180);
const shiftThreeFees = calculateFeeBreakdown(260);

export const demoPasswords: Record<string, string> = {
  "org@example.com": "password123",
  "trainer@example.com": "password123",
  "admin@example.com": "password123"
};

export const sampleData: MarketplaceData = {
  users: [
    {
      id: "user-org-1",
      email: "org@example.com",
      fullName: "Alex Morgan",
      role: "organisation",
      createdAt: "2026-05-02T00:00:00.000Z"
    },
    {
      id: "user-trainer-1",
      email: "trainer@example.com",
      fullName: "Sarah Nguyen",
      role: "trainer",
      createdAt: "2026-05-02T00:00:00.000Z"
    },
    {
      id: "user-admin-1",
      email: "admin@example.com",
      fullName: "Founder Admin",
      role: "admin",
      createdAt: "2026-05-02T00:00:00.000Z"
    }
  ],
  organisations: [
    {
      id: "org-1",
      userId: "user-org-1",
      organisationName: "Alamein FC",
      organisationType: "sports_club",
      contactPerson: "Alex Morgan",
      phone: "0400 000 111",
      email: "org@example.com",
      primarySport: "Soccer",
      location: "Melbourne, VIC",
      description: "Community football club requiring match-day sports trainer coverage.",
      verificationStatus: "verified",
      averageRating: 4.7
    },
    {
      id: "org-2",
      userId: "user-org-1",
      organisationName: "Melbourne Uni Soccer Club",
      organisationType: "university",
      contactPerson: "Jordan Lee",
      phone: "0400 000 222",
      email: "ops@musoccer.example",
      primarySport: "Soccer",
      location: "Parkville, VIC",
      description: "University club seeking casual sports trainer support for weekend fixtures.",
      verificationStatus: "pending",
      averageRating: 4.5
    }
  ],
  trainers: [
    {
      id: "trainer-1",
      userId: "user-trainer-1",
      fullName: "Sarah Nguyen",
      bio: "Early-career sports trainer with soccer, netball, and basketball coverage experience.",
      location: "Melbourne, VIC",
      travelRadiusKm: 25,
      sportsCovered: ["Soccer", "Netball", "Basketball"],
      experienceLevel: "early_career",
      verificationStatus: "verified",
      averageRating: 4.8,
      reliabilityScore: 96,
      completedShifts: 18,
      cancelledShifts: 0,
      noShows: 0
    },
    {
      id: "trainer-2",
      userId: "user-trainer-2",
      fullName: "James O'Connor",
      bio: "Physiotherapy student with AFL, soccer, and rugby match-day support experience.",
      location: "Brunswick, VIC",
      travelRadiusKm: 20,
      sportsCovered: ["AFL", "Soccer", "Rugby"],
      experienceLevel: "student",
      verificationStatus: "partially_verified",
      averageRating: 4.5,
      reliabilityScore: 88,
      completedShifts: 7,
      cancelledShifts: 1,
      noShows: 0
    }
  ],
  credentials: [
    {
      id: "cred-1",
      trainerId: "trainer-1",
      type: "first_aid",
      displayName: "First Aid Certificate",
      status: "verified",
      expiryDate: "2027-03-15"
    },
    {
      id: "cred-2",
      trainerId: "trainer-1",
      type: "cpr",
      displayName: "CPR Certificate",
      status: "verified",
      expiryDate: "2026-11-20"
    },
    {
      id: "cred-3",
      trainerId: "trainer-1",
      type: "sports_trainer",
      displayName: "Sports Trainer Level 1",
      status: "verified",
      expiryDate: "2027-09-01"
    },
    {
      id: "cred-4",
      trainerId: "trainer-2",
      type: "first_aid",
      displayName: "First Aid Certificate",
      status: "verified",
      expiryDate: "2027-01-30"
    },
    {
      id: "cred-5",
      trainerId: "trainer-2",
      type: "cpr",
      displayName: "CPR Certificate",
      status: "verified",
      expiryDate: "2026-10-18"
    },
    {
      id: "cred-6",
      trainerId: "trainer-2",
      type: "sports_trainer",
      displayName: "Sports Trainer Level 1",
      status: "verified",
      expiryDate: "2027-05-05"
    },
    {
      id: "cred-7",
      trainerId: "trainer-2",
      type: "wwcc",
      displayName: "Working With Children Check",
      status: "pending",
      notes: "Manual admin verification placeholder."
    }
  ],
  shifts: [
    {
      id: "shift-1",
      organisationId: "org-1",
      title: "Match-Day Sports Trainer",
      sport: "Soccer",
      date: "Saturday",
      startTime: "11:00 AM",
      endTime: "4:00 PM",
      location: "Ashburton, VIC",
      address: "Alamein FC Main Ground",
      requiredQualification: "First aid + CPR + sports trainer qualification",
      experienceLevelRequired: "qualified",
      duties: "Pre-game strapping, acute injury management, first aid coverage, and communication with coaching staff.",
      equipmentNotes: "Club first aid kit supplied.",
      trainerPay: shiftOneFees.trainerPay,
      platformFeePercent: shiftOneFees.platformFeePercent,
      platformFeeAmount: shiftOneFees.platformFeeAmount,
      organisationTotal: shiftOneFees.organisationTotal,
      status: "open",
      createdAt: "2026-05-02T00:00:00.000Z"
    },
    {
      id: "shift-2",
      organisationId: "org-2",
      title: "Senior Men's Match Coverage",
      sport: "Soccer",
      date: "Sunday",
      startTime: "1:00 PM",
      endTime: "5:30 PM",
      location: "Parkville, VIC",
      address: "University Oval",
      requiredQualification: "First aid + CPR",
      experienceLevelRequired: "student_ok",
      duties: "Sideline coverage, basic taping, injury response, and incident documentation.",
      trainerPay: shiftTwoFees.trainerPay,
      platformFeePercent: shiftTwoFees.platformFeePercent,
      platformFeeAmount: shiftTwoFees.platformFeeAmount,
      organisationTotal: shiftTwoFees.organisationTotal,
      status: "application_received",
      createdAt: "2026-05-02T00:00:00.000Z"
    },
    {
      id: "shift-3",
      organisationId: "org-1",
      title: "Tournament First Aid/Sports Trainer",
      sport: "Basketball",
      date: "Saturday",
      startTime: "8:00 AM",
      endTime: "2:00 PM",
      location: "Box Hill, VIC",
      address: "Eastern Metro Stadium",
      requiredQualification: "First aid + CPR",
      experienceLevelRequired: "qualified",
      duties: "First aid station, acute injury response, and emergency escalation if required.",
      trainerPay: shiftThreeFees.trainerPay,
      platformFeePercent: shiftThreeFees.platformFeePercent,
      platformFeeAmount: shiftThreeFees.platformFeeAmount,
      organisationTotal: shiftThreeFees.organisationTotal,
      status: "open",
      createdAt: "2026-05-02T00:00:00.000Z"
    }
  ],
  applications: [
    {
      id: "app-1",
      shiftId: "shift-2",
      trainerId: "trainer-1",
      status: "pending",
      message: "Available for the full match window.",
      appliedAt: "2026-05-02T01:00:00.000Z"
    }
  ],
  bookings: [
    {
      id: "booking-1",
      shiftId: "shift-demo-completed",
      organisationId: "org-1",
      trainerId: "trainer-1",
      status: "completed",
      trainerPay: 200,
      platformFeeAmount: 30,
      organisationTotal: 230,
      createdAt: "2026-04-20T00:00:00.000Z",
      completedAt: "2026-04-21T06:00:00.000Z"
    }
  ],
  ratings: [
    {
      id: "rating-1",
      bookingId: "booking-1",
      raterUserId: "user-org-1",
      ratedUserId: "user-trainer-1",
      attendance: 5,
      punctuality: 5,
      communication: 5,
      professionalism: 5,
      preparedness: 4,
      overall: 5,
      comment: "Excellent sideline coverage and communication.",
      createdAt: "2026-04-21T07:00:00.000Z"
    }
  ]
};
