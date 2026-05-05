import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from "react";

import { sampleData } from "../constants/sampleData";
import { calculateFeeBreakdown } from "../lib/calculations";
import { Credential, MarketplaceData, Rating, Shift } from "../types";

type CreateShiftInput = {
  organisationId: string;
  title: string;
  sport: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  requiredQualification: string;
  trainerPay: number;
  duties: string;
};

type RateTrainerInput = {
  bookingId: string;
  raterUserId: string;
  ratedUserId: string;
  overall: number;
  comment?: string;
};

type MarketplaceContextValue = {
  data: MarketplaceData;
  createShift: (input: CreateShiftInput) => Promise<string>;
  applyForShift: (shiftId: string, trainerId: string) => Promise<void>;
  acceptApplication: (applicationId: string) => Promise<void>;
  updateCredentialStatus: (credentialId: string, status: Credential["status"]) => Promise<void>;
  completeBooking: (bookingId: string) => Promise<void>;
  rateTrainer: (input: RateTrainerInput) => Promise<void>;
  resetDemoData: () => Promise<void>;
};

const STORAGE_KEY = "verified_staffing_marketplace_data_stage_2a";
const MarketplaceContext = createContext<MarketplaceContextValue | undefined>(undefined);

export function MarketplaceProvider({ children }: PropsWithChildren) {
  const [data, setData] = useState<MarketplaceData>(sampleData);

  async function commitData(nextData: MarketplaceData) {
    setData(nextData);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
  }

  useEffect(() => {
    async function hydrate() {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setData(JSON.parse(stored));
      } else {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
      }
    }

    hydrate();
  }, []);

  async function createShift(input: CreateShiftInput) {
    const fees = calculateFeeBreakdown(input.trainerPay);
    const id = `shift-${Date.now()}`;
    const shift: Shift = {
      id,
      organisationId: input.organisationId,
      title: input.title,
      sport: input.sport,
      date: input.date,
      startTime: input.startTime,
      endTime: input.endTime,
      location: input.location,
      address: input.address,
      requiredQualification: input.requiredQualification,
      experienceLevelRequired: "qualified",
      duties: input.duties,
      equipmentNotes: "Proof-of-concept equipment note placeholder.",
      trainerPay: fees.trainerPay,
      platformFeePercent: fees.platformFeePercent,
      platformFeeAmount: fees.platformFeeAmount,
      organisationTotal: fees.organisationTotal,
      status: "open",
      createdAt: new Date().toISOString()
    };

    await commitData({ ...data, shifts: [shift, ...data.shifts] });
    return id;
  }

  async function applyForShift(shiftId: string, trainerId: string) {
    const alreadyApplied = data.applications.some((application) => application.shiftId === shiftId && application.trainerId === trainerId);
    if (alreadyApplied) return;

    const application = {
      id: `app-${Date.now()}`,
      shiftId,
      trainerId,
      status: "pending" as const,
      message: "Available and credentials reviewed in the demo flow.",
      appliedAt: new Date().toISOString()
    };

    await commitData({
      ...data,
      applications: [application, ...data.applications],
      shifts: data.shifts.map((shift) => (shift.id === shiftId ? { ...shift, status: "application_received" } : shift))
    });
  }

  async function acceptApplication(applicationId: string) {
    const acceptedApplication = data.applications.find((application) => application.id === applicationId);
    const shift = data.shifts.find((item) => item.id === acceptedApplication?.shiftId);
    if (!acceptedApplication || !shift) return;

    const booking = {
      id: `booking-${Date.now()}`,
      shiftId: shift.id,
      organisationId: shift.organisationId,
      trainerId: acceptedApplication.trainerId,
      status: "upcoming" as const,
      trainerPay: shift.trainerPay,
      platformFeeAmount: shift.platformFeeAmount,
      organisationTotal: shift.organisationTotal,
      createdAt: new Date().toISOString()
    };

    await commitData({
      ...data,
      shifts: data.shifts.map((item) => (item.id === shift.id ? { ...item, status: "booked" } : item)),
      applications: data.applications.map((application) => {
        if (application.id === applicationId) return { ...application, status: "accepted" };
        if (application.shiftId === shift.id && application.status === "pending") return { ...application, status: "declined" };
        return application;
      }),
      bookings: [booking, ...data.bookings]
    });
  }

  async function updateCredentialStatus(credentialId: string, status: Credential["status"]) {
    const credential = data.credentials.find((item) => item.id === credentialId);
    if (!credential) return;

    const nextCredentials = data.credentials.map((item) => (item.id === credentialId ? { ...item, status } : item));
    const trainerCredentials = nextCredentials.filter((item) => item.trainerId === credential.trainerId);
    const verifiedRequired = ["first_aid", "cpr", "sports_trainer", "wwcc"].every((type) =>
      trainerCredentials.some((item) => item.type === type && item.status === "verified")
    );

    await commitData({
      ...data,
      credentials: nextCredentials,
      trainers: data.trainers.map((trainer) => {
        if (trainer.id !== credential.trainerId) return trainer;
        if (verifiedRequired) return { ...trainer, verificationStatus: "verified" };
        if (status === "rejected") return { ...trainer, verificationStatus: "rejected" };
        return { ...trainer, verificationStatus: "pending" };
      })
    });
  }

  async function completeBooking(bookingId: string) {
    const booking = data.bookings.find((item) => item.id === bookingId);
    if (!booking) return;

    await commitData({
      ...data,
      bookings: data.bookings.map((item) => (item.id === bookingId ? { ...item, status: "completed", completedAt: new Date().toISOString() } : item)),
      shifts: data.shifts.map((shift) => (shift.id === booking.shiftId ? { ...shift, status: "completed" } : shift)),
      applications: data.applications.map((application) =>
        application.shiftId === booking.shiftId && application.trainerId === booking.trainerId ? { ...application, status: "completed" } : application
      )
    });
  }

  async function rateTrainer(input: RateTrainerInput) {
    const booking = data.bookings.find((item) => item.id === input.bookingId);
    if (!booking) return;

    const rating: Rating = {
      id: `rating-${Date.now()}`,
      bookingId: input.bookingId,
      raterUserId: input.raterUserId,
      ratedUserId: input.ratedUserId,
      attendance: input.overall,
      punctuality: input.overall,
      communication: input.overall,
      professionalism: input.overall,
      preparedness: input.overall,
      overall: input.overall,
      comment: input.comment,
      createdAt: new Date().toISOString()
    };

    const nextRatings = [rating, ...data.ratings];
    await commitData({
      ...data,
      ratings: nextRatings,
      trainers: data.trainers.map((trainer) => {
        if (trainer.id !== booking.trainerId) return trainer;
        const trainerRatings = nextRatings.filter((item) => item.ratedUserId === trainer.userId);
        const averageRating = trainerRatings.reduce((sum, item) => sum + item.overall, 0) / trainerRatings.length;
        const reliabilityScore = Math.max(0, Math.min(100, Math.round(trainer.reliabilityScore + (input.overall >= 4 ? 2 : -5))));
        return {
          ...trainer,
          averageRating: Number(averageRating.toFixed(1)),
          reliabilityScore,
          completedShifts: trainer.completedShifts + 1
        };
      })
    });
  }

  async function resetDemoData() {
    await commitData(sampleData);
  }

  const value = useMemo(
    () => ({ data, createShift, applyForShift, acceptApplication, updateCredentialStatus, completeBooking, rateTrainer, resetDemoData }),
    [data]
  );

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>;
}

export function useMarketplace() {
  const value = useContext(MarketplaceContext);
  if (!value) {
    throw new Error("useMarketplace must be used inside MarketplaceProvider");
  }
  return value;
}
