import { StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <View style={styles.empty}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    borderColor: colors.border,
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 1,
    backgroundColor: colors.surface,
    padding: 18,
    gap: 6
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  message: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20
  }
});
