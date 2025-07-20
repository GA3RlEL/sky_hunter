import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import ThemedText from "../themed/ThemedText";
import ThemedButton from "../themed/ThemedButton";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Colors } from "../../constant/Colors";

interface LabeledInputDateProps {
  labelName: string;
  className?: string;
}

export default function LabeledInputDate({
  labelName,
  className,
}: LabeledInputDateProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <View className={className + " gap-2"}>
      <ThemedText>{labelName}</ThemedText>
      <TouchableOpacity
        style={{
          backgroundColor: theme.buttonColor,
          borderColor: theme.buttonBorderColor,
        }}
        className="p-4 rounded-lg"
        onPress={() => setOpen(true)}
      >
        <ThemedText>{date.toLocaleDateString()}</ThemedText>
      </TouchableOpacity>
      {open && (
        <DateTimePicker
          value={date}
          mode="date"
          display="calendar"
          onChange={(event: DateTimePickerEvent, date: Date | undefined) => {
            setOpen(false);
            if (date) {
              setDate(date);
            }
          }}
        />
      )}
    </View>
  );
}
