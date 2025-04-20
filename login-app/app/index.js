import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  Text,
  WarningOutlineIcon,
  ScrollView,
  KeyboardAvoidingView,
} from "native-base";
import { Image, Platform } from "react-native";
import { useAuthStore } from "../lib/store";
import { loginUser } from "../lib/auth";
import AppHeader from "../components/AppHeader";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const setUserType = useAuthStore((state) => state.setUserType);
  const setCurrentUser = useAuthStore((state) => state.setCurrentUser);
  const [showPassword, setShowPassword] = useState(false);

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
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <Box flex={1} bg="#f5f5f5">
        <AppHeader />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1, alignItems: "center", paddingTop: 24 }}
          keyboardShouldPersistTaps="handled"
        >
          <Box
            w="100%"
            maxW="380"
            borderRadius="2xl"
            shadow="4"
            overflow="hidden"
            bg="white"
          >
            {/* Logo */}
            <Box height={180} justifyContent="center" alignItems="center" bg="gray.100" p="4">
              <Image
                source={require("../assets/logo.png")}
                style={{ width: "80%", height: "100%", resizeMode: "contain" }}
              />
            </Box>

            {/* Form */}
            <Box p="6" direction="rtl">
              <Text fontSize="xl" fontWeight="bold" textAlign="center" mb="4">
                התחברות
              </Text>

              <VStack space={4}>
                <FormControl isInvalid={!!error}>
                  <FormControl.Label _text={{ textAlign: "right" }}>
                    תעודת זהות
                  </FormControl.Label>
                  <Input
                    textAlign="right"
                    textContentDirection="rtl"
                    value={id}
                    onChangeText={setId}
                    placeholder="הכנס מזהה"
                    placeholderTextColor="#999"
                  />
                </FormControl>

                <FormControl isInvalid={!!error}>
                  <FormControl.Label _text={{ textAlign: "right" }}>
                    סיסמה
                  </FormControl.Label>
                  <Input
                    textAlign="right"
                    textContentDirection="rtl"
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
          </Box>

          <Text textAlign="right" fontSize="xs" mt="10" color="gray.500">
            timetable.nicestudio.co.il - פרטיות
          </Text>
        </ScrollView>
      </Box>
    </KeyboardAvoidingView>
  );
}
