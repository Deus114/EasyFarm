import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default function HomeScreen({ navigation }) {
    return (
        <ScrollView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.logo}>EasyFarm</Text>
                <TouchableOpacity>
                    <Icon name="notifications-outline" size={24} color="#4CAF50" />
                </TouchableOpacity>
            </View>

            {/* Search bar */}
            <View style={styles.searchContainer}>
                <Icon name="search-outline" size={20} color="#999" />
                <TextInput placeholder="Search.." style={styles.searchInput} />
                <TouchableOpacity>
                    <Icon name="options-outline" size={20} color="#4CAF50" />
                </TouchableOpacity>
            </View>

            {/* News section */}
            <View style={styles.newsContainer}>
                <Text style={styles.sectionTitle}>News</Text>
                <View style={styles.newsBox}>
                    <MaterialCommunityIcons name="image-area" size={100} color="#4CAF50" />
                </View>
            </View>

            {/* Categories */}
            <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.categoryRow}>
                <TouchableOpacity style={styles.categoryItem}>
                    <MaterialCommunityIcons name="chip" size={30} color="#fff" />
                    <Text style={styles.categoryText}>Sensors</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.categoryItem}>
                    <MaterialCommunityIcons name="account-group" size={30} color="#fff" />
                    <Text style={styles.categoryText}>Forum</Text>
                </TouchableOpacity>
            </View>

            {/* Sensors */}
            <View style={styles.sectionRow}>
                <Text style={styles.sectionTitle}>Sensors</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAll}>View all</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                onPress={async () => {
                    await AsyncStorage.removeItem('hasLaunched');
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Onboarding' }],
                    });
                }}
                style={{ marginTop: 20, padding: 10, backgroundColor: '#ccc', borderRadius: 8 }}
            >
                <Text>Reset Onboarding</Text>
            </TouchableOpacity>
        </ScrollView>
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