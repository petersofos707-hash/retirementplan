import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { InfoCard } from "../../components/InfoCard";
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
        <Text style={styles.subtitle}>Marketplace health from seeded data. Live verification actions arrive in Stage 2.</Text>
      </View>

      <View style={styles.grid}>
        <Metric label="Organisations" value={String(data.organisations.length)} />
        <Metric label="Trainers" value={String(data.trainers.length)} />
        <Metric label="Verified trainers" value={String(verifiedTrainers)} />
        <Metric label="Open shifts" value={String(openShifts)} />
        <Metric label="Booked shifts" value={String(bookedShifts)} />
        <Metric label="Completed shifts" value={String(completedShifts)} />
      </View>

      <InfoCard title="Platform revenue" subtitle={`${formatCurrency(platformRevenue)} from completed seeded bookings.`} />

      <InfoCard title="Pending manual verification">
        {data.credentials
          .filter((credential) => credential.status === "pending")
          .map((credential) => (
            <Text key={credential.id} style={styles.note}>
              {credential.displayName} requires admin review.
            </Text>
          ))}
      </InfoCard>

      <PrimaryButton label="Reset local demo data" variant="secondary" onPress={resetDemoData} />
      <PrimaryButton label="Log out" variant="secondary" onPress={signOut} />
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
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
  metric: {
    width: "47%",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.surface,
    padding: 14
  },
  metricValue: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "900"
  },
  metricLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  note: {
    color: colors.muted,
    lineHeight: 20
  }
});
