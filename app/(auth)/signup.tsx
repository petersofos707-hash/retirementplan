import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { PrimaryButton } from "../../components/PrimaryButton";
import { Screen } from "../../components/Screen";
import { TextField } from "../../components/TextField";
import { colors } from "../../constants/colors";
import { useAuth } from "../../store/AuthContext";
import { UserRole } from "../../types";

export default function SignUpScreen() {
  const { signUp, dataMode, error } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("organisation");
  const [localError, setLocalError] = useState<string | null>(null);

  async function handleSubmit() {
    if (!fullName.trim() || !email.trim() || password.length < 6) {
      setLocalError("Enter a name, valid email, and password with at least 6 characters.");
      return;
    }
    setLocalError(null);
    await signUp({ fullName: fullName.trim(), email: email.trim(), password, role });
  }

  return (
    <Screen>
      <View style={styles.header}>
        <Text style={styles.eyebrow}>{dataMode === "supabase" ? "Creates Supabase user" : "Creates local demo user"}</Text>
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Stage 1 supports Organisation and Trainer sign-up. Admin access is via demo login.</Text>
      </View>
      <TextField label="Full name" value={fullName} onChangeText={setFullName} autoCapitalize="words" />
      <TextField label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextField label="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Text style={styles.label}>Role</Text>
      <View style={styles.segment}>
        <RoleOption label="Organisation" selected={role === "organisation"} onPress={() => setRole("organisation")} />
        <RoleOption label="Trainer" selected={role === "trainer"} onPress={() => setRole("trainer")} />
      </View>
      {localError || error ? <Text style={styles.error}>{localError ?? error}</Text> : null}
      <PrimaryButton label="Create account" onPress={handleSubmit} />
      <Link href="/(auth)/login" style={styles.link}>Already have an account?</Link>
    </Screen>
  );
}

function RoleOption({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.roleOption, selected && styles.roleOptionSelected]}>
      <Text style={[styles.roleText, selected && styles.roleTextSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { gap: 8, paddingTop: 16 },
  eyebrow: { color: colors.verified, fontSize: 13, fontWeight: "900", textTransform: "uppercase" },
  title: { color: colors.primary, fontSize: 30, fontWeight: "900" },
  subtitle: { color: colors.muted, fontSize: 15, lineHeight: 22 },
  label: { color: colors.text, fontSize: 14, fontWeight: "800" },
  segment: { flexDirection: "row", gap: 10 },
  roleOption: { flex: 1, minHeight: 48, alignItems: "center", justifyContent: "center", borderColor: colors.border, borderRadius: 8, borderWidth: 1, backgroundColor: colors.surface },
  roleOptionSelected: { borderColor: colors.primary, backgroundColor: colors.primarySoft },
  roleText: { color: colors.muted, fontWeight: "800" },
  roleTextSelected: { color: colors.primary },
  error: { color: colors.warning, fontWeight: "700" },
  link: { color: colors.primary, fontSize: 16, fontWeight: "800", textAlign: "center" }
});
