import { router, Redirect } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { CredentialRow } from "../../components/CredentialRow";
import { MetricTile } from "../../components/MetricTile";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { StatusBadge } from "../../components/StatusBadge";
import { colors } from "../../constants/colors";
import { useAuth } from "../../store/AuthContext";
import { useMarketplace } from "../../store/MarketplaceContext";

export default function TrainerHome() {
  const { currentUser, dataMode, signOut } = useAuth();
  const { data } = useMarketplace();

  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role !== "trainer") return <Redirect href="/" />;

  const trainer = data.trainers.find((item) => item.userId === currentUser.id) ?? data.trainers[0];
  const credentials = data.credentials.filter((credential) => credential.trainerId === trainer.id);
  const applications = data.applications.filter((application) => application.trainerId === trainer.id);
  const bookings = data.bookings.filter((booking) => booking.trainerId === trainer.id && booking.status === "upcoming");

  return (
    <Screen>
      <View style={styles.header}>
        <StatusBadge label={dataMode === "supabase" ? "Supabase mode" : "Local demo mode"} />
        <Text style={styles.title}>{trainer.fullName}</Text>
        <Text style={styles.subtitle}>{trainer.bio}</Text>
      </View>

      <View style={styles.metrics}>
        <MetricTile label="Rating" value={trainer.averageRating.toFixed(1)} />
        <MetricTile label="Reliability" value={`${trainer.reliabilityScore}`} />
        <MetricTile label="Applications" value={String(applications.length)} detail={`${bookings.length} upcoming booking`} />
      </View>

      <View style={styles.actions}>
        <PrimaryButton label="Browse shifts" onPress={() => router.push("/(trainer)/browse")} />
        <PrimaryButton label="Applications & bookings" variant="secondary" onPress={() => router.push("/(trainer)/applications")} />
        <PrimaryButton label="Profile & credentials" variant="secondary" onPress={() => router.push("/(trainer)/profile")} />
      </View>

      <Text style={styles.sectionTitle}>Credentials</Text>
      {credentials.map((credential) => <CredentialRow key={credential.id} credential={credential} />)}
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
