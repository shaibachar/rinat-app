import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  ScrollView,
  Text,
  TextArea,
  VStack,
  HStack,
} from "native-base";
import AppHeader from "../components/AppHeader";
import WeeklyCalendar from "../components/WeeklyCalendar";
import { useState } from "react";
import {
  addSession,
  deleteSession,
  getSessions,
  updateSession,
} from "../lib/sessionService";
import dayjs from "dayjs";
import RNPickerSelect from "react-native-picker-select";

export default function CourseCreationPage() {
  const [sessions, setSessions] = useState(getSessions());
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    fromTime: "",
    toTime: "",
    sessionType: "",
    trainerName: "",
    roomName: "",
    day: "",
    numberOfTimes: "",
    endDate: "",
    maxCustomers: "",
    gender: "",
  });
  const [editId, setEditId] = useState(null);

  const handleSubmit = () => {
    if (editId) {
      updateSession(editId, form);
    } else {
      addSession(form);
    }
    setSessions(getSessions());
    setForm({
      title: "",
      description: "",
      date: "",
      fromTime: "",
      toTime: "",
      sessionType: "",
      trainerName: "",
      roomName: "",
      day: "",
      numberOfTimes: "",
      endDate: "",
      maxCustomers: "",
      gender: "",
    });
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

      <ScrollView px="6" py="4" > 
        <Box bg="white" p="5" borderRadius="xl" shadow="3">
          <WeeklyCalendar markedDates={sessions.map((s) => s.date)} />
        </Box>

        <Box bg="white" p="5" borderRadius="xl" shadow="3" mt="6">
          <Text fontSize="lg" fontWeight="bold" mb="4" textAlign="center">
            {editId ? "עריכת אימון" : "יצירת אימון חדש"}
          </Text>

          <VStack space={4}>
            <FormControl>
              <FormControl.Label>שם האימון</FormControl.Label>
              <Input
                value={form.title}
                onChangeText={(val) => setForm({ ...form, title: val })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>תיאור</FormControl.Label>
              <TextArea
                value={form.description}
                onChangeText={(val) => setForm({ ...form, description: val })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>סוג שיעור</FormControl.Label>
              <RNPickerSelect
                onValueChange={(val) => setForm({ ...form, sessionType: val })}
                value={form.sessionType}
                items={[
                  { label: "פלטיס", value: "פלטיס" },
                  { label: "פלטיס מכשירים", value: "פלטיס מכשירים" },
                ]}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>משעה</FormControl.Label>
              <Input
                placeholder="08:00"
                value={form.fromTime}
                onChangeText={(val) => setForm({ ...form, fromTime: val })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>עד שעה</FormControl.Label>
              <Input
                placeholder="09:00"
                value={form.toTime}
                onChangeText={(val) => setForm({ ...form, toTime: val })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>שם מדריך</FormControl.Label>
              <Input
                value={form.trainerName}
                onChangeText={(val) => setForm({ ...form, trainerName: val })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>חדר</FormControl.Label>
              <RNPickerSelect
                onValueChange={(val) => setForm({ ...form, roomName: val })}
                value={form.roomName}
                items={[
                  { label: "נרקיס", value: "נרקיס" },
                  { label: "ירושליים", value: "ירושליים" },
                  { label: "הדס", value: "הדס" },
                  { label: "ערבה", value: "ערבה" },
                ]}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>יום</FormControl.Label>
              <RNPickerSelect
                onValueChange={(val) => setForm({ ...form, day: val })}
                value={form.day}
                items={[
                  { label: "ראשון", value: "ראשון" },
                  { label: "שני", value: "שני" },
                  { label: "שלישי", value: "שלישי" },
                  { label: "רביעי", value: "רביעי" },
                  { label: "חמישי", value: "חמישי" },
                  { label: "שישי", value: "שישי" },
                ]}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>מספר פעמים</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={form.numberOfTimes}
                onChangeText={(val) => setForm({ ...form, numberOfTimes: val })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>תאריך סיום</FormControl.Label>
              <Input
                placeholder="YYYY-MM-DD"
                value={form.endDate}
                onChangeText={(val) => setForm({ ...form, endDate: val })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>מקסימום משתתפים</FormControl.Label>
              <Input
                keyboardType="numeric"
                value={form.maxCustomers}
                onChangeText={(val) => setForm({ ...form, maxCustomers: val })}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>מין</FormControl.Label>
              <RNPickerSelect
                onValueChange={(val) => setForm({ ...form, gender: val })}
                value={form.gender}
                items={[
                  { label: "נקבה", value: "female" },
                  { label: "זכר", value: "male" },
                  { label: "נקבה+זכר", value: "female+male" },
                ]}
              />
            </FormControl>

            <FormControl>
              <FormControl.Label>תאריך</FormControl.Label>
              <Input
                placeholder="YYYY-MM-DD"
                value={form.date}
                onChangeText={(val) => setForm({ ...form, date: val })}
              />
            </FormControl>

            <Button colorScheme="pink" mt="4" onPress={handleSubmit}>
              {editId ? "עדכן אימון" : "צור אימון"}
            </Button>
          </VStack>
        </Box>

        <Text mt="6" mb="2" fontSize="md" fontWeight="bold">
          האימונים הקרובים:
        </Text>
        <VStack space={3}>
          {sessions.map((s) => (
            <Box key={s.id} bg="white" p="4" borderRadius="lg" shadow="2">
              <Text bold fontSize="md">
                {s.sessionType}
              </Text>
              <Text color="gray.600" mb="1">
                {s.description}
              </Text>

              <Text>
                🗓️ תאריך: {s.date} ({s.day})
              </Text>
              <Text>
                ⏰ שעות: {s.fromTime} - {s.toTime}
              </Text>
              <Text>🏋️ סוג שיעור: {s.sessionType}</Text>
              <Text>👤 מדריך: {s.trainerName}</Text>
              <Text>🏠 חדר: {s.roomName}</Text>
              <Text>⚥ מין: {s.gender}</Text>

              <HStack space={2} mt="3">
                <Button
                  size="sm"
                  variant="outline"
                  onPress={() => handleEdit(s)}
                >
                  ערוך
                </Button>
                <Button
                  size="sm"
                  colorScheme="danger"
                  onPress={() => handleDelete(s.id)}
                >
                  מחק
                </Button>
              </HStack>
            </Box>
          ))}
        </VStack>
      </ScrollView>
    </Box>
  );
}
