import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAllPostsApi } from '../../service/apiService';
import PostCard from './PostCard';

const initialPosts = [
    {
      id: 1,
      title: 'Best Practices for Tech Startups',
      content: 'Starting a tech company in 2025 can be challenging. What strategies have worked for you? I’ve been focusing on agile development and customer feedback loops, but I’d love to hear other perspectives. For example, how do you balance innovation with financial stability in the early stages? What tools do you use for project management?',
    },
    {
      id: 2,
      title: 'AI Ethics Discussion',
      content: 'With AI becoming more integrated into daily life, how do we ensure ethical usage? I’m particularly concerned about privacy and bias in machine learning models. Thoughts? Should there be global regulations, or should it be handled at a company level? What are some practical steps we can take?',
    },
    {
      id: 3,
      title: 'Favorite Coding Tools in 2025',
      content: 'What tools are you using for development this year? I’ve been loving the latest VS Code updates and some new AI-powered debugging tools. Share your favorites! I’m also curious about any new frameworks that have gained popularity in 2025.',
    },
    {
      id: 4,
      title: 'Future of Remote Work',
      content: 'How will remote work evolve in the coming years? With advancements in VR and AI, do you think we’ll see fully virtual offices? What challenges do you foresee? I think collaboration tools will need to improve significantly to support this shift.',
    },
];

export default function PostScreen({ navigation }) {
  const [posts, setPosts] = useState(initialPosts);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getAllPostsApi();
        if (postData && postData?.status == 200) {
            console.log("Fetch post data success");
            // if (postData.data.size() > 0) {
            //     setPosts(postData.data);
            // }
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    };
    fetchPost();
  },);

  const handleAddPress = () => {
    // Add functionality for the "Add" button here
    console.log('Add button pressed');
    navigation.navigate('CreatePost');
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button and Add Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.header}>Thread Details</Text>
        <TouchableOpacity onPress={handleAddPress} style={styles.addButton}>
          <Icon name="add-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Thread Content */}
      {posts ? (
        <ScrollView style={styles.scrollView}>
            {posts.map(post => (
                <View style={styles.threadContentContainer}>
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