import { View, Text, Image } from "react-native";
import React from "react";
import ThemedView from "../themed/ThemedView";
import ThemedText from "../themed/ThemedText";
import { User } from "../../types/User";

interface ProfileHeaderProps {
  user: User;
}

const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  return (
    <ThemedView className="w-full flex flex-row items-center gap-4 rounded-2xl p-6">
      <View>
        {user.photoUrl ? (
          <Image
            height={100}
            width={100}
            className="rounded-full"
            source={{
              uri: user.photoUrl ? user.photoUrl : "",
            }}
          />
        ) : (
          <>
            <View
              style={{ width: 100, height: 100 }}
              className="justify-center items-center flex rounded-full bg-sky-900"
            >
              <ThemedText className="text-4xl">
                {user.firstName.split("")[0].toUpperCase()}
                {user.lastName.split("")[0].toUpperCase()}
              </ThemedText>
            </View>
          </>
        )}
      </View>
      <View className="flex gap-2">
        <ThemedText className="text-xl font-bold">{user.fullName}</ThemedText>
        <ThemedText>{user.email}</ThemedText>
        <View className="flex flex-row gap-4 items-center">
          <ThemedText className="bg-sky-600 px-8 py-1 rounded-full">
            {user.rank}
          </ThemedText>
          <ThemedText>{user.points?.toLocaleString()} points</ThemedText>
        </View>
      </View>
    </ThemedView>
  );
};

export default ProfileHeader;
