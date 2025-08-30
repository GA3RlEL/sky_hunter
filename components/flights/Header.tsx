import React from "react";
import { ScrollView, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { Colors } from "../../constant/Colors";

import ThemedView from "../themed/ThemedView";
import ThemedText from "../themed/ThemedText";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  departure: string;
  arrival: string;
  date: string;
  passengers: number;
}

export default function Header({
  departure,
  arrival,
  date,
  passengers,
}: HeaderProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  return (
    <ThemedView className="flex flex-row items-center pl-2 py-4 gap-2">
      <TouchableOpacity>
        <Ionicons
          name={"arrow-back"}
          size={32}
          color={theme.buttonFocusedColor}
        />
      </TouchableOpacity>
      <View>
        <ScrollView horizontal>
          <ThemedText className="text-xl font-bold">
            {departure} → {arrival}
          </ThemedText>
        </ScrollView>
        <Text className="text-lg" style={{ color: theme.secondaryText }}>
          {date} • {passengers} {passengers === 1 ? "pasażer" : "pasażerów"}
        </Text>
      </View>
    </ThemedView>
  );
}
