import { Box, Button, VStack, Text } from 'native-base';
import { useRouter } from 'expo-router';

export default function ManagerPage() {
  const router = useRouter();

  return (
    <Box flex={1} bg="gray.50" p="6" justifyContent="center">
      <VStack space={4} alignItems="center">
        <Text fontSize="xl" fontWeight="bold" mb="4">ניהול מערכת</Text>
        <Button onPress={() => router.push('/create-course')}>יצירת קורס</Button>
        <Button onPress={() => router.push('/update-attendance')}>עדכון נוכחות</Button>
      </VStack>
    </Box>
  );
}
