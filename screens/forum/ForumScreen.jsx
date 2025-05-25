import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ForumThreadCard from './ForumThreadCard';

// Hardcoded forum thread data
const hardcodedThreads = [
  {
    id: '1',
    title: 'Cách trồng cây',
    img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
    timestamp: 'May 24, 2025, 3:00 PM',
  },
  {
    id: '2',
    title: 'AI Ethics Discussion',
    img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
    timestamp: 'May 24, 2025, 2:30 PM',
  },
  {
    id: '3',
    title: 'Favorite Coding Tools in 2025',
    img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
    timestamp: 'May 24, 2025, 1:15 PM',
  },
];

export default function ForumScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredThreads = hardcodedThreads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Forum</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search threads..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity>
          <Icon name="settings-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Forum Threads List */}
      <ScrollView style={styles.scrollView}>
        {filteredThreads.map(thread => (
          <ForumThreadCard
            thread={thread}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
});