import { Pressable, StyleSheet, Text } from "react-native";

import { colors } from "../constants/colors";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "plain";
  disabled?: boolean;
};

export function PrimaryButton({ label, onPress, variant = "primary", disabled }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [styles.base, styles[variant], disabled && styles.disabled, pressed && !disabled && styles.pressed]}
    >
      <Text style={[styles.label, variant !== "primary" && styles.secondaryLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: { minHeight: 48, alignItems: "center", justifyContent: "center", borderRadius: 8, paddingHorizontal: 16, paddingVertical: 12 },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.primarySoft, borderColor: colors.border, borderWidth: 1 },
  plain: { backgroundColor: "transparent" },
  label: { color: colors.surface, fontSize: 16, fontWeight: "700" },
  secondaryLabel: { color: colors.primary },
  disabled: { opacity: 0.55 },
  pressed: { opacity: 0.85 }
});
