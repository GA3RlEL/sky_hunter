import React, { useState } from "react";
import ThemedSafeAreaView from "../../components/themed/ThemedSafeAreaView";
import {
  View,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import ThemedText from "../../components/themed/ThemedText";
import { Colors } from "../../constant/Colors";
import { Ionicons } from "@expo/vector-icons";
import { authIcons } from "../../constant/Icons";
import { useAuth } from "../../hooks/useAuth";

const Auth = () => {
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  const { login, error } = useAuth();

  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  return (
    <ThemedSafeAreaView className="flex-1 justify-center items-center">
      <View className="flex-1 justify-center items-center gap-6">
        <View className="flex items-center gap-3">
          <ThemedText className="text-5xl font-bold">Hello</ThemedText>
          <ThemedText className="text-xl">Sign in to your account!</ThemedText>
        </View>
        <View className="w-full flex gap-4">
          <View className="w-80 relative">
            <Ionicons
              className="absolute z-10 top-1/2 left-3 -translate-y-1/2"
              name={authIcons["Email"]}
              size={18}
              color={theme.text}
            />
            <TextInput
              placeholder="Email"
              style={{ backgroundColor: theme.primary, color: theme.text }}
              className="w-full px-10 py-3 rounded-full text-base placeholder:color-white"
              onChangeText={setEmailLogin}
              value={emailLogin}
            />
          </View>

          <View className="w-80 relative">
            <Ionicons
              className="absolute z-10 top-1/2 left-3 -translate-y-1/2"
              name={authIcons["Password"]}
              size={18}
              color={theme.text}
            />
            <TextInput
              placeholder="Password"
              style={{ backgroundColor: theme.primary, color: theme.text }}
              className="w-full px-10 py-3 rounded-full text-base placeholder:color-white"
              onChangeText={setPasswordLogin}
              value={passwordLogin}
            />
          </View>

          <TouchableOpacity
            onPress={async () => await login(emailLogin, passwordLogin)}
            className="bg-blue-600 px-6 py-3 rounded-full disabled:opacity-50"
            disabled={emailLogin === "" || passwordLogin === ""}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Login
            </Text>
          </TouchableOpacity>
          <Text className="text-red-500 text-center">{error}</Text>
        </View>
      </View>
    </ThemedSafeAreaView>
  );
};

export default Auth;
