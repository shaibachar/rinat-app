import {
  Box,
  Text,
  VStack,
  HStack,
  Center,
  Pressable,
  Icon,
  Avatar,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import AppHeader from "../components/AppHeader";
import Upcoming from "./tabs/upcoming";
import Schedule from "./tabs/schedule";
import Profile from "./tabs/profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useAuthStore } from "../lib/store";
import WeeklyCalendar from "../components/WeeklyCalendar";
import dayjs from "dayjs";

const Tab = createBottomTabNavigator();

function TopCard() {
  const logout = useAuthStore((state) => state.logout);

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
        <Avatar size="md" bg="white">
          <Ionicons name="person" size={24} color="#ccc" />
        </Avatar>
        <Text color="white" fontWeight="bold" fontSize="md">
          תודה שחזרת אלינו, נטלי וייזרמן!
        </Text>
      </HStack>

      <Pressable onPress={logout}>
        <Text color="white" underline fontSize="sm">
          יציאה
        </Text>
      </Pressable>
    </Box>
  );
}

export default function CustomerHome() {
  const sessionDates = [dayjs().format("YYYY-MM-DD"), "2025-03-27"];

  return (
    <Box flex={1} bg="gray.50">
      <AppHeader />

      <Center px="4">
        <TopCard />
      </Center>

      <WeeklyCalendar markedDates={sessionDates} />

      <Box flex={1}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: { height: 60 },
            tabBarActiveTintColor: "#e91e63",
            tabBarInactiveTintColor: "gray",
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === "קרובים") iconName = "calendar";
              else if (route.name === "האימונים") iconName = "time";
              else if (route.name === "פרופיל") iconName = "person";
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: "bold",
              marginBottom: 4,
            },
            tabBarItemStyle: {
              paddingVertical: 4,
            },
          })}
        >
          <Tab.Screen name="קרובים" component={Upcoming} />
          <Tab.Screen name="האימונים" component={Schedule} />
          <Tab.Screen name="פרופיל" component={Profile} />
        </Tab.Navigator>
      </Box>
    </Box>
  );
}
