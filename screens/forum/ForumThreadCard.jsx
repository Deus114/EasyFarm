import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ForumThreadCard = ({ thread, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(thread)}>
      <View style={styles.threadCard}>
        <View style={styles.overlay} />
        <Text style={styles.threadTitle}>{thread.title}</Text>
        <Text style={styles.threadAuthor}>By {thread.author}</Text>
        <Text style={styles.threadSnippet}>{thread.content.slice(0, 100)}...</Text>
        <Text style={styles.threadTimestamp}>{thread.timestamp}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  threadCard: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(76, 175, 80, 0.2)', // Light green overlay
    borderRadius: 10,
    zIndex: -1,
  },
  threadTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  threadAuthor: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 5,
  },
  threadSnippet: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  threadTimestamp: {
    fontSize: 12,
    color: '#888',
  },
});

export default ForumThreadCard;