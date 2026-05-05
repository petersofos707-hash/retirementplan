import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";
import { formatCurrency } from "../lib/calculations";
import { Shift } from "../types";
import { StatusBadge } from "./StatusBadge";

type ShiftCardProps = {
  shift: Shift;
  organisationName?: string;
  children?: ReactNode;
};

export function ShiftCard({ shift, organisationName, children }: ShiftCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{shift.title}</Text>
          <Text style={styles.meta}>{organisationName ? `${organisationName} | ` : ""}{shift.sport}</Text>
        </View>
        <StatusBadge label={shift.status.replace("_", " ")} tone={shift.status === "completed" ? "verified" : shift.status === "cancelled" ? "warning" : "neutral"} />
      </View>
      <View style={styles.details}>
        <Text style={styles.detail}>{shift.date}, {shift.startTime} - {shift.endTime}</Text>
        <Text style={styles.detail}>{shift.location}</Text>
        <Text style={styles.pay}>{formatCurrency(shift.trainerPay)} trainer pay</Text>
      </View>
      <Text style={styles.requirement}>{shift.requiredQualification}</Text>
      {children ? <View style={styles.children}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.surface,
    padding: 16,
    gap: 12
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12
  },
  titleBlock: {
    flex: 1,
    gap: 4
  },
  title: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  details: {
    gap: 4
  },
  detail: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 19
  },
  pay: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900"
  },
  requirement: {
    color: colors.text,
    fontSize: 13,
    lineHeight: 18
  },
  children: {
    gap: 10
  }
});
