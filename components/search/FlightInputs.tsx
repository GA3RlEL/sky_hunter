import React from "react";

import ThemedView from "../themed/ThemedView";
import LabeledInput from "./LabeledInput";
import LabeledInputDate from "./LabeledInputDate";
import { View } from "react-native";

export default function FlightInputs() {
  return (
    <ThemedView className="p-5 rounded-xl gap-3">
      <LabeledInput labelName="From" inputType="text" />
      <LabeledInput inputType="text" labelName="To" />
      <View className="flex-row justify-between items-center gap-3">
        <LabeledInputDate className="flex-grow" labelName="Date" />
        <LabeledInput
          className="flex-grow"
          labelName="Passengers"
          inputType="number"
        />
      </View>
    </ThemedView>
  );
}
