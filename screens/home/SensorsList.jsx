import { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
} from 'react-native';
import { sensorsApi } from '../../service/apiService';

const SensorsList = ({ userId, navigation }) => {
    const [sensorList, setSensorList] = useState([]);

    useEffect(() => {
        const fetchSensorID = async () => {
            try {
                const sensorRes = await sensorsApi(userId);
                if (sensorRes?.statusCode === 200) {
                    setSensorList(sensorRes.data.slice(0, 4)); // Giới hạn 4 phần tử
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchSensorID();
    }, []);

    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {sensorList.map((data, index) => (
                <View
                    key={index}
                    style={{
                        width: '48%',
                        aspectRatio: 4 / 5,
                        borderWidth: 1,
                        borderColor: '#ccc',
                        marginBottom: 8,
                        backgroundColor: '#fff',
                    }}
                >
                    <Image
                        source={{ uri: data.img }}
                        style={{
                            width: '100%',
                            aspectRatio: 16 / 13,
                            backgroundColor: '#e5e5e5',
                        }}
                        resizeMode="cover"
                        onError={(e) => {
                            console.log('Image load error:', e.nativeEvent);
                        }}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 8 }}>
                        <Text style={{ fontSize: 18, color: '#505050', fontWeight: '600' }}>
                            {data.name}
                        </Text>
                        <Text style={{ fontSize: 18, color: '#888', fontWeight: '600' }}>
                            25°C
                        </Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

export default SensorsList;
