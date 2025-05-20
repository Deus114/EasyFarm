import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const EFHeader = ({name,inputOn=false,onInputData}) => {
  const [notificationOn,setNotifications] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  return (
  <>
    {notificationOn &&
      <View className='fixed w-full h-full bg-gray-800/50 z-10'>
      </View>
    }
      
    <View className='fixed w-full top-[40px] z-20'>
      <View className='flex-row justify-between items-center mb-[10px]'>
        <Text className='text-[26px] font-bold text-[#4CAF50]'>{name}</Text>
        <TouchableOpacity onPress={()=>setNotifications(!notificationOn)} className='bg-green-100'>
          <Icon name="notifications-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
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
                onChangeText={(value)=>{setSearch(value),onInputData(value)}}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TouchableOpacity onPress={()=>setNotifications(!notificationOn)} className='h-[50px] w-[50px] rounded-full ml-2 flex-shrink-0 z-0'>
              <Icon name="filter-circle" size={50} color="#4CAF50" />
            </TouchableOpacity>
            </>   
          }
          {notificationOn &&
            <View className='w-[50%] fixed right-[0px]'>
                <View className='w-full ml-auto border-b bg-[#4CAF50] h-[50px] rounded-xl'>
                  <Text>Abc</Text>
                </View>
                <View className='w-full ml-auto border-b bg-[#4CAF50] h-[50px] rounded-xl'>
                  <Text>Abc</Text>
                </View>
            </View>
          }
      </View>
      
    </View>
  </>
  )
}
export default EFHeader