import { Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { CredentialRow } from "../../components/CredentialRow";
import { EmptyState } from "../../components/EmptyState";
import { InfoCard } from "../../components/InfoCard";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { StatusBadge } from "../../components/StatusBadge";
import { colors } from "../../constants/colors";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function VerificationQueueScreen() {
  const { currentUser } = useAuth();
  const { data, updateCredentialStatus } = useMarketplace();

  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "admin") return <Redirect href="/" />;

  const pendingCredentials = data.credentials.filter((credential) => credential.status === "pending");

  return (
    <Screen>
      <Text style={styles.title}>Verification queue</Text>
      <Text style={styles.subtitle}>Manual proof-of-concept review. Approving all required credentials makes a trainer eligible for verified shifts.</Text>

      {pendingCredentials.length === 0 ? (
        <EmptyState title="Queue clear" message="No credentials need review. Reset local demo data from the admin dashboard to replay this step." />
      ) : (
        pendingCredentials.map((credential) => {
          const trainer = data.trainers.find((item) => item.id === credential.trainerId);
          return (
            <InfoCard key={credential.id} title={trainer?.fullName ?? "Trainer"} subtitle={trainer?.bio}>
              <View style={styles.row}>
                <StatusBadge label={trainer?.verificationStatus.replace("_", " ") ?? "pending"} tone={trainer?.verificationStatus === "verified" ? "verified" : "pending"} />
                <StatusBadge label="manual review" tone="neutral" />
              </View>
              <CredentialRow credential={credential} />
              <View style={styles.actions}>
                <PrimaryButton label="Approve credential" onPress={() => updateCredentialStatus(credential.id, "verified")} />
                <PrimaryButton label="Reject credential" variant="secondary" onPress={() => updateCredentialStatus(credential.id, "rejected")} />
              </View>
            </InfoCard>
          );
        })
      )}

      <Text style={styles.sectionTitle}>Trainer overview</Text>
      {data.trainers.map((trainer) => (
        <InfoCard key={trainer.id} title={trainer.fullName} subtitle={`${trainer.location} | ${trainer.sportsCovered.join(", ")}`}>
          <View style={styles.row}>
            <StatusBadge label={trainer.verificationStatus.replace("_", " ")} tone={trainer.verificationStatus === "verified" ? "verified" : trainer.verificationStatus === "rejected" ? "warning" : "pending"} />
            <Text style={styles.note}>Rating {trainer.averageRating.toFixed(1)} | Reliability {trainer.reliabilityScore}</Text>
          </View>
        </InfoCard>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.primary, fontSize: 30, fontWeight: "900", paddingTop: 16 },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "900", marginTop: 8 },
  row: { flexDirection: "row", flexWrap: "wrap", gap: 8, alignItems: "center" },
  actions: { gap: 10 },
  note: { color: colors.muted, lineHeight: 20 }
});
