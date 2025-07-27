import { View } from "react-native";
import React, { useState } from "react";
import ThemedButton from "../../components/themed/ThemedButton";
import ThemedSafeAreaView from "../../components/themed/ThemedSafeAreaView";
import ThemedText from "../../components/themed/ThemedText";
import FlightInputs from "../../components/search/FlightInputs";
import ThemedView from "../../components/themed/ThemedView";

const Search = () => {
  const [focused, setFocused] = useState(false);

  return (
    <ThemedSafeAreaView className="flex-1 gap-6">
      <ThemedView className="gap-3 p-6">
        <ThemedText className="text-4xl font-bold">SkyBook</ThemedText>
        <ThemedText className="font-semibold text-lg" fontColor="secondaryText">
          Find your perfect flight
        </ThemedText>
      </ThemedView>

      <View className="flex-1 w-[90%] mx-auto gap-6">
        <FlightInputs />

        <ThemedButton
          text="Search Flights"
          onPress={() => setFocused(!focused)}
          isFocused={focused}
          className="p-4  rounded-full flex flex-row items-center justify-center"
          icon={"search"}
        ></ThemedButton>
      </View>
    </ThemedSafeAreaView>
  );
};

export default Search;
