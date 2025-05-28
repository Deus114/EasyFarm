import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Summary = () => {
    return (
        <>
            <View className='sm:flex sm:flex-row sm:justify-between m-2'>
                <View className="h-[109px] w-full sm:w-[40%] px-2 bg-gray-300 rounded-xl flex flex-row text-center mb-3">
                    <Text className='w-[40%] text-[16px] text-center my-auto font-semibold'>
                        Overall Temperature
                    </Text>
                    <View className='w-[20%] h-full justify-center'>
                        <Icon name="thermometer-outline" size={50}></Icon>
                    </View>
                    <Text className="text-[40px] w-[40%] font-bold text-center my-auto">
                        25°C
                    </Text>
                </View>
                <View className="h-[109px] w-full sm:w-[40%] px-2 bg-gray-300 rounded-xl flex flex-row text-center mb-3">
                    <Text className='w-[40%] text-[16px] text-center my-auto font-semibold'>
                        Overall Humidity
                    </Text>
                    <View className='w-[20%] h-full justify-center'>
                        <Icon name="water-outline" size={50}></Icon>
                    </View>
                    <Text className="text-[40px] w-[40%] font-bold text-center my-auto">
                        25°C
                    </Text>
                </View>
            </View>
        </>
    )
}

export default Summary