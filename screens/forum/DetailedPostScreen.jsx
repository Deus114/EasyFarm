import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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

const DetailedPostScreen = ({ navigation, route }) => {
  const { postId } = route.params;
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  // Mock data based on initialPosts and adding comments
  useEffect(() => {
    const selectedPost = initialPosts.find(p => p.id === postId);
    setPost(selectedPost);

    // Mock comments
    const mockComments = [
      { id: '1', text: 'Comment 1', timestamp: 'Today', img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png' },
      { id: '2', text: 'Comment 2', timestamp: 'Today', img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png' },
      { id: '3', text: 'Comment 3', timestamp: 'Today', img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png' },
    ];
    setComments(mockComments);
  }, [postId]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.header}>Post</Text>
      </View>

      {/* Post Content */}
      {post && (
        <ScrollView style={styles.contentContainer}>
          <Text style={styles.timestamp}>{post.timestamp}</Text>
          <Text style={styles.title}>{post.title}</Text>
          {/* <Image source={{ uri: post.img }} style={styles.image} /> */}
          <Text style={styles.content}>{post.content}</Text>

          {/* Comments Section */}
          <Text style={styles.commentsHeader}>Comments</Text>
          {comments.map(comment => (
            <View key={comment.id} style={styles.commentContainer}>
              <Image source={{ uri: comment.img }} style={styles.commentImage} />
              <View style={styles.commentTextContainer}>
                <Text style={styles.commentTimestamp}>{comment.timestamp}</Text>
                <Text style={styles.commentText}>{comment.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    flex: 1,
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
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  commentsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 10,
    marginBottom: 10,
  },
  commentImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentTextContainer: {
    flex: 1,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#666',
  },
  commentText: {
    fontSize: 14,
    color: '#333',
  },
});

export default DetailedPostScreen;