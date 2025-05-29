import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getPostApi } from '../../service/apiService';

const DetailedPostScreen = ({ navigation, route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchPost = async () => {
    try {
      console.log(postId)
      const response = await getPostApi(postId);
      if (response && response?.data) {
        setPost(response.data);
      } else {
        console.warn('Failed to fetch post details');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
          </TouchableOpacity>
          <Text style={styles.header}>Post Detail</Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4CAF50" />
          </View>
        ) : post ? (
          <ScrollView style={styles.contentContainer}>
            <Text style={styles.timestamp}>
              {new Date(post.createdAt).toLocaleDateString()}
            </Text>
            <Text style={styles.title}>{post.title}</Text>
            <Text style={styles.content}>{post.content}</Text>
          </ScrollView>
        ) : (
          <View style={styles.loadingContainer}>
            <Text style={{ color: '#888' }}>Post not found.</Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  wrapper: {
    flex: 1,
    paddingTop: 40,
    marginBottom: 60
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#E0F7E0',
    borderRadius: 20,
    margin: 16,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
    marginBottom: 20
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DetailedPostScreen;

