import React from "react";
import { StyleProp, useColorScheme, View, ViewProps, ViewStyle } from "react-native";
import { Colors } from "../../constant/Colors";

interface ThemedViewProps extends ViewProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    className?: string;
}

export default function ThemedView({
    children,
    style,
    className,
    ...props
}: ThemedViewProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

    return (
        <View style={[style, {backgroundColor: theme.primary }]} className={className} {...props}>
            {children}
        </View>
    );
}

