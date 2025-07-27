import React from "react";
import { StyleProp, useColorScheme, ViewStyle } from "react-native";
import { Colors } from "../../constant/Colors";
import {
  SafeAreaView,
  SafeAreaViewProps,
} from "react-native-safe-area-context";

interface ThemedSafeAreaViewProps extends SafeAreaViewProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
}

export default function ThemedSafeAreaView({
  children,
  style,
  className,
  ...props
}: ThemedSafeAreaViewProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  return (
    <SafeAreaView
      style={[style, { backgroundColor: theme.background }]}
      className={className}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
}
