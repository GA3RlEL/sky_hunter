import React from "react";
import ThemedSafeAreaView from "../../components/themed/ThemedSafeAreaView";
import ThemedView from "../../components/themed/ThemedView";
import ThemedText from "../../components/themed/ThemedText";
import { FavouriteFlight } from "../../types/FavouriteFlight";
import { FlatList, View } from "react-native";
import FavouriteItem from "../../components/favourites/FavouriteItem";

const dummyData: FavouriteFlight[] = [
  {
    id: "1",
    origin: "Warszawa",
    destination: "Barcelona",
    price: 459,
    isAlert: true,
    alertRange: { max: 500 },
  },
  {
    id: "2",
    origin: "Kraków",
    destination: "Londyn",
    price: 289,
    isAlert: true,
    alertRange: { min: 200, max: 400 },
  },
  {
    id: "3",
    origin: "WAW",
    destination: "Rzym",
    price: 2340,
    isAlert: true,
    alertRange: { min: 2000, max: 2500 },
  },
];

const Favourites = () => {
  return (
    <ThemedSafeAreaView className="flex-1 gap-6">
      <ThemedView className="gap-3 p-6">
        <ThemedText className="text-4xl font-bold">Favourites</ThemedText>
      </ThemedView>
      <View className="w-[90%] mx-auto">
        <FlatList
          data={dummyData}
          renderItem={(data) => <FavouriteItem flightData={data.item} />}
          contentContainerStyle={{ gap: 20 }}
        />
      </View>
    </ThemedSafeAreaView>
  );
};

export default Favourites;
