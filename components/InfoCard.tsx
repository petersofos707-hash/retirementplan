import { PropsWithChildren } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";

type InfoCardProps = PropsWithChildren<{ title: string; subtitle?: string }>;

export function InfoCard({ title, subtitle, children }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { gap: 8, borderColor: colors.border, borderRadius: 8, borderWidth: 1, backgroundColor: colors.surface, padding: 16 },
  title: { color: colors.text, fontSize: 17, fontWeight: "800" },
  subtitle: { color: colors.muted, fontSize: 14, lineHeight: 20 }
});
