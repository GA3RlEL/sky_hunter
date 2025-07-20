import { View, TextInput, useColorScheme } from "react-native";
import React, { useState } from "react";
import ThemedText from "../themed/ThemedText";
import { Colors } from "../../constant/Colors";
import { replace } from "expo-router/build/global-state/routing";

interface LabeledInputProps {
  labelName: string;
  inputType: "text" | "number";
  className?: string;
}

export default function LabeledInput({
  labelName,
  inputType,
  className,
}: LabeledInputProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;
  const [value, setValue] = useState("");
  const regex = /^[0-9]*$/g;

  return (
    <View className={className + " gap-2"}>
      <ThemedText>{labelName}</ThemedText>
      {inputType === "text" && (
        <TextInput
          value={value}
          onChangeText={(text) => setValue(text)}
          className="rounded-lg p-4"
          style={{ backgroundColor: theme.secondary, color: theme.text }}
        ></TextInput>
      )}

      {inputType === "number" && (
        <TextInput
          value={value}
          placeholder="0"
          onChangeText={(text) => {
            const checkedText = regex.exec(text)?.toString();
            if (checkedText) {
              setValue(checkedText);
            } else {
              setValue("");
            }
          }}
          placeholderTextColor={theme.text}
          className="rounded-lg p-4 "
          style={{ backgroundColor: theme.secondary, color: theme.text }}
          keyboardType="numeric"
        ></TextInput>
      )}
    </View>
  );
}
