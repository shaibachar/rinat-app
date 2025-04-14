import {
    Box, Text, VStack, HStack, Button, Pressable, InfoOutlineIcon, ScrollView
  } from 'native-base';
  import { formatHebrewDate } from '../../lib/formatDate';
  import { useAuthStore } from '../../lib/store';
  import dayjs from 'dayjs';
  
  export default function Upcoming() {
    const selectedDate = useAuthStore(state => state.selectedDate);
  
    const allSessions = [
      {
        id: 1,
        title: 'פילאטיס יוגה',
        date: dayjs().format('YYYY-MM-DD'), // today
        time: '18:00–19:00',
      },
      {
        id: 2,
        title: 'פילאטיס יוגה',
        date: '2025-03-27',
        time: '18:00–19:00',
      },
    ];
  
    const filtered = allSessions.filter(session => session.date === selectedDate);
  
    return (
      <Box flex={1} bg="gray.50" p="4">
        <Text fontSize="lg" fontWeight="bold" mb="4">
          אימונים הקרובים {filtered.length}
        </Text>
  
        <ScrollView>
          <VStack space={4} pb="8">
            {filtered.map(session => (
              <Box key={session.id} bg="white" p="4" borderRadius="lg" shadow="2">
                <Text>
                  <Text bold>{session.title}:</Text> {formatHebrewDate(session.date)} משעה {session.time}
                </Text>
  
                <Pressable mt="2">
                  <HStack alignItems="center" space={1}>
                    <InfoOutlineIcon size="xs" />
                    <Text color="blue.500">מידע נוסף</Text>
                  </HStack>
                </Pressable>
  
                <Button mt="2" colorScheme="gray" variant="outline" isDisabled>
                  ביטול הרשמה
                </Button>
              </Box>
            ))}
          </VStack>
        </ScrollView>
      </Box>
    );
  }
  