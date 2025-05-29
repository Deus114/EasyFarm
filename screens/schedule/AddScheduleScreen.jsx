import React, { useState } from 'react'
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
import ChooseMode from './ChooseMode';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postScheduleApi } from '../../service/apiService';

const AddScheduleScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState('Day');
  const [description, setDescription] = useState('');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [repeatDays, setrepeatDays] = useState([]);
  const [error, setError] = useState(null);
  const onSubmit = async () => {
    if(title == '' || description == '') 
      {
        setError('Title and Description must be filled!')
        return;
      }
    let data = {
      "userId": parseInt(await AsyncStorage.getItem('userID')),
      "title": title,
      "description": description,
      "startTime": `${hour}:${minute}`,
      "isActive": true
    }
    switch (mode) {
      case 'Day':
        data.repeatType = "DAILY"
        console.log(data);
        break;
      case 'Week':
        data.repeatType = "WEEKLY"
        data.repeatDays = []
        for (let i = 0; i < repeatDays.length; i++) {
          if (repeatDays[i] == true) data.repeatDays.push(i + 1);
        }
        console.log(data);
        break;
      case 'Month':
        data.repeatType = "MONTHLY"
        data.repeatDates = []
        for (let i = 0; i < repeatDays.length; i++) {
          if (repeatDays[i] == true) data.repeatDates.push(i + 1);
        }
        console.log(data);
        break;
    }
    try {
      let scheduleRes = await postScheduleApi(data);
      console.log(scheduleRes)
      if (scheduleRes && scheduleRes?.statusCode == 201) {
        console.log(scheduleRes.data.id);
        navigation.navigate('Schedule')
      }
    } catch (error) {
      throw error;
    }
  }
  return (
    <View className='w-full h-full'>
      <Background />
      <EFHeader name={"Add Schedule"} navigation={navigation} />
      <ScrollView className='flex px-4 h-full mt-[90px] z-10'>
        <ChooseMode handleMode={setMode} />
        {(() => {
          switch (mode) {
            case 'Day':
              return <Daily onTitleChange={setTitle} onDescriptionChange={setDescription} onHourChange={setHour} onMinuteChange={setMinute} />;
            case 'Week':
              return <Weekly onTitleChange={setTitle} onDescriptionChange={setDescription} onHourChange={setHour} onMinuteChange={setMinute} onDateChange={setrepeatDays} />;
            case 'Month':
              return <Monthly onTitleChange={setTitle} onDescriptionChange={setDescription} onHourChange={setHour} onMinuteChange={setMinute} onDateChange={setrepeatDays} />;
          }
        })()}
        {error && <Text className='text-[#ef4444] mb-12 text-[20px] font-semibold'>{error}</Text>}
        <View className='w-full justify-end flex-row'>
          <TouchableOpacity className='bg-[#16a34a] py-[12px] rounded-lg mt-[16px] mr-[24px] px-[20px]' onPress={() => onSubmit()}>
            <Text className='text-[26px] font-semibold text-white'>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

export default AddScheduleScreen