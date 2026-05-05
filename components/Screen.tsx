import { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import { colors } from "../constants/colors";

type ScreenProps = PropsWithChildren<{ scroll?: boolean }>;

export function Screen({ children, scroll = true }: ScreenProps) {
  if (!scroll) return <View style={styles.container}>{children}</View>;
  return (
    <ScrollView contentContainerStyle={styles.content} style={styles.scroll}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  content: { flexGrow: 1, padding: 20, gap: 16 }
});
