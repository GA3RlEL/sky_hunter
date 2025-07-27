import React from "react";
import { ReactNode } from "react";
import { Text, TextProps, StyleProp, useColorScheme } from "react-native";
import { Colors } from "../../constant/Colors";

interface ThemedTextProps extends TextProps {
  children?: ReactNode;
  style?: StyleProp<TextProps>;
  className?: string;
  fontColor?: "primaryText" | "secondaryText";
}

export default function ThemedText({
  children,
  style,
  className,
  fontColor = "primaryText",
}: ThemedTextProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  return (
    <Text
      className={className}
      style={[
        { color: fontColor === "primaryText" ? theme.text : theme.secondary },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
