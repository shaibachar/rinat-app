import { useState } from "react";
import { Image } from "react-native";
import {
  Box,
  Button,
  Center,
  FormControl,
  Input,
  VStack,
  Text,
  WarningOutlineIcon,
  ScrollView,
} from "native-base";
import { useAuthStore } from "../lib/store";
import { loginUser } from "../lib/auth";
import AppHeader from "../components/AppHeader";
import { Ionicons } from "@expo/vector-icons";
// (make sure this is already in your imports)

export default function LoginScreen() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUserType = useAuthStore((state) => state.setUserType);
  const setCurrentUser = useAuthStore(state => state.setCurrentUser);
  const [showPassword, setShowPassword] = useState(false); // add this state

  const handleLogin = async () => {
    try {
      const res = await loginUser(id, password);
      setUserType(res.userType);
      setCurrentUser(res.user);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <ScrollView flex={1} bg="#f5f5f5">
      <Center px="4" pt="12" pb="4">
        <AppHeader />

        <Box
          mt="-16"
          w="100%"
          maxW="380"
          borderRadius="2xl"
          shadow="4"
          overflow="hidden"
          bg="white"
        >
          {/* Logo Section */}
          <Box
            height={180}
            justifyContent="center"
            alignItems="center"
            bg="gray.100"
            p="4"
          >
            <Image
              source={require("../assets/logo.png")}
              style={{ width: "80%", height: "100%", resizeMode: "contain" }}
            />
          </Box>

          {/* Scrollable Form Section */}
          <ScrollView>
            <Box p="6">
              <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="4">
                התחברות
              </Text>

              <VStack space={4}>
                <FormControl isInvalid={!!error}>
                  <FormControl.Label>שם משתמש</FormControl.Label>
                  <Input
                    value={id}
                    onChangeText={setId}
                    placeholder="הכנס מזהה"
                    placeholderTextColor="#999"
                  />
                </FormControl>

                <FormControl isInvalid={!!error}>
                  <FormControl.Label>סיסמה</FormControl.Label>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="הכנס סיסמה"
                    placeholderTextColor="#999"
                    InputRightElement={
                      <Button
                        variant="unstyled"
                        onPress={() => setShowPassword(!showPassword)}
                        _pressed={{ opacity: 0.5 }}
                        px="3"
                      >
                        <Ionicons
                          name={showPassword ? "eye-off" : "eye"}
                          size={20}
                          color="#666"
                        />
                      </Button>
                    }
                  />
                  {!!error && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {error}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>

                <Button
                  mt="2"
                  colorScheme="pink"
                  onPress={handleLogin}
                  borderRadius="lg"
                >
                  התחבר
                </Button>
              </VStack>
            </Box>
          </ScrollView>
        </Box>

        <Text fontSize="xs" mt="10" color="gray.500">
          timetable.nicestudio.co.il - פרטיות
        </Text>
      </Center>
    </ScrollView>
  );
}
