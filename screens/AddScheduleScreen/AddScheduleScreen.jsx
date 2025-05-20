import React, { useState } from 'react'
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
import ChooseMode from './ChooseMode';
import Daily from './Daily';
import Weekly from './Weekly';
import Monthly from './Monthly';

const AddScheduleScreen = () => {
  const [mode, setMode] = useState('Day');
  return (
    <View className='w-full h-full'>
        <Background/>
        <EFHeader name={"Add Schedule"}/>
        <ScrollView className='flex px-4 h-full'>
            <View className='h-[90px]'/>
            <ChooseMode handleMode={setMode}/>
            {(() => {
            switch (mode) {
              case 'Day':
                return <Daily/>;
              case 'Week':
                return <Weekly/>;
              case 'Month':
                return <Monthly/>;
            }
            })()}
        </ScrollView>
    </View>
  )
}

export default AddScheduleScreen