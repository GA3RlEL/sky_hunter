import { StyleProp, Text, TouchableOpacity, TouchableOpacityProps, useColorScheme, View, ViewStyle } from "react-native";
import React from "react";
import { Colors } from "../../constant/Colors";
import { Ionicons } from "@expo/vector-icons";

interface ThemedButtonProps extends TouchableOpacityProps {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    className?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconSize?: number;
    text: string;
    isFocused?: boolean;
    onPress: () => void;
}

export default function ThemedButton({
    children,
    style,
    className,
    icon,
    iconSize = 20,
    text,
    isFocused = false,
    onPress,
}: ThemedButtonProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

    return (
        <TouchableOpacity
            style={[style, { 
                    backgroundColor: isFocused ? theme.buttonFocusedColor : theme.buttonColor, 
                    borderColor: isFocused ? theme.buttonFocusedBorderColor : theme.buttonBorderColor 
                }
            ]}
            className={`${className}`}
            onPress={onPress}
        >
            {icon && <Ionicons name={icon} size={iconSize} color={isFocused ? theme.buttonFocusedTextColor : theme.buttonTextColor} />}
            <Text style={{ color: isFocused ? theme.buttonFocusedTextColor : theme.buttonTextColor }}>
                {text}
            </Text>
            {children}
        </TouchableOpacity>
    );
}

