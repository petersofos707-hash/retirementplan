import { StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";

type BadgeTone = "verified" | "pending" | "warning" | "neutral";

type StatusBadgeProps = {
  label: string;
  tone?: BadgeTone;
};

export function StatusBadge({ label, tone = "neutral" }: StatusBadgeProps) {
  return (
    <View style={[styles.badge, styles[tone]]}>
      <Text style={[styles.text, tone !== "neutral" && styles.coloredText]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  neutral: {
    backgroundColor: colors.primarySoft
  },
  verified: {
    backgroundColor: "#E7F7EC"
  },
  pending: {
    backgroundColor: "#FFF4D8"
  },
  warning: {
    backgroundColor: "#FDE8E8"
  },
  text: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: "800"
  },
  coloredText: {
    color: colors.text
  }
});
