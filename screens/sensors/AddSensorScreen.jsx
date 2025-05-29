import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AddSensorCard from './AddSensorCard';
import { authAccountApi, addSensorApi } from '../../service/apiService';

// Hardcoded sensor data
const hardcodedSensors = [
  {
    description: 'DHT20',
    name: 'DHT20',
    img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
    serialNumber: "123456",
    type: 'TEMPERATURE',
    powerSupply: '10-30V DC',
    temperatureRange: '-40 to 80°C',
    humidityRange: '0-100% RH',
    accuracy: '±0.5°C / ±3% RH',
  },
  {
    description: 'LIGHT',
    name: 'Light Sensor',
    img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
    serialNumber: "123456",
    type: 'LIGHT',
    powerSupply: '10-30V DC',
    temperatureRange: '-40 to 80°C',
    humidityRange: '0-100% RH',
    accuracy: '±0.5°C / ±3% RH',
  },
  {
    description: 'GPS',
    name: 'AT6668',
    img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
    serialNumber: "123456",
    type: 'GPS',
    powerSupply: '10-30V DC',
    temperatureRange: '-40 to 80°C',
    humidityRange: '0-100% RH',
    accuracy: '±0.5°C / ±3% RH',
  },
  {
    description: 'Humidity',
    name: 'Humidity Sensor',
    img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
    serialNumber: "123456",
    type: 'HUMIDITY',
    powerSupply: '10-30V DC',
    temperatureRange: '-40 to 80°C',
    humidityRange: '0-100% RH',
    accuracy: '±0.5°C / ±3% RH',
  },
];

export default function AddSensorScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSensor, setSelectedSensor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [customName, setCustomName] = useState('');
  const [error, setError] = useState('')
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        let accountRes = await authAccountApi();
        console.log("Account", accountRes, accountRes?.statusCode)
        if (accountRes && accountRes?.statusCode == 200) {
          setUserId(accountRes.data.user.id);
          console.log("User ID", userId)
        }
      } catch (error) {
        throw error;
      }
    }
    fetchUserID();
  }, []);

  const filteredSensors = hardcodedSensors.filter(sensor =>
    sensor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeModal = () => {
    setSelectedSensor(null);
    setCustomName('');
  };

  const handleAddSensor = async () => {
    console.log(selectedSensor)
    if (selectedSensor) {
      let sensorToAdd = {
        description: selectedSensor.description,
        img: selectedSensor.img,
        name: customName ? customName.trim() : selectedSensor.name,
        serialNumber: "123456",
        status: 'ACTIVE',
        type: selectedSensor.type,
      }
      console.log('Adding sensor:', { ...sensorToAdd });
      // Here you would typically add the sensor to a state or send it to an API
      // name, serialNumber, img, type, description, userID
      let res = await addSensorApi(
        sensorToAdd.name,
        sensorToAdd.serialNumber,
        sensorToAdd.img,
        sensorToAdd.type,
        sensorToAdd.description,
        userId,
      )
      console.log("Gay", res);
      closeModal();
      if (res && res?.statusCode == 201) {
        navigation.navigate('Sensor');
      } else setError(res?.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.header}>ADD SENSOR</Text>
        <View style={{ width: 30 }} />
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity>
          <Icon name="settings-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Sensors List */}
      <ScrollView style={styles.scrollView}>
        {filteredSensors.map((sensor, index) => (
          <AddSensorCard
            key={index}
            sensor={sensor}
            onPress={() => setSelectedSensor(sensor)}
          />
        ))}
      </ScrollView>

      {/* Modal Overlay */}
      <Modal
        visible={!!selectedSensor}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Icon name="close" size={24} color="#FF0000" />
            </TouchableOpacity>
            {selectedSensor && (
              <>
                <Image source={{ uri: selectedSensor.img }} style={styles.modalImage} />
                <View style={styles.modalInfo}>
                  <View style={styles.modalDetail}>
                    <TextInput
                      style={styles.customNameInput}
                      placeholder={selectedSensor.name}
                      value={customName}
                      onChangeText={setCustomName}
                    />
                  </View>
                  <Text style={styles.modalName}>{selectedSensor.name}</Text>
                  <View style={styles.modalDetail}>
                    <Text style={styles.modalLabel}>Power Supply:</Text>
                    <Text style={styles.modalValue}>{selectedSensor.powerSupply}</Text>
                  </View>
                  <View style={styles.modalDetail}>
                    <Text style={styles.modalLabel}>Range:</Text>
                    <Text style={styles.modalValue}>{selectedSensor.temperatureRange}</Text>
                  </View>
                  <View style={styles.modalDetail}>
                    <Text style={styles.modalLabel}>Range:</Text>
                    <Text style={styles.modalValue}>{selectedSensor.humidityRange}</Text>
                  </View>
                  <View style={styles.modalDetail}>
                    <Text style={styles.modalLabel}>Accuracy:</Text>
                    <Text style={styles.modalValue}>{selectedSensor.accuracy}</Text>
                  </View>
                  <View style={styles.modalDetail}>
                    <Text style={styles.modalLabel}>Category:</Text>
                    <View style={styles.modalTypes}>
                      <Icon
                        name={
                          selectedSensor.type === 'TEMPERATURE' ? 'thermometer-outline'
                            : selectedSensor.type === 'HUMIDITY' ? 'water-outline'
                              : selectedSensor.type === 'LIGHT' ? 'sunny-outline'
                                : selectedSensor.type === 'GPS' ? 'location-outline'
                                  : 'help-circle-outline'
                        }
                        size={20}
                        color="#4CAF50"
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.addButton} onPress={() => {
                    handleAddSensor()
                  }}>
                    <Text>Add This Sensor</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
    marginTop: 20,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7E0',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#888',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  modalInfo: {
    marginBottom: 10,
  },
  modalName: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalDetail: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  modalLabel: {
    fontWeight: '600',
    marginRight: 5,
  },
  modalValue: {
    flex: 1,
  },
  modalTypes: {
    flexDirection: 'row',
  },
  customNameInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    padding: 5,
    backgroundColor: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginLeft: 5,
  },
});