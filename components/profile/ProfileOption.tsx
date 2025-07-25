import { View, Text, Switch, useColorScheme } from "react-native";
import React, { useState } from "react";
import ThemedView from "../themed/ThemedView";
import ThemedText from "../themed/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Colors } from "../../constant/Colors";

interface ProfileOptionProps {
  title: string;
  description: string;
  type: "link" | "button";
  icon: any;
  href: string;
}

const ProfileOption = ({
  title,
  description,
  type,
  icon,
  href,
}: ProfileOptionProps) => {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;
  const [enabled, setEnabled] = useState(false);

  return (
    <ThemedView className="flex flex-row w-full rounded-2xl px-6 py-4 gap-3 items-center">
      <View>
        <Ionicons
          size={20}
          name={icon}
          color="white"
          className="p-3 bg-sky-800 rounded-full"
        />
      </View>
      <View className="flex-1">
        <ThemedText className="text-lg">{title}</ThemedText>
        <ThemedText className="text-sm">{description}</ThemedText>
      </View>
      <View>
        {type === "link" && (
          <Link href={href} className="text-sky-800">
            <Ionicons size={20} name="arrow-forward" />
          </Link>
        )}
        {type === "button" && (
          <>
            <Switch
              trackColor={{
                false: theme.buttonColor,
                true: theme.buttonFocusedBorderColor,
              }}
              thumbColor={"#fff"}
              onValueChange={() => setEnabled((prev) => !prev)}
              value={enabled}
            />
          </>
        )}
      </View>
    </ThemedView>
  );
};

export default ProfileOption;
