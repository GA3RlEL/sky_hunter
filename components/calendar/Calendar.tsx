import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import ThemedText from '../themed/ThemedText'
import { dayNames, monthNames } from '../../constant/Dates'
import { useDate } from '../../hooks/useDate';

interface CalendarProps {
    className?: string,
    onDateChange?: (firstDate: DaySelectedType | null, lastDate: DaySelectedType | null) => void,
}

interface MonthType {
  days: DayType[],
  month: number,
  year: number,
}

interface DayType {
  day: number | null,
  key: string,
  selected?: boolean,
}

interface DaySelectedType {
  day: number,
  month: number,
  year: number,
}

const Calendar = ({className, onDateChange} : CalendarProps) => {
    const {getDaysInMonth, getFirstDayInMonth} = useDate();
    
    const actuallDate = new Date();
    
    const actuallYear = actuallDate.getFullYear();
    const actuallMonth = actuallDate.getMonth();
    const actuallDay = actuallDate.getDate();

    const [firstDaySelected, setFirstDaySelected] = useState<DaySelectedType | null>(null)
    const [lastDaySelected, setLastDaySelected] = useState<DaySelectedType | null>(null)

    useEffect(() => {
      if (onDateChange) {
        onDateChange(firstDaySelected, lastDaySelected);
      }
    }, [firstDaySelected, lastDaySelected, onDateChange]);
    
    const initalizeMonths = () => {
      const months: MonthType[] = [];

      for (let m = actuallMonth; m <= 11; m++) {
        const initialDays: DayType[] = []

        for (let i = 0; i < getFirstDayInMonth(actuallYear, m); i++) {
            initialDays.push({day: null, key: `null-${i}`})
        }

        for (let day = 1; day <= getDaysInMonth(actuallYear, m); day++) {
            initialDays.push({day: day, key: `day-${day}`, selected: false});
        }

        months.push({ days: initialDays, year: actuallYear, month: m });
      }
      return months;
    }

    const [months, setMonths] = useState<MonthType[]>(initalizeMonths)

    const handleSelectDay = (monthIndex: number, dayItem: DayType) => {
      if (dayItem.day == null) return;
      if (months[monthIndex].month === actuallMonth && dayItem.day < actuallDay) return;

      const clickedDate: DaySelectedType = { 
        day: dayItem.day, 
        month: months[monthIndex].month + 1,
        year: actuallYear 
      };

      const selectFirstDate = (date: DaySelectedType) => {
        setFirstDaySelected(date);
        setMonths(prevMonths =>
          prevMonths.map((monthData, index) =>
            index === monthIndex
              ? {
                  ...monthData,
                  days: monthData.days.map(day =>
                    day.key === dayItem.key
                      ? { ...day, selected: true }
                      : day
                  ),
                }
              : monthData
          )
        );
      }

      if (!firstDaySelected && !dayItem.selected) {
        selectFirstDate(clickedDate);
        return;
      }

      if (!lastDaySelected && !dayItem.selected && firstDaySelected) {
        const firstDateNumber = firstDaySelected.year * 10000 + firstDaySelected.month * 100 + firstDaySelected.day;
        const clickedDateNumber = clickedDate.year * 10000 + clickedDate.month * 100 + clickedDate.day;

        let startDate = firstDaySelected;
        let endDate = clickedDate;

        if (clickedDateNumber < firstDateNumber) {
          startDate = clickedDate;
          endDate = firstDaySelected;
        }

        setFirstDaySelected(startDate);
        setLastDaySelected(endDate);

        setMonths(prevMonths =>
          prevMonths.map((monthData) => ({
            ...monthData,
            days: monthData.days.map(day => {
              if (day.day == null) return day;
              
              const currentDateNumber = monthData.year * 10000 + (monthData.month + 1) * 100 + day.day;
              const startDateNumber = startDate.year * 10000 + startDate.month * 100 + startDate.day;
              const endDateNumber = endDate.year * 10000 + endDate.month * 100 + endDate.day;
              
              const inRange = currentDateNumber >= startDateNumber && currentDateNumber <= endDateNumber;
              
              return inRange ? { ...day, selected: true } : day;
            }),
          }))
        );

        return;
      }

      if (firstDaySelected) {
        setMonths(prevMonths =>
          prevMonths.map(monthData => ({
            ...monthData,
            days: monthData.days.map(day => ({
              ...day,
              selected: false
            }))
          }))
        );
      }

      setFirstDaySelected(null);
      setLastDaySelected(null);
      selectFirstDate(clickedDate);
    };


    const renderDay = (monthIndex: number) => ({item} : {item : DayType}) => ( // 14.28%, bo 100% / 7 dni ~= 14.28%
          <Pressable 
            className={`w-[14.28%] h-12 justify-center items-center`} 
            onPress={() => handleSelectDay(monthIndex, item)}
            > 
              {item.day != null ? 
              (<View className={`${item.selected ? "w-8 h-8 pl-1 rounded-xl bg-blue-400 justify-center items-center" : ""}`}>
                <Text className={`text-base ${months[monthIndex].month === actuallMonth && item.day < actuallDay ? "text-gray-400" : "text-white"}`}>{item.day} </Text></View>
              ) : <Text></Text>}
          </Pressable>
      )

    const renderMonth = ({item, index} : {item : MonthType, index: number}) => (
      <View className={className}>

        <ThemedText className="text-center mt-3 font-bold">
            {monthNames[item.month] || "N/A"} {item.year}
        </ThemedText>

        <View className="flex-row mt-2">
          {dayNames.map((dayName, index) => (
            <View
              key={index}
              className="w-[14.28%] h-8 justify-center items-center"
            >
              <ThemedText className="font-bold text-lg">{dayName}</ThemedText>
            </View>
          ))}
        </View>

        <FlatList
          data={item.days}
          renderItem={renderDay(index)}
          keyExtractor={(item) => item.key}
          scrollEnabled={false}
          numColumns={7}
        />
      </View>
    );

    return (
      <FlatList
        data={months}
        renderItem={renderMonth}
        keyExtractor={(item, index) => `month-${item.month}-${index}`}
        scrollEnabled={false}
        nestedScrollEnabled
      />
    );
}

export default Calendar