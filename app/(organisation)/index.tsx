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

export default function OrganisationHome() {
  const { currentUser, dataMode, signOut } = useAuth();
  const { data } = useMarketplace();

  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "organisation") return <Redirect href="/" />;

  const organisation = data.organisations.find((item) => item.userId === currentUser.id) ?? data.organisations[0];
  const shifts = data.shifts.filter((shift) => shift.organisationId === organisation.id);
  const activeShifts = shifts.filter((shift) => shift.status === "open" || shift.status === "application_received");
  const totalSpend = shifts.reduce((sum, shift) => sum + shift.organisationTotal, 0);

  return (
    <Screen>
      <View style={styles.header}>
        <StatusBadge label={dataMode === "supabase" ? "Supabase mode" : "Local demo mode"} />
        <Text style={styles.title}>Organisation dashboard</Text>
        <Text style={styles.subtitle}>{organisation.organisationName} can review seed shifts and marketplace readiness.</Text>
      </View>

      <View style={styles.metrics}>
        <Metric label="Active shifts" value={String(activeShifts.length)} />
        <Metric label="Est. spend" value={formatCurrency(totalSpend)} />
      </View>

      <InfoCard title="Stage 1 shell" subtitle="Post-shift, applicant review, acceptance, and completion flows are planned for Stage 2." />

      {shifts.map((shift) => (
        <InfoCard key={shift.id} title={shift.title} subtitle={`${shift.date}, ${shift.startTime} - ${shift.endTime} | ${shift.location}`}>
          <View style={styles.row}>
            <StatusBadge label={shift.status.replace("_", " ")} />
            <Text style={styles.money}>{formatCurrency(shift.trainerPay)} trainer pay</Text>
          </View>
          <Text style={styles.note}>Organisation total: {formatCurrency(shift.organisationTotal)} including 15% platform fee.</Text>
        </InfoCard>
      ))}

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
  metrics: {
    flexDirection: "row",
    gap: 12
  },
  metric: {
    flex: 1,
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 10
  },
  money: {
    color: colors.text,
    fontWeight: "800"
  },
  note: {
    color: colors.muted,
    lineHeight: 20
  }
});
