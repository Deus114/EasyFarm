import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
const Summary = () => {
  return (
    <>
    <View className='sm:flex sm:flex-row sm:justify-between m-2'>
        <View className="h-[109px] w-full sm:w-[40%] px-2 bg-gray-200 flex flex-row text-center mb-3">
            <Text className='w-[40%] text-[16px]'>
                Overall Temperature
            </Text>
            <View className='w-[20%] bg-gray-500 aspect-square'>

            </View>
            <Text className="text-[40px] w-[40%]">
                25°C
            </Text>
        </View>
        <View className="h-[109px] w-full sm:w-[40%] px-2 bg-gray-200 flex flex-row text-center mb-3">
            <Text className='w-[40%] text-[16px]'>
                Overall Temperature
            </Text>
            <View className='w-[20%] bg-gray-500 aspect-square'>

            </View>
            <Text className="text-[40px] w-[40%]">
                25°C
            </Text>
        </View>
    </View>
    </>
  )
}

export default Summary