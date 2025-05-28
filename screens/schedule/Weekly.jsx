import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import ScheduleList from '../home/ScheduleList';
import EFHeader from '../EFHeader';
import Background from '../../components/common/Background';
import Icon from 'react-native-vector-icons/Ionicons';

const Weekly = ({ data, onTitleChange, onHourChange, onMinuteChange, onDescriptionChange, onDateChange }) => {
    const [title, setTitle] = useState('');
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');
    const [DoW, setDoW] = useState([false, false, false, false, false, false, false]);
    const sevenDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const [description, setDescription] = useState('');
    useEffect(() => {
        if (data) {
            setTitle(data.title)
            setHour(data.startTime.substring(0, 2))
            setMinute(data.startTime.substring(3, 5))
            setDescription(data.description)
            const tempDoW = [false, false, false, false, false, false, false];
            for (let i = 0; i < data.repeatDays.length; i++) {
                tempDoW[data.repeatDays[i]] = true; // Thay đổi giá trị trên bản sao

            }
            setDoW(tempDoW);
        }
    }, [])

    return (
        <>
            <View className='w-full mt-[20px] h-[50px]'>
                <View className='h-full'>
                    <Text className='font-bold text-[22px] my-auto'>
                        Title
                    </Text>
                </View>
            </View>
            <View className='w-full mt-[20px]'>
                <TextInput
                    className='w-full h-[50px] bg-[#DFF1E6] rounded-xl p-4'
                    placeholder="Description"
                    placeholderTextColor="#999"
                    value={title}
                    onChangeText={(value) => { setTitle(value); onTitleChange(value) }}
                    keyboardType="text"
                    editable={data == null}
                />
            </View>
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
                        onChangeText={(value) => { setHour(value); onHourChange(value) }}
                        keyboardType="numeric"
                        editable={data == null}
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
                        onChangeText={(value) => { setMinute(value); onMinuteChange(value) }}
                        keyboardType="numeric"
                        editable={data == null}
                        maxLength={2}
                    />
                </View>
            </View>
            <View className='w-full mt-[20px] h-[50px]'>
                <View className='h-full'>
                    <Text className='font-bold text-[22px] my-auto'>
                        Repeat on
                    </Text>
                </View>
            </View>
            <View className='w-full flex-row mt-[20px] justify-between'>
                {
                    DoW.map((isActive, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                const newDoW = [...DoW]; // Tạo bản sao của mảng
                                newDoW[index] = !isActive; // Thay đổi giá trị trên bản sao
                                setDoW(newDoW); // Cập nhật state với mảng mới
                                onDateChange(newDoW);
                            }}
                            className={`w-[10%] mx-2 my-2 aspect-square rounded-full ${isActive ? 'bg-[#4CAF50]' : 'bg-[#DFF1E6]'
                                }`}
                            disabled={data != null}
                        >
                            <Text className='my-auto text-center'>{sevenDays[index]}</Text>
                        </TouchableOpacity>
                    ))
                }
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
                    onChangeText={(value) => { setDescription(value); onDescriptionChange(value) }}
                    keyboardType="text"
                    editable={data == null}
                />
            </View>
        </>

    )
}

export default Weekly