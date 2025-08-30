import React from "react";
import { createContext, useState } from "react";
import { dayNames } from "../constant/Dates";

interface DateContextType {
    getDaysInMonth: (year: number, month: number) => number;
    getFirstDayInMonth: (year: number, month: number) => number;
    getDayName: (year: number, month: number, day: number) => string;
    formatDate: (year: number, month: number, day: number) => string;
}

export const DateContext = createContext<DateContextType | undefined>(undefined)

export const DateProvider = ({children} : {children: React.ReactNode}) => {

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate() // ostatni dzien przed month + 1
    }

    const getFirstDayInMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    }

    const getDayName = (year: number, month: number, day: number) => {
        return dayNames[new Date(year, month - 1, day).getDay()];
    }

    const formatDate = (year: number, month: number, day: number) => {
        return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
    }

    return (
        <DateContext.Provider value={{getDaysInMonth, getFirstDayInMonth, getDayName, formatDate}}>
            {children}
        </DateContext.Provider>
    )
}