import { StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";
import { formatCurrency } from "../lib/calculations";

type FeeBreakdownProps = {
  trainerPay: number;
  platformFeeAmount: number;
  organisationTotal: number;
};

export function FeeBreakdown({ trainerPay, platformFeeAmount, organisationTotal }: FeeBreakdownProps) {
  return (
    <View style={styles.box}>
      <Row label="Trainer pay protected" value={formatCurrency(trainerPay)} />
      <Row label="15% platform fee" value={formatCurrency(platformFeeAmount)} />
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Organisation total</Text>
        <Text style={styles.totalValue}>{formatCurrency(organisationTotal)}</Text>
      </View>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
    padding: 12,
    gap: 8
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  label: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  value: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900"
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopColor: colors.border,
    borderTopWidth: 1,
    gap: 12,
    paddingTop: 8
  },
  totalLabel: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900"
  },
  totalValue: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "900"
  }
});
