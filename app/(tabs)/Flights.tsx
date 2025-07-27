import React, { useState } from "react";

import { ScrollView, Text, useColorScheme, View } from "react-native";
import { Colors } from "../../constant/Colors";

import ThemedSafeAreaView from "../../components/themed/ThemedSafeAreaView";
import Header from "../../components/flights/Header";
import Filter from "../../components/flights/Filter";
import FlightCard from "../../components/flights/FlightCard";
import { useFlights } from "../../hooks/useFlights";
import { AirlineLogoUrls } from "../../constant/AirlineLogoUrls";
import { Flight } from "../../types/Flight";

const Flights = () => {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  const { flightsList, resetSort, sortFlightsByPrice, sortFlightsByDuration } = useFlights();
  const [selectedFilter, setSelectedFilter] = useState<string | boolean>(false);
  
  const sortedFlights: Flight[] = [];

  const handleSelectedFilter = (filter: string) => {
    if (selectedFilter === filter) { setSelectedFilter(false); resetSort(); return};

    setSelectedFilter(filter)
    
    if (filter === "Najtańsze") {
      sortFlightsByPrice();
    }
    else if (filter === "Najszybsze") {
      sortFlightsByDuration();
    }
  }

  return (
    <ThemedSafeAreaView className="flex-1">
      <Header
        departure="Warszawa"
        arrival="Barcelona"
        date="15 lip 2025"
        passengers={2}
      />

      <View className="flex flex-row self-start ml-2 gap-2 mt-3">
        <Filter name="Najszybsze" selected={selectedFilter === "Najszybsze"} onPress={() => handleSelectedFilter("Najszybsze")} />
        <Filter name="Najtańsze" selected={selectedFilter === "Najtańsze"} onPress={() => handleSelectedFilter("Najtańsze")} />
      </View>

      <ScrollView
        style={{maxHeight: 128 * 4}}
        className="mt-5"
      >
        {flightsList.map((flights, index) => {
          return (
            <FlightCard
              key={index}
              airlineName={flights.airline}
              airlineLogoUrl={AirlineLogoUrls[flights.airline.toLowerCase()]}
              origin={flights.origin}
              destination={flights.destination}
              price={flights.price}
              stops={flights.stops ?? 0}
              departure={flights.departure}
              arrival={flights.arrival}
            />
          );
        })}
      </ScrollView>

    </ThemedSafeAreaView>
  );
};

export default Flights;
