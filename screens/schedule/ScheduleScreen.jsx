import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ScheduleList from '../home/ScheduleList';
import EFHeader from '../EFHeader';
import Background from '../../components/common/Background';
import Icon from 'react-native-vector-icons/Ionicons';
import { authAccountApi } from '../../service/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ScheduleScreen = ({ navigation }) => {
  const [filter, setFilter] = useState('');
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchUserID = async () => {
      try {
        let id = await AsyncStorage.getItem('userID');
        setUserId(id);
      } catch (error) {
        throw error;
      }
    }
    fetchUserID();
  }, []);
  return (
    <>
      <SafeAreaView className='flex-1'>
        <View className='w-full h-full'>
          <Background />
          <EFHeader name={"Schedules"} navigation={navigation} />
          <ScrollView className='flex px-4 mt-[90px] h-full z-10' style={{ flex: 1 }}>
            {userId && <ScheduleList userId={userId} navigation={navigation} />}
          </ScrollView>
          <View className='bottom-[160px] right-[40px] absolute z-20'>
            <TouchableOpacity onPress={() => navigation.navigate('AddSchedule')}>
              <Icon className='ml-auto' name="add-circle" size={50} color="#4CAF50" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>


  )
}

export default ScheduleScreen