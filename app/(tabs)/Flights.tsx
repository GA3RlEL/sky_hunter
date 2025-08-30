import React, { useState } from "react";

import { ActivityIndicator, ScrollView, Text, useColorScheme, View } from "react-native";
import { Colors } from "../../constant/Colors";

import ThemedSafeAreaView from "../../components/themed/ThemedSafeAreaView";
import Header from "../../components/flights/Header";
import Filter from "../../components/flights/Filter";
import FlightCard from "../../components/flights/FlightCard";
import { useFlights } from "../../hooks/useFlights";
import { Flight } from "../../types/Flight";
import { useRoute } from "@react-navigation/native";
import FlightCardReturn from "../../components/flights/FlightCardReturn";

const Flights = () => {
 const scheme = useColorScheme();
 const theme = Colors[scheme!] ?? Colors.light;

 const route = useRoute();

 const origin = (route.params as any)?.origin || false
 const destination = (route.params as any)?.destination || false
 const date = (route.params as any)?.date || false

 const { flightsList, resetSort, sortFlightsByPrice, sortFlightsByDuration } = useFlights();
 const [selectedFilter, setSelectedFilter] = useState<string | boolean>(false);
 
 const { loading } = useFlights();
 
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
       departure={origin ? origin.join(", ") : "N/A"}
       arrival={destination ? destination.join(", ") : "N/A"}
       date={date || "N/A"}
       passengers={2}
     />

     {loading ? (
      <View className="h-full items-center justify-center">
       <ActivityIndicator />
      </View>
     ) : (
       <>
         <View className="flex flex-row self-start ml-2 gap-2 mt-3">
           <Filter name="Najszybsze" selected={selectedFilter === "Najszybsze"} onPress={() => handleSelectedFilter("Najszybsze")} />
           <Filter name="Najtańsze" selected={selectedFilter === "Najtańsze"} onPress={() => handleSelectedFilter("Najtańsze")} />
         </View>

         <ScrollView
           style={{maxHeight: 128 * 4}}
           className="mt-5"
         >
           {flightsList.map((flights, index) => {
             const props = {
                 airlineLogoUrl: `https://images.daisycon.io/airline/?width=300&height=300&color=ffffff&iata=${flights.itineraries[0].segments[0].carrier}`,
                 origin: flights.origin,
                 destination: flights.destination,
                 price: flights.price,
                 stops: flights.total_stops ?? 0,
                 departure: flights.itineraries[0].segments[0].departureTimestamp,
                 arrival: flights.itineraries[0].segments[flights.itineraries[0].segments.length - 1].arrivalTimestamp
             }

             if (flights.is_return_trip) {
               return (
                 <FlightCardReturn
                   key={index}
                   {...props}

                   returnAirlineLogoUrl={`https://images.daisycon.io/airline/?width=300&height=300&color=ffffff&iata=${flights.itineraries[1].segments[0].carrier}`}
                   returnStops={flights.itineraries[1].numberOfStops || 0}
                   returnDeparture={flights.itineraries[1].segments[0].departureTimestamp}
                   returnArrival={flights.itineraries[1].segments[flights.itineraries[1].segments.length - 1].arrivalTimestamp}
                 />
               );
             }

             return (
               <FlightCard
                 key={index}
                 {...props}
               />
             )
           })}
         </ScrollView>
       </>
     )}

   </ThemedSafeAreaView>
 );
};

export default Flights;