import { Pressable, ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import React, { useState, useEffect } from "react";

//components
import Modal from "react-native-modal";
import Calendar from "./Calendar";
import ThemedText from "../themed/ThemedText";
import { Ionicons } from "@expo/vector-icons";
import { RangeSlider } from '@react-native-assets/slider'

//constants
import { Colors } from "../../constant/Colors";
import { monthNames } from "../../constant/Dates";

//types
import { DaySelected } from "../../types/DaySelected";
import { SelectedDates } from "../../types/SelectedDate";

//hooks
import { useDate } from "../../hooks/useDate";

interface CalendarModalProps {
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>,
    onDateSelect?: (firstDate: DaySelected | null, lastDate: DaySelected | null) => void,
    canSelectNights?: boolean,
    onNightChange?: (nights: [number, number]) => void;
    selectedDates?: SelectedDates;
    nights?: [number, number];
}

const CalendarModal = ({
    visible, 
    setVisible, 
    onDateSelect, 
    canSelectNights, 
    onNightChange,
    selectedDates,
    nights: initialNights,
} : CalendarModalProps) => {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;

  const [selectedFirstDate, setSelectedFirstDate] = useState<DaySelected | null>(null);
  const [selectedLastDate, setSelectedLastDate] = useState<DaySelected | null>(null);

  const [nightsSliderPage, setNightSliderPage] = useState<boolean>(false);
  const [nights, setNights] = useState<[number, number]>(initialNights || [1, 30]);

  const { getDayName } = useDate();

  useEffect(() => {
    if (visible) {
      if (selectedDates?.start) {
        setSelectedFirstDate(selectedDates.start);
        setSelectedLastDate(selectedDates.end);
      }
      if (initialNights) {
        setNights(initialNights);
      }
    }
  }, [visible, selectedDates, initialNights]);

  const handleDateChange = (firstDate: DaySelected | null, lastDate: DaySelected | null) => {
    setSelectedFirstDate(firstDate);
    setSelectedLastDate(lastDate);
  };

  const handleCancel = () => {
    if (selectedDates?.start) {
      setSelectedFirstDate(selectedDates.start);
      setSelectedLastDate(selectedDates.end);
    } else {
      setSelectedFirstDate(null);
      setSelectedLastDate(null);
    }
    
    if (initialNights) {
      setNights(initialNights);
    }
    
    setNightSliderPage(false);
    setVisible(false);
  };

  const handleAccept = () => {
    if (nightsSliderPage) {
      if (onNightChange) {
        onNightChange(nights);
      }
      if (onDateSelect) {
        onDateSelect(null, null);
      }
    } else {
      if (onDateSelect) {
        onDateSelect(selectedFirstDate, selectedLastDate);
      }
      if (onNightChange) {
        onNightChange([0, 0]);
      }
    }
    
    setNightSliderPage(false);
    setVisible(false);
  };

  const handleNightsSliderPage = () => {
    const newNightsSliderPage = !nightsSliderPage;
    setNightSliderPage(newNightsSliderPage);
  }

  const formatNightRange = () => {
    const range = nights[0] === nights[1] ? `${nights[0]}` : `${nights[0]} - ${nights[1]}`;
    const count = nights[0] === nights[1] ? nights[0] : Math.abs(nights[1] - nights[0]);
    return `${range} night${count === 1 ? '' : 's'}`;
  }

  const formatDateRange = () => {
    if (!selectedFirstDate) return "Select dates";

    if (!selectedLastDate) {
      const firstDateFormat = `${getDayName(selectedFirstDate.year, selectedFirstDate.month, selectedFirstDate.day)} ${selectedFirstDate.day} ${monthNames[selectedFirstDate.month - 1].substring(0, 3)}`
      return firstDateFormat
    }

    const firstDateFormat = `${getDayName(selectedFirstDate.year, selectedFirstDate.month, selectedFirstDate.day)} ${selectedFirstDate.day} ${monthNames[selectedFirstDate.month - 1].substring(0, 3)}`
    const lastDateFormat = `${getDayName(selectedLastDate.year, selectedLastDate.month, selectedLastDate.day)} ${selectedLastDate.day} ${monthNames[selectedLastDate.month - 1].substring(0, 3)}`

    return `${firstDateFormat} - ${lastDateFormat}`
  };

  const handleCanAccept = () => {
    return selectedFirstDate || nightsSliderPage
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => setVisible(false)}
      onSwipeComplete={() => setVisible(false)}
      useNativeDriver
      useNativeDriverForBackdrop
      backdropTransitionOutTiming={200}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View
        style={{ backgroundColor: theme.secondary }}
        className={`flex rounded-t-lg ${nightsSliderPage ? "h-[60%]" : "h-[85%]"}`}
      >
        <View className="px-5 py-3 border-b border-gray-200" style={{position: "relative"}}>
          <ThemedText className="text-lg font-semibold text-center">
            Wybierz daty
          </ThemedText>
          <TouchableOpacity onPress={handleNightsSliderPage} style={{position: "absolute", top: 12, right: 12}}>
            {canSelectNights && 
              (
                <Ionicons
                    name={nightsSliderPage ? "calendar" : "sunny"}
                    size={25}
                    color={"white"}
                  />
              )
            }
          </TouchableOpacity>

          <ThemedText className="text-sm text-center mt-1 opacity-70">
            {!nightsSliderPage ? formatDateRange() : formatNightRange()}
          </ThemedText>
        </View>
        
        {
          !nightsSliderPage ? (
            <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
              <TouchableOpacity activeOpacity={1}>
                <Calendar 
                  className="mt-5"
                  onDateChange={handleDateChange}
                />
              </TouchableOpacity>
              <View style={{height: 50}} />
            </ScrollView>
          ) 
          : 
          (
            <View className="w-[85%] mx-auto my-auto pb-[20%]">
              <ThemedText className="text-center font-bold">
                Select nights amount
              </ThemedText>
              <RangeSlider
                range={nights}
                minimumValue={1}
                maximumValue={7}
                step={1}
                minimumRange={0}
                outboundColor={theme.buttonTextColor}
                inboundColor={theme.buttonFocusedBorderColor}
                thumbTintColor={theme.buttonFocusedBorderColor}
                crossingAllowed={true}
                trackHeight={8}
                thumbSize={20}
                onValueChange={(range) => {
                  setNights(range);
                }}
              />
              <ThemedText className="text-center">
                {formatNightRange()}
              </ThemedText>
            </View>
          )
        }

        <TouchableOpacity 
          activeOpacity={0.4} 
          className="w-[44%] h-[45px] rounded-xl absolute bottom-7 left-5 justify-center" 
          style={{backgroundColor: "white"}}
          onPress={handleCancel}
        >
          <Text className="text-center text-lg text-neutral-950">Anuluj</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          activeOpacity={0.4} 
          className={`w-[44%] h-[45px] rounded-xl absolute bottom-7 right-5 justify-center ${
            !handleCanAccept() ? 'opacity-50' : 'opacity-100'
          }`}
          style={{
            backgroundColor: handleCanAccept() 
              ? theme.buttonFocusedBorderColor 
              : theme.buttonFocusedBorderColor + '80'
          }}
          onPress={handleAccept}
          disabled={!handleCanAccept()}
        >
          <ThemedText className="text-center text-lg">Accept</ThemedText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default CalendarModal;