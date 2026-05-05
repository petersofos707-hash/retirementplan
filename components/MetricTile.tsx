import { StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";

type MetricTileProps = {
  label: string;
  value: string;
  detail?: string;
};

export function MetricTile({ label, value, detail }: MetricTileProps) {
  return (
    <View style={styles.tile}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {detail ? <Text style={styles.detail}>{detail}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    minWidth: 140,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 4
  },
  value: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "900"
  },
  label: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800"
  },
  detail: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17
  }
});
