import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import ScheduleList from '../HomeScreen/ScheduleList';
import EFHeader from '../EFHeader';
import Background from '../Background';
import Icon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';

const Daily = () => {
const [hour, setHour] = useState('00');
const [minute, setMinute] = useState('00');
const [description, setDescription] = useState('00');
    return (
        <>
        <View className='w-full mt-[20px] flex-row h-[50px] overflow-visible justify-between'>
            <View className='h-full'>
                <Text className='font-bold text-[22px] my-auto'>
                Start at
                </Text>
            </View>
            <View className='w-[50%] h-full flex-row overflow-visible justify-between'>
                <TextInput
                    className='w-[45%] h-[50px] bg-[#DFF1E6] rounded-full px-[12px]'
                    placeholder="Hour"
                    placeholderTextColor="#999"
                    value={hour}
                    onChangeText={(value)=>{setHour(value)}}
                    keyboardType="numeric"
                    maxLength={2}
                />
                <View className='w-[10%] h-full items-center'>
                    <Text className='my-auto'>:</Text>
                </View>
                <TextInput
                    className='w-[45%] h-[50px] bg-[#DFF1E6] rounded-full px-[12px]'
                    placeholder="Minute"
                    placeholderTextColor="#999"
                    value={minute}
                    onChangeText={(value)=>{setMinute(value)}}
                    keyboardType="numeric"
                    maxLength={2}
                />
            </View>
        </View>
        <View className='w-full mt-[20px] h-[50px]'>
            <View className='h-full'>
                <Text className='font-bold text-[22px] my-auto'>
                Description
                </Text>
            </View>
        </View>
        <View className='w-full mt-[20px]'>
            <TextInput
                className='w-full h-[100px] bg-[#DFF1E6] rounded-xl p-4'
                placeholder="Description"
                placeholderTextColor="#999"
                value={description}
                multiline={true}
                numberOfLines={4}
                onChangeText={(value)=>{setDescription(value)}}
                keyboardType="text"
            />
        </View>
        </>
    
  )
}

export default Daily