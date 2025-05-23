import React, {useState,useEffect} from 'react'
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
import Background from '../Background';
import Icon from 'react-native-vector-icons/Ionicons';
import { authAccountApi } from '../../service/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';
const ScheduleScreen = ({navigation}) => {
  const [filter,setFilter] = useState('');
  const [userId, setUserId] = useState(null);
  useEffect(()=>{
    const fetchUserID = async() => {
        try {
          id = await AsyncStorage.getItem('userID',userId);
          setUserId(id);
        } catch (error) {
            throw error;
        }
    }
    fetchUserID();
  },[]);
  return (
    <>
      <View className='w-full h-full'>
          <Background/>
          <EFHeader name={"Schedules"} navigation={navigation}/>
          <ScrollView className='flex px-4 mt-[90px] h-full' style={{flex:1}}>
              {userId && <ScheduleList userId = {userId} navigation={navigation}/>} 
          </ScrollView>
          <View className = 'bottom-[40px] right-[40px] fixed'>
            <TouchableOpacity onPress={()=>navigation.navigate('AddSchedule')}>
              <Icon className='ml-auto' name="add-circle" size={50} color="#4CAF50" />
            </TouchableOpacity> 
          </View>
      </View>
    </>
    
    
  )
}

export default ScheduleScreen