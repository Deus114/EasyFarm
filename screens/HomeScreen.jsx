import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { authAccountApi, sensorsApi } from '../service/apiService';
export default function HomeScreen({ navigation }) {
    const [sensorList, setSensorList] = useState([]);
    useEffect(() => {
        const fetchUserID = async () => {
            try {
                let accountRes = await authAccountApi();
                console.log(accountRes)
                if (accountRes && accountRes?.statusCode == 200) {
                    let userId = accountRes.data.user.id;
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
            } catch (error) {
                throw error;
            }
        }
        fetchUserID();
    }, []);
    return (
        <View style={{ flex: 1 }}>
            {/* Background Circle */}
            <View
                style={[
                    StyleSheet.absoluteFillObject,
                    {
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: -1,
                    },
                ]}
            >
                <View
                    style={{
                        width: '150%',
                        aspectRatio: 1,
                        backgroundColor: '#CAEBBE',
                        borderRadius: 9999,
                        transform: [{ translateY: 100 }],
                    }}
                />
            </View>
            <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.logo}>EasyFarm</Text>
                    <TouchableOpacity>
                        <Icon name="notifications-outline" size={24} color="#4CAF50" />
                    </TouchableOpacity>
                </View>
                {/* Categories */}
                <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Categories</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} className='p-[10px]'>
                    <View className='h-[48px] w-[189px] rounded-full place-content-center flex flex-row bg-[#DFF1E6]'>
                        <View className='h-[48px] w-[48px] rounded-full bg-gray-200 flex-none'></View>
                        <View className='ml-2 flex-grow h-[48px] text-center place-content-center'>
                            <Text className='font-semibold inline text-[22px]'>Overall</Text>
                        </View>
                    </View>
                </ScrollView>
                {/* Summary */}
                <View className="flex flex-row justify-between w-full">
                    <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Summary</Text>
                    <Text className='text-gray-500 text-[22px] font-semibold mt-5 underline-offset-1'>View All</Text>
                </View>
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
                {/* Sensors */}
                <View className="flex flex-row justify-between w-full">
                    <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Sensors</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('ViewSensors')}>
                        <Text className='text-gray-500 text-[22px] font-semibold mt-5 underline-offset-1'>View All</Text>
                    </TouchableOpacity>
                </View>
                {/* Sensor list */}
                <View className='flex flex-row flex-wrap justify-between'>
                    {/* Sensor Items */}
                    {sensorList.map((data, index) => (
                        <View className='w-[48%] md:w-[30%] aspect-[4/5] border mb-2 bg-white'>
                            <View className='w-full md:w-30% aspect-[16/13] bg-gray-200'>

                            </View>
                            <View className="flex flex-row justify-between w-full p-2">
                                <Text className='text-[#505050] text-[22px] font-semibold place-content-center'>{data.name}</Text>
                                <Text className='text-gray-500 text-[22px] font-semibold underline-offset-1 place-content-center'>25°C</Text>
                            </View>
                        </View>
                    ))}
                </View>
                {/* Schedule */}
                <View className="flex flex-row justify-between w-full">
                    <Text className='text-[#505050] text-[22px] font-semibold mt-5'>Schedule</Text>
                    <Text className='text-gray-500 text-[22px] font-semibold mt-5 underline-offset-1'>View All</Text>
                </View>
                <View className='w-full flex flex-row justify-between flex-wrap'>
                    <View className='w-full sm:w-[48%] h-[80px] flex flex-row justify-center rounded-xl bg-[#DFF1E6] mb-2'>
                        <Text className='text-[25px] w-[30%] rounded-l-full'>Today</Text>
                        <Text className='text-[15px] w-[60%] rounded-r-full'>Water the Coffee Garden At 3PM Water the Coffee </Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
    header: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    searchContainer: {
        marginVertical: 16,
        backgroundColor: '#F0F0F0',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        marginLeft: 10,
    },
    newsContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    newsBox: {
        backgroundColor: '#E8F5E9',
        height: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    viewAll: {
        color: '#4CAF50',
        fontWeight: '600',
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    categoryItem: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: 120,
    },
    categoryText: {
        color: '#fff',
        marginTop: 10,
        fontWeight: 'bold',
    },
});