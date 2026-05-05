import { Redirect } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { EmptyState } from "../../components/EmptyState";
import { InfoCard } from "../../components/InfoCard";
import { Screen } from "../../components/Screen";
import { StatusBadge } from "../../components/StatusBadge";
import { colors } from "../../constants/colors";
import { formatCurrency } from "../../lib/calculations";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function TrainerApplicationsScreen() {
  const { currentUser } = useAuth();
  const { data } = useMarketplace();
  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "trainer") return <Redirect href="/" />;

  const trainer = data.trainers.find((item) => item.userId === currentUser.id) ?? data.trainers[0];
  const applications = data.applications.filter((item) => item.trainerId === trainer.id);
  const bookings = data.bookings.filter((item) => item.trainerId === trainer.id);

  return (
    <Screen>
      <Text style={styles.title}>Applications & bookings</Text>
      <Text style={styles.subtitle}>Track every application from pending through accepted, declined, and completed.</Text>
      {applications.length === 0 ? (
        <EmptyState title="No applications yet" message="Browse shifts and apply to start the demo workflow." />
      ) : (
        applications.map((application) => {
          const shift = data.shifts.find((item) => item.id === application.shiftId);
          return (
            <InfoCard key={application.id} title={shift?.title ?? "Shift"} subtitle={shift ? `${shift.date} | ${shift.location} | ${formatCurrency(shift.trainerPay)}` : undefined}>
              <StatusBadge label={application.status} tone={application.status === "accepted" || application.status === "completed" ? "verified" : application.status === "declined" ? "warning" : "pending"} />
            </InfoCard>
          );
        })
      )}
      <Text style={styles.sectionTitle}>Bookings</Text>
      {bookings.map((booking) => {
        const shift = data.shifts.find((item) => item.id === booking.shiftId);
        return (
          <InfoCard key={booking.id} title={shift?.title ?? "Completed demo booking"} subtitle={`${formatCurrency(booking.trainerPay)} trainer pay`}>
            <StatusBadge label={booking.status} tone={booking.status === "completed" ? "verified" : "neutral"} />
          </InfoCard>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.primary, fontSize: 30, fontWeight: "900", paddingTop: 16 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "900", marginTop: 8 }
});
