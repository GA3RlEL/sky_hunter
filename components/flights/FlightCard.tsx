import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "../../constant/Colors";
import ThemedText from "../themed/ThemedText";
import ThemedView from "../themed/ThemedView";

interface FlightCardProps {
  airlineName: string;
  airlineLogoUrl: string;
  origin: string;
  destination: string;
  price: number;
  stops: number;
  departure: Date;
  arrival: Date;
}

export default function FlightCard({
  airlineName,
  airlineLogoUrl,
  origin,
  destination,
  price,
  departure,
  arrival,
  stops = 0,
}: FlightCardProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  const formatAmount = (value: number) => {
    return value.toLocaleString("en-us", { minimumFractionDigits: 2 });
  };

  const generateStopsPositions = (stops: number) => {
    if (stops === 0) return [50];
    else if (stops === 1) return [25, 75];
    else if (stops === 2) return [25, 50, 75];
    return [];
  };

  const getHourFromDate = (date: Date): string => {
    if (!date) return "--:--";

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  const getFlightDuration = () => {
    if (!departure || !arrival) return "N/A";

    const diffMs = arrival.getTime() - departure.getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes.toString().padStart(2, "0")}m`;
  };

  return (
    <TouchableOpacity>
      <ThemedView className="h-32 mb-5 mx-3 rounded-lg justify-between">
        <View className="flex-row ml-3 mt-3">
          <Image
            className="w-10 h-10 rounded-full"
            source={{ uri: airlineLogoUrl }}
          />

          <View className="items-start ml-3">
            <ThemedText className="text-[17px] font-bold">
              {getHourFromDate(departure)}
            </ThemedText>
            <Text style={{ color: theme.secondaryText }}>{origin}</Text>
          </View>

          <View className="mx-6 mt-4 items-center w-[162px]">
            <View className="relative justify-center w-full">
              <View className="h-0.5 bg-gray-300" />
              {generateStopsPositions(stops)?.map((position, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      backgroundColor: theme.buttonFocusedColor,
                      marginLeft: `${position}%`,
                      transform: [{ translateX: -6 }]
                    }}
                    className="absolute w-3 h-3 rounded-full border border-gray-200 shadow-sm"
                  />
                );
              })}
            </View>
            <Text
              className="text-xs mt-2 text-center"
              style={{ color: theme.secondaryText }}
            >
              {stops > 0 ? (stops === 1 ? (`1 przesiadka`) : (`${stops} przesiadki`)) : "Lot bezpośredni"} {"\n"}
              {getFlightDuration()}
            </Text>
          </View>

          <View className="items-end">
            <ThemedText className="text-[17px] font-bold">
              {getHourFromDate(arrival)}
            </ThemedText>
            <Text style={{ color: theme.secondaryText }}>{destination}</Text>
          </View>
        </View>
        <View className="items-end mb-3 mr-3">
          <Text
            className="font-bold text-2xl"
            style={{ color: "rgb(33, 150, 255)" }}
          >
            {formatAmount(price)} zł
          </Text>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}
