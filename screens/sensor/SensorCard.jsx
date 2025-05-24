import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const SensorCard = ({ sensor, onPress }) => {
  // const getTypeIcons = () => {
  //   const icons = {
  //     temperature: 'thermometer-outline',
  //     humidity: 'water-outline',
  //     light: 'sunny-outline',
  //     gps: 'location-outline',
  //   };
  //   return sensor.types.map((type, index) => (
  //     <Icon key={index} name={icons[type]} size={20} color="#4CAF50" style={styles.typeIcon} />
  //   ));
  // };

  return (
    <TouchableOpacity onPress={() => {console.log("A"); onPress(sensor)}}>
      <View style={styles.sensorCard}>
        <Image source={{ uri: sensor.img }} style={styles.sensorImage} />
        <View style={styles.sensorInfo}>
          <Text style={styles.sensorName}>{sensor.name}</Text>
          {/* <View style={styles.sensorTypes}>{getTypeIcons()}</View> */}
        </View>
        <View
          style={[
            styles.statusDot,
            { backgroundColor: sensor.status === 'ACTIVE' ? '#4CAF50' : '#FF0000' },
          ]}
        />
      </View>
    </TouchableOpacity> 
  );
};

const styles = StyleSheet.create({
  sensorCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  sensorImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  sensorInfo: {
    flex: 1,
  },
  sensorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  sensorTypes: {
    flexDirection: 'row',
    marginTop: 4,
  },
  typeIcon: {
    marginRight: 8,
  },
  statusDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
});

export default SensorCard;