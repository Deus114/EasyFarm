import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAccountApi, sensorsApi } from '../../service/apiService';
import EFHeader from '../EFHeader';
import Categories from './Categories';
import Summary from './Summary';
import SensorsList from './SensorsList';
import ScheduleList from './ScheduleList';
import Background from '../Background';
import ForumList from './ForumList';

export default function HomeScreen({ navigation }) {
    const [userId, setUserId] = useState(null);
    useEffect(()=>{
        const fetchUserID = async() => {
            try {
                let accountRes = await authAccountApi();
                console.log(accountRes)
                if (accountRes && accountRes?.statusCode == 200) {
                    setUserId(accountRes.data.user.id);
                    await AsyncStorage.setItem('userID',accountRes.data.user.id);
                }
            } catch (error) {
                throw error;
            }
        }
        fetchUserID();
    },[]);
    return (
        <SafeAreaView className="h-full bg-white">
        {/* Background Circle */}
        <Background/>
        <EFHeader name={"EasyFarm"} userId={userId} navigation={navigation}/>
        {/* <View className='fixed rounded-full w-[150%] aspect-square bg-[#CAEBBE] -translate-x-1/2 translate-y-1/4 -z-10'></View> */}
        <ScrollView className='flex px-4 mt-[80px]'>
            {/* Categories */}
            <Categories/>
            {/* Summary */}
            <View className="flex flex-row justify-between w-full">
                <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Summary</Text>
            </View>
            <Summary/>
            {/* Sensors */}
            <View className="flex flex-row justify-between w-full">
                <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Sensors</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('ViewSensor')}>
                    <Text  className='text-gray-500 text-[22px] font-semibold mt-5 underline-offset-1'>View All</Text>
                </TouchableOpacity>
            </View>
            {/* Sensor list */}
            {userId && <SensorsList userId = {userId} navigation={navigation} />}
            {/* Schedule */}
            <View className="flex flex-row justify-between w-full">
                <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Schedule</Text>
                <TouchableOpacity onPress={()=>navigation.navigate('Schedule')}>
                    <Text className='text-gray-500 text-[22px] font-semibold mt-5 underline-offset-1'>View All</Text>
                </TouchableOpacity>
            </View>
            {userId && <ScheduleList userId = {userId} navigation={navigation} maxItems = {4} />}
            {/* Forum */}
            <View className="flex flex-row justify-between w-full">
                <Text className="text-[#505050] text-[22px] font-semibold mt-5">Forum</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Forum')}>
                    <Text className="text-gray-500 text-[22px] font-semibold mt-5 underline-offset-1">View All</Text>
                </TouchableOpacity>
            </View>
            {userId && <ForumList userId={userId} navigation={navigation} maxItems={4} />}
        </ScrollView>
        </SafeAreaView>
    );
}
