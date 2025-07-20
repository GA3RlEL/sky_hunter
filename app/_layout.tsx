import "./global.css";

import React from "react";
import { useColorScheme, View } from "react-native";

import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { useLinkBuilder } from "@react-navigation/native";
import { PlatformPressable, Text } from "@react-navigation/elements";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constant/Colors";
import { navTabIcons, navTabIconsFocused } from "../constant/Icons";

import Search from "./(tabs)/Search";
import Flights from "./(tabs)/Flights";
import Favourites from "./(tabs)/Favourites";
import Profile from "./(tabs)/Profile";

function NavigationBar({ state, descriptors, navigation }: BottomTabBarProps) {
  {/* 
    This component renders a custom navigation bar for the bottom tab navigator.
    It uses Ionicons for icons and applies styles based on the current color scheme.
  */}

  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  const { buildHref } = useLinkBuilder();

  return (
    <View
      className="flex flex-row bg-red-300 pb-8 pt-5"
      style={{ backgroundColor: theme.primary }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <PlatformPressable
            href={buildHref(route.name, route.params)}
            key={route.key}
            className="flex-1 flex-row items-center justify-center"
            onPress={onPress}
          >
            <View className="flex-col items-center gap-1 justify-around">
              <View
                className="rounded-lg p-1"
                style={{
                  backgroundColor: isFocused
                    ? theme.buttonColor
                    : "transparent",
                }}
              >
                <Ionicons
                  name={
                    isFocused
                      ? navTabIconsFocused[route.name]
                      : navTabIcons[route.name]
                  }
                  size={20}
                  color={isFocused ? "#ffffff" : theme.secondaryText}
                />
              </View>

              <Text
                style={{
                  color: isFocused
                    ? theme.buttonTextColor
                    : theme.secondaryText,
                }}
              >
                {label}
              </Text>
            </View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  {/* 
    This is the main app component that sets up 
    the bottom tab navigator with custom navigation bar. 
  */}

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <NavigationBar {...props} />}
    >
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Flights" component={Flights} />
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
