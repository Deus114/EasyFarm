import React, {useState} from 'react'
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
import HeaderSearchBar from '../HeaderSearchBar';
const ScheduleScreen = () => {
  const [filter,setFilter] = useState('');
  const [userId, setUserId] = useState(null);
  useEffect(()=>{
        const fetchUserID = async() => {
            try {
                let accountRes = await authAccountApi();
                console.log(accountRes)
                if (accountRes && accountRes?.statusCode == 200) {
                    setUserId(accountRes.data.user.id);
                    AsyncStorage.setItem('userID',userId);
                }
            } catch (error) {
                throw error;
            }
        }
        fetchUserID();
  },[]);
  return (
    <>
      <View className='w-full'>
          <Background/>
          <EFHeader name={"Schedules"} inputOn={true} onInputData={setFilter}/>
          <ScrollView className='flex px-4'>
              <View className='h-[150px]'/>
              {userId && <ScheduleList userId = {userId}/>}
          </ScrollView>
          <View className = 'bottom-[40px] right-[40px] fixed'>
            <TouchableOpacity>
              <Icon className='ml-auto' name="add-circle" size={50} color="#4CAF50" />
            </TouchableOpacity> 
          </View>
      </View>
    </>
    
    
  )
}

export default ScheduleScreen