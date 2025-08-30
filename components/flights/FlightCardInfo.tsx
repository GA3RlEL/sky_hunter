import { View, Text, Image, useColorScheme } from 'react-native'
import React from 'react'
import ThemedText from '../themed/ThemedText';
import { Colors } from '../../constant/Colors';

interface FlightCardInfoProps {
    airlineLogoUrl: string,
    origin: string,
    destination: string,
    stops: number,
    departure: Date,
    arrival: Date,
}

const FlightCardInfo = (
    {airlineLogoUrl, origin, destination, stops, departure, arrival} : FlightCardInfoProps
) => {
      const scheme = useColorScheme();
      const theme = Colors[scheme!] ?? Colors.light;

        const generateStopsPositions = (stops: number) => {
    if (stops === 1) return [50];
    else if (stops === 2) return [25, 75];
    else if (stops === 3) return [25, 50, 75];
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
    <View>
        <View className="flex-row ml-3 mt-3">
          <View className="w-10 h-10 rounded-full bg-white justify-center items-center  ">
            <Image
              className="w-7 h-7"
              source={{ uri: airlineLogoUrl }}
            />
          </View>


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
    </View>
  )
}

export default FlightCardInfo