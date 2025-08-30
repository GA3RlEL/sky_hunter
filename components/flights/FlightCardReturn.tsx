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
import FlightCardInfo from "./FlightCardInfo";

interface FlightCardReturnProps {
  airlineLogoUrl: string;
  origin: string;
  destination: string;
  stops: number;
  departure: Date;
  arrival: Date;

  returnAirlineLogoUrl: string,
  returnDeparture: Date;
  returnArrival: Date;
  returnStops: number;

  price: number;
}

export default function FlightCardReturn({
  airlineLogoUrl,
  origin,
  destination,
  stops = 0,
  departure,
  arrival,
  returnAirlineLogoUrl,
  returnDeparture,
  returnArrival,
  returnStops = 0,
  price,
}: FlightCardReturnProps) {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  const formatAmount = (value: number) => {
    return value.toLocaleString("en-us", { minimumFractionDigits: 2 });
  };

  return (
    <TouchableOpacity>
      <ThemedView className="h-50 mb-5 mx-3 rounded-lg justify-between">

        <FlightCardInfo
            airlineLogoUrl={airlineLogoUrl}
            departure={departure}
            arrival={arrival}
            origin={origin}
            destination={destination}
            stops={stops}
        />

        <FlightCardInfo
            airlineLogoUrl={returnAirlineLogoUrl}
            departure={returnDeparture}
            arrival={returnArrival}
            origin={destination}
            destination={origin}
            stops={returnStops}
        />

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
