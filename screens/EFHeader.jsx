import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { notificationsAPI } from '../service/apiService';

const EFHeader = ({ name, inputOn = false, onInputData, userId, navigation, logout }) => {
  const [notificationOn, setNotifications] = useState(false);
  const [search, setSearch] = useState('');
  const [notificationData, setNotificationData] = useState([]);
  useEffect(() => {
    console.log('abc');
    const fetchNotifications = async () => {
      try {
        let notificationsRes = await notificationsAPI(userId);
        console.log(notificationsRes)
        if (notificationsRes && notificationsRes?.statusCode == 200) {
          setNotificationData(notificationsRes.data);
        }
      } catch (error) {
        throw error;
      }
    }
    fetchNotifications();
  }, [])
  return (
    <>
      {notificationOn &&
        <View className='fixed w-full h-full bg-gray-800/50 z-20'>
        </View>
      }
      <View className='fixed w-full top-[40px] z-30'>
        <View className='flex-row justify-between items-center mt-[10px] mb-[-20px] mx-[20px]'>
          <View className='text-[26px] font-bold text-[#4CAF50]'>{name}</View>
          <View className='flex-row'>
              {logout && <TouchableOpacity onPress={() => navigation.navigate('Login')} className='bg-green-100 rounded-full mr-[20px]'>
                  <Icon name="log-out-outline" size={40} color="#4CAF50" />
                </TouchableOpacity>}
              <TouchableOpacity onPress={() => setNotifications(!notificationOn)} className='bg-green-100 rounded-full '>
                <Icon name="notifications-outline" size={40} color="#4CAF50" />
                {(notificationData.length != 0) && <Text className='fixed bg-white rounded-full font-semibold w-[20px] h-[20px] text-[15px] text-center text-red-500'>{notificationData.length}</Text>}
              </TouchableOpacity> 
          </View>
        </View>
        <View className='flex-row w-full justify-between'>
          {inputOn &&
            <>
              <TextInput
                className='flex-grow h-[50px] bg-[#DFF1E6] rounded-full flex z-0 px-[12px]'
                placeholder="Search..."
                placeholderTextColor="#999"
                value={search}
                inlineImageLeft='search_icon'
                onChangeText={(value) => { setSearch(value), onInputData(value) }}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setNotifications(!notificationOn)} className='h-[50px] w-[50px] rounded-full ml-2 flex-shrink-0 z-10'>
                <Icon name="options-outline" size={50} color="#4CAF50" />
              </TouchableOpacity>
            </>
          }
          {notificationOn &&
            <View className='w-[50%] fixed right-[0px] top-[100px]'>
              {notificationData.length === 0 ? (
                <View className='w-full ml-auto border-b bg-[#4CAF50] h-[50px] rounded-xl p-[5px]'>
                  <Text className='font-semibold'>Hiện tại không có thông báo nào!</Text>
                </View>
              ) : (
                notificationData.map((data, index) => (
                  <View key={index} className='w-full ml-auto border-b bg-[#4CAF50] h-[50px] rounded-xl p-[5px]'>
                    <Text className='font-semibold'>{data}</Text>
                  </View>
                ))
              )}
            </View>
          }
        </View>

      </View>
    </>
  )
}
export default EFHeader