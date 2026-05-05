import { Redirect } from "expo-router";
import { StyleSheet, Text } from "react-native";

import { CredentialRow } from "../../components/CredentialRow";
import { InfoCard } from "../../components/InfoCard";
import { Screen } from "../../components/Screen";
import { StatusBadge } from "../../components/StatusBadge";
import { colors } from "../../constants/colors";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function TrainerProfileScreen() {
  const { currentUser } = useAuth();
  const { data } = useMarketplace();
  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "trainer") return <Redirect href="/" />;

  const trainer = data.trainers.find((item) => item.userId === currentUser.id) ?? data.trainers[0];
  const credentials = data.credentials.filter((credential) => credential.trainerId === trainer.id);

  return (
    <Screen>
      <Text style={styles.title}>Profile & credentials</Text>
      <InfoCard title={trainer.fullName} subtitle={`${trainer.location} | ${trainer.sportsCovered.join(", ")}`}>
        <StatusBadge label={trainer.verificationStatus.replace("_", " ")} tone={trainer.verificationStatus === "verified" ? "verified" : "pending"} />
        <Text style={styles.note}>Rating {trainer.averageRating.toFixed(1)} | Reliability {trainer.reliabilityScore} | Completed shifts {trainer.completedShifts}</Text>
      </InfoCard>
      {credentials.map((credential) => <CredentialRow key={credential.id} credential={credential} />)}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { color: colors.primary, fontSize: 30, fontWeight: "900", paddingTop: 16 },
  note: { color: colors.muted, lineHeight: 20 }
});
