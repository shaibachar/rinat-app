import { Stack, Redirect } from "expo-router";
import { NativeBaseProvider } from "native-base";
import { useAuthStore } from "../lib/store";
import { I18nManager } from "react-native";
import { useEffect } from "react";

export default function Layout() {
  const userType = useAuthStore((state) => state.userType);
  useEffect(() => {
    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);
      // You may need to reload or restart the app
    }
  }, []);

  return (
    <NativeBaseProvider>
      {userType === "manager" && <Redirect href="/manager" />}
      {userType === "customer" && <Redirect href="/customer" />}
      <Stack />
    </NativeBaseProvider>
  );
}
