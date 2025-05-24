import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PostCard = ({ post }) => {
  return (
    <View style={styles.postCard}>
      <Text style={styles.cardTitle}>{post.title}</Text>
      <Text style={styles.cardContentSnippet}>
        {post.content.length > 200 ? `${post.content.slice(0, 200)}...` : post.content}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  postCard: {
    width: '100%',
    height: 100, // Increased height to accommodate vertical layout
    background: 'linear-gradient(45deg, #E0F7E0 50%, #E0E0E0 50%)',
    borderRadius: 20,
    padding: 10,
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