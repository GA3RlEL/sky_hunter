import { View, Text } from 'react-native'
import React, { useState } from 'react'
import ThemedButton from '../../components/themed/ThemedButton'
import { Ionicons } from '@expo/vector-icons';

const Search = () => {
  const [focused, setFocused] = useState(false);

  return (
    <View className='flex-1 items-center justify-center'>
      <ThemedButton text='Search Flights' onPress={() => setFocused(!focused)} isFocused={focused} className='p-4 rounded-lg flex flex-row items-center justify-center'
        icon={"search"}
        >

      </ThemedButton>
    </View>
  )
}

export default Search