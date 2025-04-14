import { Stack, Redirect } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { useAuthStore } from '../lib/store';

export default function Layout() {
  const userType = useAuthStore(state => state.userType);

  return (
    <NativeBaseProvider>
      {userType === 'manager' && <Redirect href="/manager" />}
      {userType === 'customer' && <Redirect href="/customer" />}
      <Stack />
    </NativeBaseProvider>
  );
}
