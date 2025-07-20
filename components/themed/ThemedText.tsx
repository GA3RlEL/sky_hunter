import React from "react";
import { ReactNode } from "react";
import { Text, TextProps, StyleProp, useColorScheme } from "react-native";
import { Colors } from "../../constant/Colors";

interface ThemedTextProps extends TextProps {
  children?: ReactNode;
  style?: StyleProp<TextProps>;
  className?: string;
}

export default function ThemedText({
  children,
  style,
  className,
}: ThemedTextProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  return (
    <Text className={className} style={[style, { color: theme.text }]}>
      {children}
    </Text>
  );
}
