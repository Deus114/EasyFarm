import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import ScheduleList from '../home/ScheduleList';
import Background from '../../components/common/Background';
import Icon from 'react-native-vector-icons/Ionicons';
import { authAccountApi } from '../../service/apiService';
const ScheduleScreen = ({ navigation }) => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    const fetchUserID = async () => {
      try {
              let accountRes = await authAccountApi();
              console.log("Account", accountRes, accountRes?.statusCode)
              if (accountRes && accountRes?.statusCode == 200) {
                let userId = accountRes.data.user.id;
                console.log("User ID", userId)
                setUserId(userId);
                // try {
                //   let sensorRes = await sensorsApi(userId);
                //   console.log("Sensor", sensorRes)
                //   if (sensorRes && sensorRes?.statusCode == 200) {
                //     setSensors(sensorRes.data);
                //   }
                // } catch (error) {
                //   throw error;
                // }
              }
            } catch (error) {
              throw error;
            }
      // try {
      //   let id = await AsyncStorage.getItem('userID');
      //   setUserId(id);
      //   console.log(id);
      // } catch (error) {
      //   throw error;
      // }
    }
    fetchUserID();
  }, []);
  return (
    <>
      <SafeAreaView className='flex-1'>
        <View className='w-full h-full'>
          <Background />
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
            </TouchableOpacity>
            <Text style={styles.header}>YOUR SCHEDULES</Text>
            <View style={{ width: 30 }} />
          </View>
          <ScrollView className='flex px-4 h-full z-10' style={{ flex: 1 }}>
            {userId && <ScheduleList userId={userId} navigation={navigation} maxItems={0} />}
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

export default ScheduleScreen