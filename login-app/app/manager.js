import { Box, Button, Center, FormControl, Input, ScrollView, Text, TextArea, VStack, HStack } from 'native-base';
import AppHeader from '../components/AppHeader';
import WeeklyCalendar from '../components/WeeklyCalendar';
import { useState } from 'react';
import { addSession, deleteSession, getSessions, updateSession } from '../lib/sessionService';
import dayjs from 'dayjs';

export default function ManagerPage() {
  const [sessions, setSessions] = useState(getSessions());
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '' });
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (editId) {
      updateSession(editId, form);
    } else {
      addSession(form);
    }
    setSessions(getSessions());
    setForm({ title: '', description: '', date: '', time: '' });
    setEditId(null);
  };

  const handleEdit = (session) => {
    setForm({ ...session });
    setEditId(session.id);
  };

  const handleDelete = (id) => {
    deleteSession(id);
    setSessions(getSessions());
  };

  return (
    <Box flex={1} bg="gray.50">
      <AppHeader />
      <WeeklyCalendar markedDates={sessions.map(s => s.date)} />

      <ScrollView px="6" py="4">
        <Box bg="white" p="5" borderRadius="xl" shadow="3">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            {editId ? 'עריכת אימון' : 'יצירת אימון חדש'}
          </Text>

          <VStack space={4}>
            <FormControl>
              <FormControl.Label>שם האימון</FormControl.Label>
              <Input value={form.title} onChangeText={(val) => setForm({ ...form, title: val })} />
            </FormControl>
            <FormControl>
              <FormControl.Label>תיאור</FormControl.Label>
              <TextArea value={form.description} onChangeText={(val) => setForm({ ...form, description: val })} />
            </FormControl>
            <FormControl>
              <FormControl.Label>תאריך (YYYY-MM-DD)</FormControl.Label>
              <Input value={form.date} onChangeText={(val) => setForm({ ...form, date: val })} />
            </FormControl>
            <FormControl>
              <FormControl.Label>שעה (10:00–11:00)</FormControl.Label>
              <Input value={form.time} onChangeText={(val) => setForm({ ...form, time: val })} />
            </FormControl>

            <Button colorScheme="pink" mt="4" onPress={handleSubmit}>
              {editId ? 'עדכן אימון' : 'צור אימון'}
            </Button>
          </VStack>
        </Box>

        <Text mt="6" mb="2" fontSize="md" fontWeight="bold">האימונים הקרובים:</Text>
        <VStack space={3}>
          {sessions.map((s) => (
            <Box key={s.id} bg="white" p="4" borderRadius="lg" shadow="2">
              <Text bold>{s.title}</Text>
              <Text>{s.date} משעה {s.time}</Text>
              <Text color="gray.500" mb="2">{s.description}</Text>
              <HStack space={2}>
                <Button size="sm" variant="outline" onPress={() => handleEdit(s)}>ערוך</Button>
                <Button size="sm" colorScheme="danger" onPress={() => handleDelete(s.id)}>מחק</Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}
