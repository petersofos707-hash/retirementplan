import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "../constants/colors";
import { Credential } from "../types";
import { StatusBadge } from "./StatusBadge";

type CredentialRowProps = {
  credential: Credential;
  children?: ReactNode;
};

export function CredentialRow({ credential, children }: CredentialRowProps) {
  const tone = credential.status === "verified" ? "verified" : credential.status === "rejected" || credential.status === "expired" ? "warning" : "pending";
  return (
    <View style={styles.row}>
      <View style={styles.main}>
        <Text style={styles.name}>{credential.displayName}</Text>
        <Text style={styles.meta}>{credential.expiryDate ? `Expires ${credential.expiryDate}` : credential.notes ?? "Manual proof-of-concept check"}</Text>
      </View>
      <StatusBadge label={credential.status.replace("_", " ")} tone={tone} />
      {children ? <View style={styles.actions}>{children}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.surface,
    padding: 14,
    gap: 10
  },
  main: {
    gap: 4
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "900"
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 18
  },
  actions: {
    flexDirection: "row",
    gap: 10
  }
});
