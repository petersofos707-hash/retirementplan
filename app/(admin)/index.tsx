import { router, Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { InfoCard } from "../../components/InfoCard";
import { MetricTile } from "../../components/MetricTile";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { StatusBadge } from "../../components/StatusBadge";
import { colors } from "../../constants/colors";
import { formatCurrency } from "../../lib/calculations";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function AdminHome() {
  const { currentUser, dataMode, signOut } = useAuth();
  const { data, resetDemoData } = useMarketplace();

  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "admin") return <Redirect href="/" />;

  const verifiedTrainers = data.trainers.filter((trainer) => trainer.verificationStatus === "verified").length;
  const openShifts = data.shifts.filter((shift) => shift.status === "open").length;
  const bookedShifts = data.shifts.filter((shift) => shift.status === "booked").length;
  const completedShifts = data.shifts.filter((shift) => shift.status === "completed").length;
  const platformRevenue = data.bookings
    .filter((booking) => booking.status === "completed")
    .reduce((sum, booking) => sum + booking.platformFeeAmount, 0);

  return (
    <Screen>
      <View style={styles.header}>
        <StatusBadge label={dataMode === "supabase" ? "Supabase mode" : "Local demo mode"} />
        <Text style={styles.title}>Admin dashboard</Text>
        <Text style={styles.subtitle}>Review credentials, watch booking activity, and reset the local demo state between walkthroughs.</Text>
      </View>

      <View style={styles.grid}>
        <MetricTile label="Organisations" value={String(data.organisations.length)} />
        <MetricTile label="Trainers" value={String(data.trainers.length)} />
        <MetricTile label="Verified" value={String(verifiedTrainers)} />
        <MetricTile label="Open shifts" value={String(openShifts)} />
        <MetricTile label="Booked" value={String(bookedShifts)} />
        <MetricTile label="Completed" value={String(completedShifts)} />
      </View>

      <InfoCard title="Platform revenue" subtitle={`${formatCurrency(platformRevenue)} from completed seeded bookings.`} />

      <InfoCard title="Pending manual verification">
        {data.credentials.filter((credential) => credential.status === "pending").length === 0 ? (
          <Text style={styles.note}>No pending credentials. Reset demo data to replay the admin flow.</Text>
        ) : (
          data.credentials
            .filter((credential) => credential.status === "pending")
            .map((credential) => {
              const trainer = data.trainers.find((item) => item.id === credential.trainerId);
              return (
                <Text key={credential.id} style={styles.note}>
                  {trainer?.fullName ?? "Trainer"}: {credential.displayName} requires review.
                </Text>
              );
            })
        )}
      </InfoCard>

      <PrimaryButton label="Open verification queue" onPress={() => router.push("/(admin)/verification")} />
      <PrimaryButton label="Reset local demo data" variant="secondary" onPress={resetDemoData} />
      <PrimaryButton label="Log out" variant="secondary" onPress={signOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 10,
    paddingTop: 16
  },
  title: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12
  },
  note: {
    color: colors.muted,
    lineHeight: 20
  }
});
