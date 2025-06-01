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
import ChooseMode from './ChooseMode';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';
import { deleteScheduleApi, pauseScheduleApi, resumeScheduleApi, schedulesIDApi } from '../../service/apiService';

const ScheduleDetails = ({ navigation, route }) => {
  const [data, setData] = useState({});
  const [message, setMessage] = useState(null);
  const [active, setActive] = useState(true);

  const onPause = async () => {
    try {
      let scheduleRes = await pauseScheduleApi(route.params.id);
      console.log(scheduleRes)
      if (scheduleRes && scheduleRes?.statusCode == 200) {
        setMessage(scheduleRes.message);
        setActive(false);
        // navigation.navigate('ScheduleDetails',{id:route.params.id});
      }
    } catch (error) {
      throw error;
    }
  }

  const onResume = async () => {
    try {
      let scheduleRes = await resumeScheduleApi(route.params.id);
      console.log(scheduleRes)
      if (scheduleRes && scheduleRes?.statusCode == 200) {
        setMessage(scheduleRes.message);
        setActive(true);
        // navigation.navigate('ScheduleDetails',{id:route.params.id});
      }
    } catch (error) {
      throw error;
    }
  }

  const onDelete = async () => {
    try {
      let scheduleRes = await deleteScheduleApi(route.params.id);
      console.log(scheduleRes)
      if (scheduleRes && scheduleRes?.statusCode == 200) {
        setData(scheduleRes.data);
        navigation.navigate('Schedule');
      }
    } catch (error) {
      throw error;
    }
  }
  useEffect(() => {
    console.log(route.params.id)
    const fetchScheduleID = async () => {
      try {
        let scheduleRes = await schedulesIDApi(route.params.id);
        console.log(scheduleRes)
        if (scheduleRes && scheduleRes?.statusCode == 200) {
          setData(scheduleRes.data);
          setActive(scheduleRes.data.isActive);
          console.log(data)
        }
      } catch (error) {
        throw error;
      }
    }
    fetchScheduleID();
  }, [])
  return (
    <View className='w-full h-full'>
      <Background />
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
          <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.header}>SCHEDULE DETAIL</Text>
        <View style={{ width: 30 }} />
      </View>
      {data && <ScrollView className='flex px-4 h-full z-10'>
        {(() => {
          switch (data.repeatType) {
            case 'DAILY':
              return <Daily data={data} />;
            case 'WEEKLY':
              return <Weekly data={data} />;
            case 'MONTHLY':
              return <Monthly data={data} />;
          }
        })()}
        <View className='w-full justify-end flex-row'>
          {active ?
            (<TouchableOpacity className='bg-[#16a34a] py-[12px] rounded-lg mt-[16px] mr-[24px] px-[20px] mr-[20px]' onPress={() => onPause()}>
              <Text className='text-[26px] font-semibold text-white'>Stop</Text>
            </TouchableOpacity>)
            :
            (<TouchableOpacity className='bg-[#16a34a] py-[12px] rounded-lg mt-[16px] mr-[24px] px-[20px] mr-[20px]' onPress={() => onResume()}>
              <Text className='text-[26px] font-semibold text-white'>Resume</Text>
            </TouchableOpacity>)
          }
          <TouchableOpacity className='bg-red-500 py-[12px] rounded-lg mt-[16px] mr-[24px] px-[20px]' onPress={() => onDelete()}>
            <Text className='text-[26px] font-semibold text-white'>Delete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>}
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

export default ScheduleDetails