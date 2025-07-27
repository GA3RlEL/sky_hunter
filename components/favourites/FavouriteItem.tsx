import { View, Text, useColorScheme, TouchableOpacity } from "react-native";
import React from "react";
import ThemedView from "../themed/ThemedView";
import { FavouriteFlight } from "../../types/FavouriteFlight";
import ThemedText from "../themed/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { favFlightIcons } from "../../constant/Icons";
import { Colors } from "../../constant/Colors";

interface FavouriteItemProps {
  flightData: FavouriteFlight;
}

const FavouriteItem = ({ flightData }: FavouriteItemProps) => {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  return (
    <ThemedView className="flex-1 px-4 py-8 rounded-2xl flex-row gap-4">
      <View>
        <Ionicons
          size={20}
          color={theme.buttonFocusedColor}
          name={favFlightIcons["Star"]}
        />
      </View>
      <View className="flex-1 gap-5">
        <View className="flex-1 flex-row items-center justify-between">
          <ThemedText>{flightData.origin}</ThemedText>
          <Ionicons
            size={20}
            color={theme.buttonFocusedColor}
            name={favFlightIcons["DoubleArrows"]}
          />
          <ThemedText>{flightData.destination}</ThemedText>
        </View>
        {flightData.isAlert && (
          <View className="px-4 py-2 self-start bg-sky-900 rounded-full  ">
            <ThemedText className="text-center">
              Alert:{" "}
              {flightData.alertRange?.min
                ? `${flightData.alertRange?.min} zł < ${flightData.alertRange?.max} zł`
                : `< ${flightData.alertRange?.max} zł`}
            </ThemedText>
          </View>
        )}
      </View>
      <View className="flex flex-col justify-between items-center">
        <Text className="font-semibold text-xl color-sky-600">
          {flightData.price} zł
        </Text>
        <TouchableOpacity className="flex items-center bg-sky-600 px-6 py-2 rounded-full">
          <ThemedText>Search</ThemedText>
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
};

export default FavouriteItem;
