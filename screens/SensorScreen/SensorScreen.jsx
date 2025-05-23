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
import SensorCard from './SensorCard';
import { authAccountApi, sensorsApi } from '../../service/apiService';
const initialSensors = [
  {
    description: 'Loading...',
    id: 1,
    img: 'https://via.placeholder.com/50',
    name: "DHT22",
    serialNumber: "123456",
    status: 'ACTIVE',
    type: "TEMPERATURE",
  },
];

export default function SensorsScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sensors, setSensors] = useState(initialSensors);
  const [loading, setLoading] = useState(true);
  const [selectedSensor, setSelectedSensor] = useState(null);

    useEffect(() => {
        const fetchUserID = async () => {
            try {
                let accountRes = await authAccountApi();
                console.log("Account", accountRes, accountRes?.statusCode)
                if (accountRes && accountRes?.statusCode == 200) {
                    let userId = accountRes.data.user.id;
                    console.log("User ID", userId)
                    try {
                        let sensorRes = await sensorsApi(userId);
                        console.log("Sensor", sensorRes)
                        if (sensorRes && sensorRes?.statusCode == 200) {
                            setSensors(sensorRes.data);
                        }
                    } catch (error) {
                        throw error;
                    }
                }
            } catch (error) {
                throw error;
            }
        }
        fetchUserID();
    }, []);

  const filteredSensors = sensors.filter(sensor =>
    sensor.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const closeModal = () => setSelectedSensor(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>YOUR SENSORS</Text>

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
          <Icon name="options-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Sensors List */}
      <ScrollView style={styles.scrollView}>
        {filteredSensors.map(sensor => (
          <SensorCard key={sensor.id} sensor={sensor} onPress={setSelectedSensor} />
        ))}
      </ScrollView>

      {/* Add Button */}
      <TouchableOpacity style={styles.addButton}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

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
                  <Text style={styles.modalName}>{selectedSensor.name}</Text>
                  <View style={styles.modalDetail}>
                    <Text style={styles.modalLabel}>Name:</Text>
                    <Text style={styles.modalValue}>{selectedSensor.name}</Text>
                  </View>
                  <View style={styles.modalDetail}>
                    <Text style={styles.modalLabel}>Date Added:</Text>
                    <Text style={styles.modalValue}>{selectedSensor.dateAdded}</Text>
                  </View>
                  <View style={styles.modalDetail}>
                    <Text style={styles.modalLabel}>Status:</Text>
                    <Text style={styles.modalValue}>
                      {selectedSensor.status === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
                    </Text>
                  </View>
                  <View style={styles.modalDetail}>
                    <Text style={styles.modalLabel}>Category:</Text>
                    <View style={styles.modalTypes}>
                      {/* {selectedSensor.types.map((type, index) => (
                        <Icon
                          key={index}
                          name={
                            type === 'TEMPERATURE'
                              ? 'thermometer-outline'
                              : type === 'humidity'
                              ? 'water-outline'
                              : type === 'light'
                              ? 'sunny-outline'
                              : 'location-outline'
                          }
                          size={20}
                          color="#4CAF50"
                        />
                      ))} */}
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.historyButton}>
                  <Text style={styles.historyText}>History Report</Text>
                </TouchableOpacity>
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
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
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 80,
    right: 16,
    backgroundColor: '#4CAF50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 100,
    height: 100,
    borderRadius: 50,
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
  historyButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  historyText: {
    color: '#fff',
    fontWeight: '600',
  },
});