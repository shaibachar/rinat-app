import { Stack } from 'expo-router';
import { NativeBaseProvider } from 'native-base';
import { useAuthStore } from '../lib/store';
import { Redirect } from 'expo-router';

export default function Layout() {
  const userType = useAuthStore(state => state.userType);

  if (userType === 'manager') return <Redirect href="/manager" />;
  if (userType === 'customer') return <Redirect href="/customer" />;

  return (
    <NativeBaseProvider>
      <Stack />
    </NativeBaseProvider>
  );
}
