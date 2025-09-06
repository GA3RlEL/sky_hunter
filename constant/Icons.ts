import { Ionicons } from "@expo/vector-icons";

export const navTabIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Flights: "airplane-outline",
  Favourites: "heart-outline",
  Search: "home-outline",
  Profile: "person-outline",
};

export const navTabIconsFocused: Record<
  string,
  keyof typeof Ionicons.glyphMap
> = {
  Flights: "airplane",
  Favourites: "heart",
  Search: "home",
  Profile: "person",
};

export const favFlightIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Star: "star",
  DoubleArrows: "swap-horizontal",
};

export const profileIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  PersonalData: "person",
  Notifications: "notifications-outline",
  Help: "help-circle-outline",
};

export const authIcons: Record<string, keyof typeof Ionicons.glyphMap> = {
  Email: "mail-outline",
  Password: "lock-closed-outline",
};
