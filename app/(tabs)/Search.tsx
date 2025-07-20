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
        <ThemedText>Find your perfect flight</ThemedText>
      </ThemedView>
      <View className="w-[90%] mx-auto">
        <FlightInputs />
      </View>
      <ThemedButton
        text="Search Flights"
        onPress={() => setFocused(!focused)}
        isFocused={focused}
        className="p-4 rounded-lg flex flex-row items-center justify-center"
        icon={"search"}
      ></ThemedButton>
    </ThemedSafeAreaView>
  );
};

export default Search;
