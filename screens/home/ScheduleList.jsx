import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { schedulesApi } from '../../service/apiService';
import Icon from 'react-native-vector-icons/Ionicons';
const ScheduleList = ({ userId, navigation, maxItems }) => {
  const [scheduleList, setscheduleList] = useState([]);
  const [scheduleShowed, setScheduleShowed] = useState([])
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null);
  useEffect(() => {
    const fetchScheduleUserID = async () => {
      try {
        let scheduleRes = await schedulesApi(userId);
        console.log(scheduleRes)
        if (scheduleRes && scheduleRes?.statusCode == 200) {
          setscheduleList(scheduleRes.data);
          //Handle về page
          if (maxItems) {
            contentLength = scheduleRes.data.length;
            if (contentLength > maxItems) contentLength = maxItems
            setScheduleShowed(scheduleRes.data.slice(0, contentLength));
          }
          else {
            contentLength = scheduleRes.data.length;
            numbermaxPage = Math.ceil(contentLength / 10);
            setMaxPage(numbermaxPage);
            setScheduleShowed(scheduleRes.data.slice(0, 10));
            console.log(`showed ${numbermaxPage}`)
          }
        }
      } catch (error) {
        throw error;
      }
    }
    fetchScheduleUserID();
  }, [])
  const onPageChange = async (pageIdx) => {
    console.log(pageIdx);
    min = (pageIdx - 1) * 10;
    max = scheduleList.length < (pageIdx * 10) ? scheduleList.length : pageIdx * 10;
    console.log(`${min} ${max}`)
    await setScheduleShowed(scheduleList.slice(min, max));
  }
  return (
    <>
      <View className='w-full flex flex-row justify-between flex-wrap'>
        {scheduleShowed && scheduleShowed.map((data, index) => (
          <TouchableOpacity onPress={() => navigation.navigate('ScheduleDetails', { id: data.id })} key={index} className='w-full sm:w-[48%]'>
            <View className='w-full h-[120px] flex-row flex p-[10px] rounded-xl bg-[#DFF1E6] mb-2'>
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
          </TouchableOpacity>
        ))}
      </View>
      {!maxItems && <View className='h-[50px] mx-auto flex-row'>
        <TouchableOpacity onPress={() => {
          if (page > 1) {
            setPage(page - 1);
            onPageChange(page - 1);
          }
        }}>
          <Icon name="arrow-back-circle" size={50} className='mx-[10px]' color="#4CAF50" />
        </TouchableOpacity>
        <View className='h-[50px] w-[50px] rounded-full bg-[#DFF1E6] mx-[10px]'>
          <Text className='text-[26px] font-semibold text-black text-center my-auto'>{page}</Text>
        </View>
        <Text className='text-[26px] font-semibold text-black text-center my-auto'>/</Text>
        {maxPage && <View className='h-[50px] w-[50px] rounded-full bg-[#4CAF50] mx-[10px]'>
          <Text className='text-[26px] font-semibold text-white text-center my-auto'>{maxPage}</Text>
        </View>}
        <TouchableOpacity onPress={() => {
          if (page < maxPage) {
            setPage(page + 1);
            onPageChange(page + 1);
          }
        }}>
          <Icon name="arrow-forward-circle" size={50} className='mx-[10px]' color="#4CAF50" />
        </TouchableOpacity>
      </View>}
    </>
  )
}

export default ScheduleList