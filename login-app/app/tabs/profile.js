import { Box, Text, Center } from 'native-base';

export default function Profile() {
  return (
    <Center flex={1} bg="gray.50">
      <Box bg="white" p="6" borderRadius="lg" shadow="2">
        <Text fontSize="lg" fontWeight="bold">עריכת פרופיל</Text>
      </Box>
    </Center>
  );
}
