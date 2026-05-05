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

export default function TrainerHome() {
  const { currentUser, dataMode, signOut } = useAuth();
  const { data } = useMarketplace();

  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "trainer") return <Redirect href="/" />;

  const trainer = data.trainers.find((item) => item.userId === currentUser.id) ?? data.trainers[0];
  const credentials = data.credentials.filter((credential) => credential.trainerId === trainer.id);
  const openShifts = data.shifts.filter((shift) => shift.status === "open" || shift.status === "application_received");

  return (
    <Screen>
      <View style={styles.header}>
        <StatusBadge label={dataMode === "supabase" ? "Supabase mode" : "Local demo mode"} />
        <Text style={styles.title}>Trainer dashboard</Text>
        <Text style={styles.subtitle}>Welcome, {trainer.fullName}. Stage 1 shows seeded profile, credentials, and available shifts.</Text>
      </View>

      <View style={styles.metrics}>
        <Metric label="Rating" value={trainer.averageRating.toFixed(1)} />
        <Metric label="Reliability" value={`${trainer.reliabilityScore}`} />
      </View>

      <InfoCard title="Verification status">
        <StatusBadge label={trainer.verificationStatus.replace("_", " ")} tone={trainer.verificationStatus === "verified" ? "verified" : "pending"} />
        {credentials.map((credential) => (
          <Text key={credential.id} style={styles.note}>
            {credential.displayName}: {credential.status}
          </Text>
        ))}
      </InfoCard>

      {openShifts.map((shift) => (
        <InfoCard key={shift.id} title={shift.title} subtitle={`${shift.sport} | ${shift.date}, ${shift.startTime} - ${shift.endTime}`}>
          <Text style={styles.note}>{shift.location}</Text>
          <Text style={styles.money}>{formatCurrency(shift.trainerPay)} trainer pay</Text>
          <Text style={styles.note}>Application actions are scheduled for Stage 2.</Text>
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
  money: {
    color: colors.text,
    fontWeight: "800"
  },
  note: {
    color: colors.muted,
    lineHeight: 20
  }
});
