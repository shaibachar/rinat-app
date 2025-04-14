import { Box, Text, Pressable } from 'native-base';
import { useAuthStore } from '../lib/store';
import { Ionicons } from '@expo/vector-icons';

export default function AppHeader() {
  const logout = useAuthStore(state => state.logout);
  const userType = useAuthStore(state => state.userType);

  return (
    <Box
      bg={{
        linearGradient: {
          colors: ['#e1f5fe', '#b3e5fc'],
          start: [0, 0],
          end: [1, 1],
        }
      }}
      w="full"
      h="40"
      borderBottomRadius="3xl"
      justifyContent="center"
      alignItems="center"
      position="relative"
    >
      <Text fontSize="2xl" fontWeight="bold" color="#1A237E">
        מערכת הרישום לאימונים
      </Text>

      {userType && (
        <Pressable
          position="absolute"
          top="4"
          right="4"
          onPress={logout}
          _pressed={{ opacity: 0.6 }}
        >
          <Ionicons name="log-out-outline" size={24} color="#1A237E" />
        </Pressable>
      )}
    </Box>
  );
}
