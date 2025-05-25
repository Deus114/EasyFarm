import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const PostCard = ({ post, navigation }) => {
  const handlePress = () => {
    navigation.navigate('DetailedPost', { postId: post.id }); // Use id
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.postCard}>
      <Text style={styles.cardTitle}>{post.title}</Text>
      <Text style={styles.cardContentSnippet}>
        {post.content.length > 60 ? `${post.content.slice(0, 60)}...` : post.content}
      </Text>
      {/* Placeholder for image if added later */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  postCard: {
    width: '100%',
    height: 100,
    background: 'linear-gradient(45deg, #E0F7E0 50%, #E0E0E0 50%)',
    borderRadius: 20,
    padding: 10,
    marginBottom: 5,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  cardContentSnippet: {
    fontSize: 14,
    color: '#666',
  },
});

export default PostCard;