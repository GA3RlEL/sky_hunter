import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React from "react";
import ThemedSafeAreaView from "../../components/themed/ThemedSafeAreaView";
import ThemedView from "../../components/themed/ThemedView";
import ThemedText from "../../components/themed/ThemedText";
import { User } from "../../types/User";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfileStats from "../../components/profile/ProfileStats";
import ProfileOption from "../../components/profile/ProfileOption";
import { profileIcons } from "../../constant/Icons";
import ThemedButton from "../../components/themed/ThemedButton";

const exampleUser: User = {
  id: "u123",
  email: "jan.kowalski@example.com",
  firstName: "Jan",
  lastName: "Kowalski",
  fullName: "Jan Kowalski",
  // photoUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  rank: "Gold",
  points: 2450,
  stats: {
    flightsCount: 18,
    kilometersFlown: 23500,
    visitedTownsCount: 12,
  },
};

const Profile = () => {
  return (
    <ThemedSafeAreaView className="flex-1 gap-6">
      <ThemedView className="gap-3 p-6">
        <ThemedText className="text-4xl font-bold">Profile</ThemedText>
      </ThemedView>

      <View className="flex gap-6  items-center mx-auto w-[90%]">
        <ProfileHeader user={exampleUser} />
        <ProfileStats user={exampleUser} />
        <ProfileOption
          title="Personal data"
          description="Manage your personal data"
          type="link"
          icon={profileIcons!.PersonalData}
          href="/(tabs)/Profile/PersonalData"
        />
        <ProfileOption
          title="Notifications"
          description="Status updates, alerts"
          type="button"
          icon={profileIcons!.Notifications}
          href="/(tabs)/Profile/Notifications"
        />
        <ProfileOption
          title="Help and support"
          description="FAQ, contact support"
          type="link"
          icon={profileIcons!.Help}
          href="/(tabs)/Profile/Help"
        />

        <TouchableOpacity className=" border-red-600 border w-full justify-center items-center rounded-full p-4">
          <Text className="text-red-600 text-lg font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </ThemedSafeAreaView>
  );
};

export default Profile;
