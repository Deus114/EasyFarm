import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAllPostsApi } from '../../service/apiService';
import PostCard from './PostCard';

export default function ForumScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const postData = await getAllPostsApi();
      if (postData && postData?.data) {
        setPosts[postData.data];
      }
    };
    fetchPost();
  }, []);

  const handleAddPress = () => {
    // Add functionality for the "Add" button here
    console.log('Add button pressed');
    navigation.navigate('AddPost');
  };

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
        <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
          <Icon name="add-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {posts.length > 0 ? (
        <ScrollView style={styles.scrollView}>
          <Text>1</Text>
          {posts.map((post, index) => (
            <View style={styles.threadContentContainer}
              key={index}
            >
              <Text>{post.content}</Text>
              <PostCard
                post={post}
                navigation={navigation}
              />
            </View>
          ))}
        </ScrollView>
      ) : (
        <View>
        </View>
      )}
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
  threadContentContainer: {
    backgroundColor: '#E0F7E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 5,
  },
  threadContent: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
});