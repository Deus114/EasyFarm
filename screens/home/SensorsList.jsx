import React, { useEffect, useState } from 'react'
import {
    View,
    Text
} from 'react-native';
import { sensorsApi } from '../../service/apiService';

const SensorsList = ({ userId, navigation }) => {
    const [sensorList, setSensorList] = useState([]);
    useEffect(() => {
        const fetchSensorID = async () => {
            try {
                let sensorRes = await sensorsApi(userId);
                console.log(sensorRes)
                if (sensorRes && sensorRes?.statusCode == 200) {
                    setSensorList(sensorRes.data);
                }
            } catch (error) {
                throw error;
            }
        }
        fetchSensorID();
    }, [])
    return (
        <View className='flex flex-row flex-wrap justify-between'>
            {/* Sensor Items */}
            {sensorList.map((data, index) => (
                <View className='w-[48%] md:w-[30%] aspect-[4/5] border mb-2 bg-white' key={index}>
                    <View className='w-full md:w-30% aspect-[16/13] bg-gray-200'>

                    </View>
                    <View className="flex flex-row justify-between w-full p-2">
                        <Text className='text-[#505050] text-[22px] font-semibold place-content-center'>{data.name}</Text>
                        <Text className='text-gray-500 text-[22px] font-semibold underline-offset-1 place-content-center'>25°C</Text>
                    </View>
                </View>
            ))}
        </View>
    )
}

export default SensorsList