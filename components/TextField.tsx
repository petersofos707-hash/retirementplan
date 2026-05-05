import { Text, TextInput, TextInputProps, StyleSheet, View } from "react-native";

import { colors } from "../constants/colors";

type TextFieldProps = TextInputProps & { label: string };

export function TextField({ label, ...props }: TextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TextInput autoCapitalize="none" placeholderTextColor={colors.muted} style={styles.input} {...props} />
    </View>
  );
}

const styles = StyleSheet.create({
  field: { gap: 6 },
  label: { color: colors.text, fontSize: 14, fontWeight: "700" },
  input: {
    minHeight: 48,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: 14
  }
});
