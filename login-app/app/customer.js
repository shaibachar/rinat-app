import { Box, Text, VStack, HStack, Button, ScrollView, Pressable, Avatar, Center, useToast, Input } from 'native-base';
import AppHeader from '../components/AppHeader';
import WeeklyCalendar from '../components/WeeklyCalendar';
import { useAuthStore } from '../lib/store';
import { getSessions } from '../lib/sessionService';
import { signUpCustomerToSession, getCustomerById } from '../lib/customerService';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

function TopCard() {
  const logout = useAuthStore(state => state.logout);
  const user = useAuthStore(state => state.currentUser);

  return (
    <Box
      bg="pink.600"
      w="100%"
      px="4"
      py="5"
      borderRadius="xl"
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      mt="-16"
      mb="2"
      shadow="3"
    >
      <HStack alignItems="center" space="3">
        <Avatar size="md" bg="white" />
        <Text color="white" fontWeight="bold" fontSize="md">
          תודה שחזרת אלינו, {user?.name || '...'}!
        </Text>
      </HStack>
      <Pressable onPress={logout}>
        <Text color="white" underline fontSize="sm">יציאה</Text>
      </Pressable>
    </Box>
  );
}

export default function CustomerPage() {
  const user = useAuthStore(state => state.currentUser);
  const selectedDate = useAuthStore(state => state.selectedDate);
  const [customer, setCustomer] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [search, setSearch] = useState('');
  const toast = useToast();

  useEffect(() => {
    const customerObj = getCustomerById(user?.id);
    setCustomer(customerObj);
    setSessions(getSessions());
  }, [user]);

  const handleSignUp = (sessionId) => {
    if (!user || !user.id) {
      toast.show({
        title: 'שגיאה: אין מידע על המשתמש',
        status: 'error',
        duration: 1500
      });
      return;
    }

    signUpCustomerToSession(user.id, sessionId);
    const updated = getCustomerById(user.id);
    setCustomer(updated);

    toast.show({
      title: "נרשמת בהצלחה!",
      placement: "top",
      duration: 1500,
      status: "success"
    });
  };

  const handleCancel = (sessionId) => {
    const updated = { ...customer };
    updated.signedSessions = updated.signedSessions.filter(id => id !== sessionId);
    setCustomer(updated);

    toast.show({
      title: "הרשמתך בוטלה",
      status: "warning",
      duration: 1500,
      placement: "top"
    });
  };

  const filtered = sessions.filter(s => s.date === selectedDate);
  const notSignedSessions = sessions.filter(
    s =>
      !customer?.signedSessions.includes(s.id) &&
      s.title.toLowerCase().includes(search.toLowerCase())
  );

  if (!user || !customer) {
    return (
      <Center flex={1}>
        <Text>טוען נתוני משתמש...</Text>
      </Center>
    );
  }
  
  return (
    <Box flex={1} bg="gray.50">
      <AppHeader />
      
      <Text>סה"כ אימונים נטענו: {sessions.length}</Text>

      <WeeklyCalendar markedDates={sessions.map(s => s.date)} />

      <Center px="4">
        <TopCard />
      </Center>

      <ScrollView px="4" py="2">
        {/* Section: Selected Date */}
        <Text fontSize="md" fontWeight="bold" mb="2">
          אימונים בתאריך {selectedDate}:
        </Text>

        {filtered.length === 0 ? (
          <Text color="gray.500" mb="4">
            אין אימונים בתאריך זה. בדוק תאריכים אחרים בלוח למעלה.
          </Text>
        ) : (
          <VStack space={4} mb="8">
            {filtered.map(s => {
              const isSigned = customer?.signedSessions.includes(s.id);
              return (
                <Box key={s.id} bg="white" p="4" borderRadius="lg" shadow="2">
                  <Text bold>{s.title}</Text>
                  <Text>{dayjs(s.date).format('DD/MM/YYYY')} משעה {s.time}</Text>
                  <Text color="gray.500" mb="2">{s.description}</Text>
                  <Button
                    size="sm"
                    colorScheme={isSigned ? 'danger' : 'pink'}
                    variant="solid"
                    onPress={() =>
                      isSigned
                        ? handleCancel(s.id)
                        : handleSignUp(s.id)
                    }
                  >
                    {isSigned ? 'ביטול הרשמה' : 'הרשמה'}
                  </Button>
                </Box>
              );
            })}
          </VStack>
        )}

        {/* Section: Search + Future Sessions */}
        <Text fontSize="md" fontWeight="bold" mt="6" mb="2">חפש אימון:</Text>
        <Input
          placeholder="לדוג׳ פילאטיס"
          value={search}
          onChangeText={setSearch}
          mb="4"
        />

        <Text fontSize="md" fontWeight="bold" mb="2">
          אימונים זמינים להרשמה:
        </Text>

        {notSignedSessions.length === 0 ? (
          <Text color="gray.500" mb="10">לא נמצאו אימונים חדשים לפי החיפוש.</Text>
        ) : (
          <VStack space={4} pb="10">
            {notSignedSessions.map(s => (
              <Box key={s.id} bg="white" p="4" borderRadius="lg" shadow="2">
                <Text bold>{s.title}</Text>
                <Text>{dayjs(s.date).format('DD/MM/YYYY')} משעה {s.time}</Text>
                <Text color="gray.500" mb="2">{s.description}</Text>
                <Button
                  size="sm"
                  colorScheme="pink"
                  onPress={() => handleSignUp(s.id)}
                >
                  הרשמה
                </Button>
              </Box>
            ))}
          </VStack>
        )}
      </ScrollView>
    </Box>
  );
}
