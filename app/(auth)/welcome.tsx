import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { InfoCard } from "../../components/InfoCard";
import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { StatusBadge } from "../../components/StatusBadge";
import { colors } from "../../constants/colors";
import { useAuth } from "../../store/AuthContext";

export default function WelcomeScreen() {
  const { dataMode, demoLogin, error } = useAuth();

  return (
    <Screen>
      <View style={styles.hero}>
        <StatusBadge label={dataMode === "supabase" ? "Supabase mode" : "Local demo mode"} />
        <Text style={styles.title}>Verified sports staffing, on demand.</Text>
        <Text style={styles.subtitle}>A proof of concept for sporting organisations to find verified trainers, and for trainers to find flexible paid work.</Text>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View style={styles.actions}>
        <PrimaryButton label="Log in" onPress={() => router.push("/(auth)/login")} />
        <PrimaryButton label="Create account" variant="secondary" onPress={() => router.push("/(auth)/signup")} />
      </View>
      <InfoCard title="Quick demo pathways" subtitle="Use these to enter the role-specific app shell immediately.">
        <View style={styles.demoButtons}>
          <PrimaryButton label="Demo Organisation" variant="secondary" onPress={() => demoLogin("organisation")} />
          <PrimaryButton label="Demo Trainer" variant="secondary" onPress={() => demoLogin("trainer")} />
          <PrimaryButton label="Demo Admin" variant="secondary" onPress={() => demoLogin("admin")} />
        </View>
      </InfoCard>
      <InfoCard title="Stage 1 focus" subtitle="Authentication, role routing, Supabase setup, local fallback mode, and seeded marketplace data." />
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { gap: 12, paddingTop: 24 },
  title: { color: colors.primary, fontSize: 34, fontWeight: "900", lineHeight: 40 },
  subtitle: { color: colors.muted, fontSize: 16, lineHeight: 23 },
  actions: { gap: 10 },
  demoButtons: { gap: 10, marginTop: 4 },
  error: { color: colors.warning, fontWeight: "700" }
});
