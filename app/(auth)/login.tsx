import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { TextField } from "../../components/TextField";
import { colors } from "../../constants/colors";
import { useAuth } from "../../store/AuthContext";

export default function LoginScreen() {
  const { signIn, demoLogin, dataMode, error } = useAuth();
  const [email, setEmail] = useState("org@example.com");
  const [password, setPassword] = useState("password123");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    setSubmitting(true);
    await signIn(email.trim(), password);
    setSubmitting(false);
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{dataMode === "supabase" ? "Supabase auth" : "Local demo auth"}</Text>
        <Text style={styles.title}>Log in</Text>
        <Text style={styles.subtitle}>Use a demo account or your Supabase email/password account.</Text>
      </View>
      <TextField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <PrimaryButton label={submitting ? "Signing in..." : "Log in"} disabled={submitting} onPress={handleSubmit} />
      <View style={styles.demoButtons}>
        <PrimaryButton label="Demo Organisation" variant="secondary" onPress={() => demoLogin("organisation")} />
        <PrimaryButton label="Demo Trainer" variant="secondary" onPress={() => demoLogin("trainer")} />
        <PrimaryButton label="Demo Admin" variant="secondary" onPress={() => demoLogin("admin")} />
      </View>
      <Link href="/(auth)/signup" style={styles.link}>Create an account</Link>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { gap: 8, paddingTop: 16 },
  eyebrow: { color: colors.verified, fontSize: 13, fontWeight: "900", textTransform: "uppercase" },
  title: { color: colors.primary, fontSize: 30, fontWeight: "900" },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  demoButtons: { gap: 10 },
  error: { color: colors.warning, fontWeight: "700" },
  link: { color: colors.primary, fontSize: 16, fontWeight: "800", textAlign: "center" }
});
