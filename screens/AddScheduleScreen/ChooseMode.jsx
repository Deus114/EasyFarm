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

const ChooseMode = ({handleMode}) => {
    const [choosing, setChoosing] = useState(false);
    const [mode, setMode] = useState('Day');
    return (
        <View className='w-full flex-row h-[50px] overflow-visible justify-between z-10'>
            <View className='h-full'>
                <Text className='font-bold text-[22px] my-auto'>
                Repeat Every
                </Text>
            </View>
            <View className='w-[50%] h-full overflow-visible'>
                {!choosing && 
                <TouchableOpacity onPress={()=>setChoosing(true)} className='w-full flex-shrink flex-row h-[50px] justify-center rounded-full bg-[#DFF1E6]'>
                    <Text className='font-bold text-[22px] my-auto'>
                    {mode}
                    </Text>
                </TouchableOpacity>
                }
                {choosing && 
                <View className='h-full overflow-visible'>
                <TouchableOpacity onPress={()=>{setChoosing(false);setMode('Day');handleMode('Day')}} className='w-full flex-row h-[50px] justify-center rounded-t-full bg-[#DFF1E6]'>
                    <Text className='font-bold text-[22px] my-auto'>
                    Day
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setChoosing(false);setMode('Week');handleMode('Week')}} className='w-full flex-row h-[50px] justify-center bg-[#DFF1E6]'>
                    <Text className='font-bold text-[22px] my-auto'>
                    Week
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{setChoosing(false);setMode('Month');handleMode('Month')}} className='w-full flex-row h-[50px] justify-center rounded-b-full bg-[#DFF1E6]'>
                    <Text className='font-bold text-[22px] my-auto'>
                    Month
                    </Text>
                </TouchableOpacity>
                </View>
                }
            </View>
        </View>
    )
}

export default ChooseMode