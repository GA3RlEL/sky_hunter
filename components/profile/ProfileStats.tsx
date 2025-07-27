import { Text, View } from "react-native";
import React from "react";
import { User } from "../../types/User";
import ThemedView from "../themed/ThemedView";
import ThemedText from "../themed/ThemedText";

interface ProfileStatsProps {
  user: User;
}

const ProfileStats = ({ user }: ProfileStatsProps) => {
  return (
    <View className="flex flex-row gap-4 justify-between w-full">
      <ThemedView className="flex-1 py-4 justify-center items-center gap-3 rounded-2xl">
        <Text className="text-3xl font-bold text-sky-800">
          {user.stats.flightsCount}
        </Text>
        <ThemedText className=" text-wrap text-center">
          Total flights
        </ThemedText>
      </ThemedView>

      <ThemedView className="flex-1 justify-center items-center gap-3 rounded-2xl">
        <Text className="text-3xl font-bold text-sky-800">
          {user.stats.visitedTownsCount}
        </Text>
        <ThemedText className="w-[90%] text-wrap text-center">
          Visited towns
        </ThemedText>
      </ThemedView>

      <ThemedView className="flex-1 justify-center items-center gap-3 rounded-2xl">
        <Text className="text-3xl font-bold text-sky-800 text-center">
          {user.stats.kilometersFlown < 1000
            ? user.stats.kilometersFlown
            : user.stats.kilometersFlown / 1000 + "k"}
        </Text>
        <ThemedText className=" text-wrap text-center">
          Flown kilometers
        </ThemedText>
      </ThemedView>
    </View>
  );
};

export default ProfileStats;
