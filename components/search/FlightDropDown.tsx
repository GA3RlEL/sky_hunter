import { useColorScheme } from 'react-native'
import DropDownPicker, { ThemeNameType } from "react-native-dropdown-picker";
import React from 'react'

import ThemedText from '../themed/ThemedText';
import { Colors } from '../../constant/Colors';

interface FlightDropDownProps {
  title?: string,
  placeholder?: string,
  disabled: boolean,
  open: boolean,
  values: string[],
  items: any,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: (value: any) => void;
  zIndex: number,
  zIndexInverse: number,
}

const FlightDropDown = ({title, placeholder, disabled, open, values, items, setOpen, setValue, zIndex, zIndexInverse} : FlightDropDownProps) => {
  const scheme = useColorScheme();
  const theme = Colors[scheme!] ?? Colors.light;
  
  return (
    <>
      <ThemedText>{title || ""}</ThemedText>
      <DropDownPicker
        mode="BADGE"
        multiple={true}
        disabled={disabled}
        open={open}
        value={values}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder={placeholder || ""}
        theme={scheme?.toUpperCase() as ThemeNameType}
        style={{ 
          backgroundColor: theme.secondary, 
          borderWidth: 0 
        }}
        dropDownContainerStyle={{
          backgroundColor: theme.secondary,
          borderWidth: 0,
        }}
        listParentLabelStyle={{fontWeight: "bold"}}
        listChildContainerStyle={{ paddingLeft: 0, marginLeft: 20 }}
        zIndex={zIndex}
        zIndexInverse={zIndexInverse}
        badgeDotColors={[theme.buttonFocusedBorderColor]}
      />
    </>
  )
}

export default FlightDropDown