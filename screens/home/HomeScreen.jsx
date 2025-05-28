import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAccountApi, sensorsApi } from '../../service/apiService';
import EFHeader from '../EFHeader';
import Categories from './Categories';
import Summary from './Summary';
import SensorsList from './SensorsList';
import ScheduleList from './ScheduleList';
import Background from '../../components/common/Background';

export default function HomeScreen({ navigation }) {
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        const fetchUserID = async () => {
            try {
                let accountRes = await authAccountApi();
                console.log(accountRes)
                if (accountRes && accountRes?.statusCode == 200) {
                    setUserId(accountRes.data.user.id);
                    await AsyncStorage.setItem('userID', accountRes.data.user.id);
                }
            } catch (error) {
                throw error;
            }
        }
        fetchUserID();
    }, []);
    return (
        <SafeAreaView className='flex-1'>
            <View className='w-full h-full'>
                <Background />
                <EFHeader name={"EasyFarm"} userId={userId} navigation={navigation} />

                <ScrollView className='flex px-4 mt-[90px] z-10'>
                    {/* Categories */}
                    <Categories navigation={navigation} />

                    {/* Summary */}
                    <View className="flex flex-row justify-between w-full">
                        <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Summary</Text>
                    </View>
                    <Summary />

                    {/* Sensors */}
                    <View className="flex flex-row justify-between w-full">
                        <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Sensors</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Sensor')}>
                            <Text className='text-gray-500 text-[22px] font-semibold mt-5 underline-offset-1'>View All</Text>
                        </TouchableOpacity>
                    </View>
                    {userId && <SensorsList userId={userId} navigation={navigation} />}

                    {/* Schedule */}
                    <View className="flex flex-row justify-between w-full">
                        <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Schedule</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
                            <Text className='text-gray-500 text-[22px] font-semibold mt-5 underline-offset-1'>View All</Text>
                        </TouchableOpacity>
                    </View>
                    {userId && <ScheduleList userId={userId} navigation={navigation} maxItems={4} />}

                    {/* Extra bottom padding to avoid bottom bar */}
                    <View className="h-[50px]" />
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
