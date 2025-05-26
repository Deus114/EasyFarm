import React from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const Categories = ({navigation}) => {
    const categories = ['Overall','Sensor','Schedule','Forum'];
    const icons = ['analytics-outline','build','calendar','text']
    return (
        <>
        <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Categories</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='p-[10px]'>
        {categories.map((name,index)=>(
            <TouchableOpacity key={index} onPress={() => navigation.navigate(name)} className='h-[48px] w-[189px] rounded-full place-content-center flex flex-row bg-[#DFF1E6] m-[5px]'>
                <View className='h-[48px] w-[48px] rounded-full bg-gray-200 flex-none justify-center'>
                    <Icon className='mx-auto' name={icons[index]} size={40} color="#4CAF50" />
                </View>
                <View className='ml-2 flex-grow h-[48px] text-center place-content-center'>
                    <Text className='font-semibold inline text-[22px]'>{name}</Text>
                </View>
            </TouchableOpacity>           
        ))
        }
        </ScrollView>
        </>
    )
}
export default Categories