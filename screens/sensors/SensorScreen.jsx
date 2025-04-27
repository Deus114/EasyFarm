import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { LinearTransition } from 'react-native-reanimated';

import SensorCard from './SensorCard';

const sensors = [
    {
      id: 'dht20',
      title: 'DHT20',
      image: require('../../assets/sensor_dht20.png'),
      icons: [
        { library: 'ionicons', name: 'thermometer-outline' },
        { library: 'material', name: 'water-percent' },
      ],
    },
    // ... more sensors
];

export default function SensorScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Your Sensors</Text>
                <TouchableOpacity>
                    <Icon name="notifications-outline" size={24} color="#4CAF50" />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#999" />
                <TextInput placeholder="Search.." style={styles.searchInput} />
                <TouchableOpacity>
                    <Icon name="options-outline" size={20} color="#4CAF50" />
                </TouchableOpacity>
            </View>

            <ScrollView>
                <View style={{ padding: 16 }}>
                    {sensors.map(sensor => (
                        <SensorCard
                        key={sensor.id}
                        imageSource={sensor.image}
                        title={sensor.title}
                        icons={sensor.icons}
                        onPress={() => navigation.navigate('SensorDetail', { id: sensor.id })}
                        style={{ backgroundColor: '#F5F5F5' }}
                        iconColor="#4CAF50"
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
    header: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    searchContainer: {
        marginVertical: 16,
        backgroundColor: '#F0F0F0',
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 8,
        marginLeft: 10,
    },
    newsContainer: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    newsBox: {
        backgroundColor: '#E8F5E9',
        height: 150,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sectionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    viewAll: {
        color: '#4CAF50',
        fontWeight: '600',
    },
    categoryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    categoryItem: {
        backgroundColor: '#4CAF50',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        width: 120,
    },
    categoryText: {
        color: '#fff',
        marginTop: 10,
        fontWeight: 'bold',
    },
});