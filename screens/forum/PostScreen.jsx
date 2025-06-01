import { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAllPostsApi } from '../../service/apiService';
import PostCard from './PostCard';
import { useFocusEffect } from '@react-navigation/native';

export default function PostScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPost();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchPost(); // gọi lại mỗi lần focus vào màn hình
    }, [])
  );

  const fetchPost = async () => {
    try {
      const postData = await getAllPostsApi();
      if (postData && postData?.data) {
        console.log("Fetch post data success");
        setPosts(postData.data);
      }
    } catch (error) {
      console.error('Error fetching post details:', error);
    }
  };

  const handleAddPress = () => {
    // Add functionality for the "Add" button here
    console.log('Add button pressed');
    navigation.navigate('AddPost');
  };

  return (
    <SafeAreaView className='flex-1'>
      <View className='w-full h-full top-[40px] z-30'>
        {/* Header with Back Button and Add Button */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
          </TouchableOpacity>
          <Text style={styles.header}>Post</Text>
          <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
            <Icon name="add-outline" size={30} color="#4CAF50" />
          </TouchableOpacity>
        </View>

        {/* Thread Content */}
        {posts ? (
          <ScrollView style={styles.scrollView}>
            {posts.map((post, index) => (
              <View style={styles.threadContentContainer}
                key={index}
              >
                <PostCard
                  post={post}
                  navigation={navigation}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    marginLeft: 10,
    flex: 1, // Allow title to take remaining space
    textAlign: 'center', // Center the title
  },
  addButton: {
    marginLeft: 'auto', // Push the button to the right
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
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