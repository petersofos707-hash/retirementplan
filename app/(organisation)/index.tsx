import { router, Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { EmptyState } from "../../components/EmptyState";
import { FeeBreakdown } from "../../components/FeeBreakdown";
import { MetricTile } from "../../components/MetricTile";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { ShiftCard } from "../../components/ShiftCard";
import { StatusBadge } from "../../components/StatusBadge";
import { colors } from "../../constants/colors";
import { formatCurrency } from "../../lib/calculations";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function OrganisationHome() {
  const { currentUser, dataMode, signOut } = useAuth();
  const { data } = useMarketplace();

  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "organisation") return <Redirect href="/" />;

  const organisation = data.organisations.find((item) => item.userId === currentUser.id) ?? data.organisations[0];
  const shifts = data.shifts.filter((shift) => shift.organisationId === organisation.id);
  const activeShifts = shifts.filter((shift) => shift.status === "open" || shift.status === "application_received");
  const bookings = data.bookings.filter((booking) => booking.organisationId === organisation.id);
  const completedRevenue = bookings.filter((booking) => booking.status === "completed").reduce((sum, booking) => sum + booking.platformFeeAmount, 0);
  const applicantCount = data.applications.filter((application) => shifts.some((shift) => shift.id === application.shiftId) && application.status === "pending").length;

  return (
    <Screen>
      <View style={styles.header}>
        <StatusBadge label={dataMode === "supabase" ? "Supabase mode" : "Local demo mode"} />
        <Text style={styles.title}>{organisation.organisationName}</Text>
        <Text style={styles.subtitle}>Post shifts, review applicants, protect trainer pay, and complete bookings from one demo control room.</Text>
      </View>

      <View style={styles.metrics}>
        <MetricTile label="Active shifts" value={String(activeShifts.length)} />
        <MetricTile label="Pending applicants" value={String(applicantCount)} />
        <MetricTile label="Platform revenue" value={formatCurrency(completedRevenue)} detail="Completed bookings only" />
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Post a shift" onPress={() => router.push("/(organisation)/post-shift")} />
        <PrimaryButton label="Review applicants" variant="secondary" onPress={() => router.push("/(organisation)/applicants")} />
        <PrimaryButton label="Bookings & ratings" variant="secondary" onPress={() => router.push("/(organisation)/bookings")} />
      </View>

      <Text style={styles.sectionTitle}>Your shifts</Text>
      {shifts.length === 0 ? (
        <EmptyState title="No shifts yet" message="Post the first shift to start the marketplace demo." />
      ) : (
        shifts.map((shift) => (
          <ShiftCard key={shift.id} shift={shift}>
            <FeeBreakdown trainerPay={shift.trainerPay} platformFeeAmount={shift.platformFeeAmount} organisationTotal={shift.organisationTotal} />
          </ShiftCard>
        ))
      )}

      <PrimaryButton label="Log out" variant="secondary" onPress={signOut} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: 10, paddingTop: 16 },
  title: { color: colors.primary, fontSize: 31, fontWeight: "900" },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  metrics: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  actions: { gap: 10 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "900", marginTop: 6 }
});
