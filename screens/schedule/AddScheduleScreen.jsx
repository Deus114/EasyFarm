import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Background from '../../components/common/Background';
import Icon from 'react-native-vector-icons/Ionicons';
import ChooseMode from './ChooseMode';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAccountApi, postScheduleApi } from '../../service/apiService';
import LoadingOverlay from '../../components/loading'
const AddScheduleScreen = ({ navigation }) => {
  const [loading,setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState('Day');
  const [description, setDescription] = useState('');
  const [hour, setHour] = useState('00');
  const [minute, setMinute] = useState('00');
  const [repeatDays, setrepeatDays] = useState([]);
  const [error, setError] = useState(null);
  const [userID, setUserId] = useState(null);
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        let accountRes = await authAccountApi();
        console.log("Account", accountRes, accountRes?.statusCode)
        if (accountRes && accountRes?.statusCode == 200) {
          let userId = accountRes.data.user.id;
          console.log("User ID", userId)
          setUserId(userId);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchUserID();
  }, [])
  
  const onSubmit = async () => {
    setLoading(true);
    if (title == '' || description == '') {
      setError('Title and Description must be filled!')
      setLoading(false);
      return;
    }
    let data = {
      "userId": userID,
      "title": title,
      "description": description,
      "startTime": `${hour}:${minute}`,
      "isActive": true
    }
    console.log(data);
    console.log(mode);
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
    console.log('trying')
    try {
      console.log('abc')
      let scheduleRes = await postScheduleApi(data);
      console.log(scheduleRes)
      if (scheduleRes && scheduleRes?.statusCode == 201) {
        console.log(scheduleRes.data.id);
        navigation.navigate('Schedule');
      }
    } catch (error) {
      throw error;
    }
    setLoading(false)
  }
  return (
    <View className='w-full h-full'>
      <LoadingOverlay visible={loading}/>
      <Background />
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
          <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.header}>YOUR SCHEDULES</Text>
        <View style={{ width: 30 }} />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView className='flex px-4 h-full mt-[20px] z-10'>
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
      </KeyboardAvoidingView>

    </View>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Distribute space to position Add button on the right
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 20,
  },
})

export default AddScheduleScreen