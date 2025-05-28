import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Categories = ({ navigation }) => {
    const categories = ['Sensor', 'Schedule', 'Forum']; // 'Overall'
    const icons = ['analytics-outline', 'build', 'calendar', 'text']
    return (
        <>
            <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Categories</Text>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='p-[10px]'>
                {categories.map((name, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate(name)}
                        className='h-[48px] w-[189px] rounded-full flex flex-row items-center justify-start bg-[#DFF1E6] m-[5px] px-2'
                    >
                        <View className='h-[40px] w-[40px] rounded-full bg-gray-200 justify-center items-center'>
                            <Icon name={icons[index]} size={30} color="#4CAF50" />
                        </View>
                        <Text className='ml-3 font-semibold text-[20px] text-center'>{name}</Text>
                    </TouchableOpacity>
                ))
                }
            </ScrollView>
        </>
    )
}
export default Categories