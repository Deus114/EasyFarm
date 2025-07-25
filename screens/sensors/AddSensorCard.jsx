import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const AddSensorCard = ({ sensor, onPress }) => {
  const icons = {
    TEMPERATURE: 'thermometer-outline',
    HUMIDITY: 'water-outline',
    LIGHT: 'sunny-outline',
    GPS: 'location-outline',
  };

  const getTypeIcon = () => {
    return <Icon name={icons[sensor.type] || 'help-circle-outline'} size={20} color="#4CAF50" style={styles.typeIcon} />;
  };

  return (
    <TouchableOpacity onPress={() => { console.log("A"); onPress(sensor) }}>
      <View style={styles.sensorCard}>
        <Image source={{ uri: sensor.img }} style={styles.sensorImage} />
        <View style={styles.sensorInfo}>
          <Text style={styles.sensorName}>{sensor.name}</Text>
          <View style={styles.sensorTypes}>{getTypeIcon()}</View>
        </View>
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

export default AddSensorCard;