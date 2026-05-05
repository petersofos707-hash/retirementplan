import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { AuthProvider } from "../store/AuthContext";
import { MarketplaceProvider } from "../store/MarketplaceContext";

export default function RootLayout() {
  return (
    <MarketplaceProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        <Stack screenOptions={{ headerShown: false }} />
      </AuthProvider>
    </MarketplaceProvider>
  );
}
