import { Box, HStack, Pressable, Text } from 'native-base';
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import { useAuthStore } from '../lib/store';

dayjs.extend(weekday);
dayjs.extend(isToday);

export default function WeeklyCalendar({ markedDates }) {
  const selectedDate = useAuthStore(state => state.selectedDate);
  const setSelectedDate = useAuthStore(state => state.setSelectedDate);

  const startOfWeek = dayjs().weekday(0);

  return (
    <Box bg="white" p="3" mt="-4" borderBottomRadius="xl" shadow="2">
      <HStack justifyContent="space-between">
        {Array.from({ length: 7 }).map((_, i) => {
          const date = startOfWeek.add(i, 'day');
          const dateStr = date.format('YYYY-MM-DD');
          const isSelected = selectedDate === dateStr;
          const hasSession = markedDates?.includes(dateStr);
          return (
            <Pressable
              key={dateStr}
              onPress={() => setSelectedDate(dateStr)}
              alignItems="center"
              flex={1}
            >
              <Text fontSize="xs" color="gray.500">
                {date.format('dd')}
              </Text>
              <Box
                w="8"
                h="8"
                borderRadius="full"
                bg={isSelected ? 'pink.500' : hasSession ? 'gray.200' : 'transparent'}
                justifyContent="center"
                alignItems="center"
              >
                <Text color={isSelected ? 'white' : 'black'} fontWeight="bold">
                  {date.format('D')}
                </Text>
              </Box>
            </Pressable>
          );
        })}
      </HStack>
    </Box>
  );
}
