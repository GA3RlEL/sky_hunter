import React from "react";
import { useColorScheme } from "react-native";
import { Colors } from "../../constant/Colors";
import ThemedButton from "../themed/ThemedButton";
import ThemedText from "../themed/ThemedText";

interface FilterProps {
    name: string;
    selected: boolean;
    onPress?: () => void;
}

export default function Filter({
    name,
    selected,
    onPress
}: FilterProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  return (
    <ThemedButton text={name} onPress={onPress} className="rounded-xl p-2" isFocused={selected}/>
  );
}
