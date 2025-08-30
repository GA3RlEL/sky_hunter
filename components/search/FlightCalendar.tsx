import { View, Text, Pressable, useColorScheme } from 'react-native'
import React, { useState } from 'react'

//components
import ThemedText from '../themed/ThemedText';
import CalendarModal from '../calendar/CalendarModal';

//types
import { DaySelected } from '../../types/DaySelected';
import { SelectedDates } from '../../types/SelectedDate';

//hooks
import { useDate } from '../../hooks/useDate';

//constants
import { Colors } from '../../constant/Colors';
import { monthNames } from '../../constant/Dates';

interface FlightCalendarProps {
    title?: string,
    placeholder?: string,
    visible: boolean,
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectedDates: SelectedDates,
    handleDateSelect: (first: DaySelected | null, last: DaySelected | null) => void;  
    canSelectNights?: boolean
    onNightChange?: (nights: [number, number]) => void;
    nights?: [number, number];
}

const FlightCalendar = ({title, placeholder, visible, setVisible, selectedDates, handleDateSelect, canSelectNights, onNightChange, nights} : FlightCalendarProps) => {
    const scheme = useColorScheme();
    const theme = Colors[scheme!] ?? Colors.light;

    const { getDayName } = useDate();

    const formatNightRange = () => {
        if (!nights) return false;
        if (nights[0] === 0 && nights[0] === 0) return false;

        const range = nights[0] === nights[1] ? `${nights[0]}` : `${nights[0]} - ${nights[1]}`;
        const count = nights[0] === nights[1] ? nights[0] : Math.abs(nights[1] - nights[0]);
        return `${range} night${count === 1 ? '' : 's'}`;
    }

    const formatDateRange = () => {
        if (!selectedDates?.start) return (placeholder || "");
        
        if (!selectedDates.end) {
            const firstDateFormat = `${getDayName(selectedDates.start.year, selectedDates.start.month, selectedDates.start.day)} ${selectedDates.start.day} ${monthNames[selectedDates.start.month - 1].substring(0, 3)}`
            return firstDateFormat
        }

        const firstDateFormat = `${getDayName(selectedDates.start.year, selectedDates.start.month, selectedDates.start.day)} ${selectedDates.start.day} ${monthNames[selectedDates.start.month - 1].substring(0, 3)}`
        const lastDateFormat = `${getDayName(selectedDates.end.year, selectedDates.end.month, selectedDates.end.day)} ${selectedDates.end.day} ${monthNames[selectedDates.end.month - 1].substring(0, 3)}`

        return `${firstDateFormat} - ${lastDateFormat}`
    };

    const formatText = () => {
        const dateText = formatDateRange();
        if (dateText !== (placeholder || "")) {
            return dateText;
        }
        
        const nightText = formatNightRange();
        if (nightText) {
            return nightText;
        }
        
        return placeholder || "";
    }
    
    return (
        <>
            <ThemedText>{title || ""}</ThemedText>
            <Pressable 
                onPress={() => setVisible(true)} 
                className="rounded-lg h-10 w-full items-center justify-center" 
                style={{backgroundColor: theme.secondary}}
            >
                <Text style={{color: theme.buttonTextColor}}>
                    {formatText()}
                </Text>
            </Pressable>

            <CalendarModal
                visible={visible}
                setVisible={setVisible}
                onDateSelect={handleDateSelect}
                canSelectNights={canSelectNights}
                onNightChange={onNightChange}
            />
        </>
    )
}

export default FlightCalendar