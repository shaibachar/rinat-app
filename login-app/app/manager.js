import { Box, Button, Center, FormControl, Input, ScrollView, Text, TextArea, VStack } from 'native-base';
import AppHeader from '../components/AppHeader';
import WeeklyCalendar from '../components/WeeklyCalendar';

export default function ManagerPage() {
  return (
    <Box flex={1} bg="gray.50">
      <AppHeader />

      <WeeklyCalendar markedDates={[]} />

      <ScrollView px="6" py="4">
        <Box bg="white" p="5" borderRadius="xl" shadow="3">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            יצירת אימון חדש
          </Text>

          <VStack space={4}>
            <FormControl>
              <FormControl.Label>שם האימון</FormControl.Label>
              <Input placeholder="לדוג׳: יוגה בוקר" />
            </FormControl>

            <FormControl>
              <FormControl.Label>תיאור</FormControl.Label>
              <TextArea
                h={20}
                placeholder="כתוב כאן תיאור קצר של האימון"
                totalLines={4}
                textAlignVertical="top"
              />
            </FormControl>

            <Button colorScheme="pink" mt="4">
              צור אימון
            </Button>
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  );
}
