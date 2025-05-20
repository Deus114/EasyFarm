import React, { useState, useEffect } from 'react'
import {
    View,
    Text
} from 'react-native';
import { schedulesApi } from '../../service/apiService';
const ScheduleList = ({userId}) => {
  const [scheduleList,setscheduleList] = useState([]);
  useEffect(()=>{
        const fetchScheduleID = async() => {
            try {
            let scheduleRes = await schedulesApi(userId);
            console.log(scheduleRes)
            if (scheduleRes && scheduleRes?.statusCode == 200) {
                setscheduleList(scheduleRes.data);
            }
            } catch (error) {
                throw error;
            }
        }
        fetchScheduleID();
    },[])
  return (
    <>
    {scheduleList.map((data,index)=>(
    <View key={index} className='w-full flex flex-row justify-between flex-wrap'>
        <View className='w-full sm:w-[48%] h-[120px] flex-row flex p-[10px] rounded-xl bg-[#DFF1E6] mb-2'>
            <Text className='text-[20px] w-[40%] rounded-l-full font-semibold'>
            {(() => {
              switch (data.repeatType) {
                case 'DAILY':
                  return 'Mỗi ngày';
                case 'WEEKLY':
                  return 'Mỗi tuần';
                case 'MONTHLY':
                  return 'Mỗi tháng';
                default:
                  return 'Unknown status';
              }
            })()}
            </Text>
            <Text className='text-[15px] w-[60%] rounded-r-full font-semibold'>{data.description}</Text>
        </View>
    </View>
    ))}
    </>
    
  )
}

export default ScheduleList