import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { colors } from "../constants/colors";
import { useAuth } from "../store/AuthContext";

export default function IndexRoute() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  if (!currentUser) return <Redirect href="/(auth)/welcome" />;
  if (currentUser.role === "organisation") return <Redirect href="/(organisation)" />;
  if (currentUser.role === "trainer") return <Redirect href="/(trainer)" />;
  return <Redirect href="/(admin)" />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background
  }
});
