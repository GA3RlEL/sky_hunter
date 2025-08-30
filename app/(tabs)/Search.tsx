import { Keyboard, TouchableWithoutFeedback, useColorScheme, View } from "react-native";
import { router, useNavigation } from 'expo-router';

import React, { useState } from "react";

//components
import ThemedButton from "../../components/themed/ThemedButton";
import ThemedSafeAreaView from "../../components/themed/ThemedSafeAreaView";
import ThemedText from "../../components/themed/ThemedText";
import ThemedView from "../../components/themed/ThemedView";
import FlightDropDown from "../../components/search/FlightDropDown";
import FlightCalendar from "../../components/search/FlightCalendar";

//hooks
import { useDropDown } from "../../hooks/useDropDowns";
import { useAirports } from "../../hooks/useAirports";

//constants
import { Colors } from "../../constant/Colors";

//types
import { SelectedDates } from "../../types/SelectedDate";
import { DaySelected } from "../../types/DaySelected";
import { useFlights } from "../../hooks/useFlights";
import { useDate } from "../../hooks/useDate";

const Search = () => {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  //departure states
  const [departureDropDownShown, setDepartureDropDownShown] = useState<boolean>(false);
  const [departureDropDownValues, setDepartureDropDownValues] = useState<string[]>([])
  const [departureCalendar, setDepartureCalendar] = useState<boolean>(false);
  const [departureDates, setDepartureDates] = useState<SelectedDates>({ start: null, end: null });

  const handleDepartureDateSelect = (firstDate: DaySelected | null, lastDate: DaySelected | null) => {
    setDepartureDates(firstDate ? { start: firstDate, end: lastDate } : { start: null, end: null });
  };

  //arrival states
  const [arrivalDropDownShown, setArrivalDropDownShown] = useState<boolean>(false);
  const [arrivalDropDownValues, setArrivalDropDownValues] = useState<string[]>([])
  const [arrivalCalendar, setArrivalCalendar] = useState<boolean>(false);
  const [arrivalDates, setArrivalDates] = useState<SelectedDates>({ start: null, end: null });

  const handleArrivalDateSelect = (firstDate: DaySelected | null, lastDate: DaySelected | null) => {
    setArrivalDates(firstDate ? { start: firstDate, end: lastDate } : { start: null, end: null });
  };

  const [nights, setNights] = useState<[number, number]>([0, 0]);

  const handleNightsSelect = (nights: [number, number]) => {
    setNights(nights);
  }

  const navigation = useNavigation<any>();

  const {arrival, departure, setArrival, setDeparture} = useDropDown();
  const {airports} = useAirports();
  const {searchFlights} = useFlights();
  const {formatDate} = useDate();

  const handleSearchPress = (origin: string[], destination: string[]) => {
  const date = (departureDates.start && formatDate(departureDates.start.year, departureDates.start.month, departureDates.start.day)) +
             (departureDates.end && " - " + formatDate(departureDates.end.year, departureDates.end.month, departureDates.end.day)) +
             (arrivalDates.start ? " to " + formatDate(arrivalDates.start.year, arrivalDates.start.month, arrivalDates.start.day) : "") +
             (arrivalDates.end ? " - " + formatDate(arrivalDates.end.year, arrivalDates.end.month, arrivalDates.end.day) : "")

    navigation.navigate('Flights', {
      origin: origin,
      destination: destination,
      date: date
    });
  };

    const handleSearch = async () => {
        const departure_date = departureDates.start ? 
                                formatDate(departureDates.start.year, departureDates.start.month, departureDates.start.day)
                                : false;

        if (departure.length > 0 && arrival.length > 0 && departure_date) {

          const departure_date_max = departureDates.end ? 
                                formatDate(departureDates.end.year, departureDates.end.month, departureDates.end.day)
                                : false;

          const return_date = arrivalDates.start ?
                              formatDate(arrivalDates.start.year, arrivalDates.start.month, arrivalDates.start.day)
                              : false;

          const return_date_max = arrivalDates.end ?
                              formatDate(arrivalDates.end.year, arrivalDates.end.month, arrivalDates.end.day)
                              : false;

          const params = {
              origins: departure.join(","),
              destinations: arrival.join(","),
              departure_date: departure_date,
              ...(departure_date_max !== false && { departure_date_max: departure_date_max }),
              ...(return_date !== false && { return_date: return_date }),
              ...(return_date_max !== false && { return_date_max: return_date_max }),
              ...((return_date == false && nights[0] !== 0) && { min_nights: nights[0] }),
              ...((return_date == false && nights[1] !== 0) && { max_nights: nights[1] }),
          }

          await searchFlights(params);
        }
    };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedSafeAreaView className="flex-1 gap-6">
        <ThemedView className="gap-3 p-6">
          <ThemedText className="text-4xl font-bold">SkyHunter</ThemedText>
          <ThemedText
            className="font-semibold text-lg"
            fontColor="primaryText"
          >
            Find your perfect flight
          </ThemedText>
        </ThemedView>

        <View className="flex-1 w-[90%] mx-auto gap-3">

          {/*departure dropdown*/}
          <View className="gap-1">
            <FlightDropDown
              title={"Departure from"}
              placeholder="Select airports..."
              open={departureDropDownShown}
              setOpen={setDepartureDropDownShown}
              disabled={arrivalDropDownShown}
              items={airports}
              values={departureDropDownValues}
              setValue={(value) => {
                setDepartureDropDownValues(value);
                setDeparture(value);
              }}
              zIndex={3000}
              zIndexInverse={1000}
            />
          </View>

          {/*departure dropdown*/}
          <View className="gap-1">
            <FlightDropDown
              title={"Arrival in"}
              placeholder="Select airports..."
              open={arrivalDropDownShown}
              setOpen={setArrivalDropDownShown}
              disabled={departureDropDownShown}
              items={airports}
              values={arrivalDropDownValues}
              setValue={(value) => {
                setArrivalDropDownValues(value);
                setArrival(value);
              }}
              zIndex={2000}
              zIndexInverse={500}
            />
          </View>

          <View className="flex-row gap-2">

            {/*departure calendar*/}
            <View className="flex-1 gap-1">
              <FlightCalendar
                  title="Departure date"
                  placeholder="Select dates..."
                  visible={departureCalendar}
                  setVisible={setDepartureCalendar}
                  selectedDates={departureDates}
                  handleDateSelect={handleDepartureDateSelect}
                />
            </View>

            {/*arrival calendar*/}
            <View className="flex-1 gap-1">
              <FlightCalendar
                title="Arrival date"
                placeholder="Select dates or nights..."
                visible={arrivalCalendar}
                setVisible={setArrivalCalendar}
                selectedDates={arrivalDates}
                handleDateSelect={handleArrivalDateSelect}
                canSelectNights
                onNightChange={handleNightsSelect}
                nights={nights}
              />
            </View>

          </View>

          <ThemedButton
            text="Search Flights"
            onPress={() => {handleSearchPress(departure, arrival); handleSearch();}}
            isFocused={true}
            className="p-4 mt-5 rounded-full flex flex-row items-center justify-center"
            icon={"search"}
          />
            
        </View>
      </ThemedSafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Search;
