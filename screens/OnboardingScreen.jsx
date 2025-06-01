import React, { useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    Image,
    Animated,
    TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const slides = [
    {
        id: '1',
        title: 'Cảm biến',
        description: 'Các thiết bị cảm biến luôn có sẵn giúp bạn dễ dàng tìm được thứ bạn cần.',
        image: require('../assets/onboard1.png'),
    },
    {
        id: '2',
        title: 'Cộng đồng',
        description: 'Mọi thắc mắc của bạn đều có cộng đồng hỗ trợ.',
        image: require('../assets/onboard2.png'),
    },
    {
        id: '3',
        title: 'Nhắc hẹn',
        description: 'Lên lịch nhắc nhở việc chăm sóc vườn ở bất cứ đâu.',
        image: require('../assets/onboard3.png'),
    },
];

const OnboardingScreen = ({ navigation }) => {
    const scrollX = useRef(new Animated.Value(0)).current;

    const handleFinish = async () => {
        await AsyncStorage.setItem('hasLaunched', 'true');
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={styles.container}>
            {/* Fixed Title */}
            <View style={styles.header}>
                <Text style={styles.logo}>EasyFarm</Text>
            </View>

            {/* Swipeable Slides */}
            <Animated.FlatList
                data={slides}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                renderItem={({ item }) => (
                    <View style={styles.slide}>
                        <Image source={item.image} style={styles.image} />
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.desc}>{item.description}</Text>
                    </View>
                )}
            />

            {/* Fixed Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={handleFinish}>
                    <Text style={styles.buttonText}>Get Started</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { alignItems: 'center', marginTop: 60 },
    logo: { fontSize: 26, fontWeight: 'bold', color: '#4CAF50' },
    slide: {
        width: width,
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        color: '#333',
    },
    desc: {
        textAlign: 'center',
        marginTop: 10,
        color: '#666',
        paddingHorizontal: 20,
    },
    footer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
