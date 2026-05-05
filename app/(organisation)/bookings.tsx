import { Redirect } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { EmptyState } from "../../components/EmptyState";
import { InfoCard } from "../../components/InfoCard";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { StatusBadge } from "../../components/StatusBadge";
import { colors } from "../../constants/colors";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function OrganisationBookingsScreen() {
  const { currentUser } = useAuth();
  const { data, completeBooking, rateTrainer } = useMarketplace();
  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "organisation") return <Redirect href="/" />;

  const organisationIds = data.organisations.filter((org) => org.userId === currentUser.id).map((org) => org.id);
  const bookings = data.bookings.filter((booking) => organisationIds.includes(booking.organisationId));

  return (
    <Screen>
      <Text style={styles.title}>Bookings & ratings</Text>
      <Text style={styles.subtitle}>Complete a booked shift, then submit a demo 5-star rating to update the trainer profile.</Text>
      {bookings.length === 0 ? (
        <EmptyState title="No bookings yet" message="Accept a pending applicant to create the first booking." />
      ) : (
        bookings.map((booking) => {
          const shift = data.shifts.find((item) => item.id === booking.shiftId);
          const trainer = data.trainers.find((item) => item.id === booking.trainerId);
          const rated = data.ratings.some((rating) => rating.bookingId === booking.id);
          return (
            <InfoCard key={booking.id} title={shift?.title ?? "Completed demo booking"} subtitle={trainer?.fullName ?? "Trainer"}>
              <StatusBadge label={booking.status} tone={booking.status === "completed" ? "verified" : "neutral"} />
              <Text style={styles.note}>Trainer pay stays protected. Organisation total includes the platform fee.</Text>
              {booking.status !== "completed" ? <PrimaryButton label="Mark completed" onPress={() => completeBooking(booking.id)} /> : null}
              {booking.status === "completed" && !rated && trainer ? (
                <PrimaryButton label="Rate trainer 5 stars" onPress={() => rateTrainer({ bookingId: booking.id, raterUserId: currentUser.id, ratedUserId: trainer.userId, overall: 5, comment: "Great demo shift coverage." })} />
              ) : null}
              {rated ? <Text style={styles.success}>Rating submitted and trainer profile updated.</Text> : null}
            </InfoCard>
          );
        })
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.primary, fontSize: 30, fontWeight: "900", paddingTop: 16 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  note: { color: colors.muted, lineHeight: 20 },
  success: { color: colors.verified, fontWeight: "900" }
});
