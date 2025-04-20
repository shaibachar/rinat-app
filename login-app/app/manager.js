import { Box, Button, VStack, Text } from 'native-base';
import { useRouter } from 'expo-router';

export default function ManagerPage() {
  const router = useRouter();

  return (
    <Box flex={1} bg="gray.50" justifyContent="center" alignItems="center" px="4" direction="rtl">
      <Box
        bg="white"
        borderRadius="2xl"
        shadow="3"
        width="100%"
        maxW="400"
        p="6"
        alignItems="center"
      >
        <Text fontSize="2xl" fontWeight="bold" color="#1A237E" mb="6" textAlign="center">
          ניהול המערכת
        </Text>

        <VStack space={4} width="100%">
          <Button
            colorScheme="pink"
            borderRadius="xl"
            onPress={() => router.push('/create-course')}
          >
            יצירת קורס
          </Button>

          <Button
            colorScheme="pink"
            borderRadius="xl"
            onPress={() => router.push('/update-attendance')}
          >
            עדכון נוכחות
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
