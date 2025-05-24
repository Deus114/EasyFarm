import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ForumThreadCard = ({ thread, navigation }) => {
  return (
    <TouchableOpacity onPress={() => {
        console.log("ASDASDASD");
        navigation.navigate('Post');
    }
    }>
      <View style={styles.threadCard}>
        <Image source={{ uri: thread.img }} style={styles.cardImage} />
        <Text style={styles.cardTitle}>{thread.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  threadCard: {
    width: '100%',
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  cardImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: '#FFF',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    background: 'linear-gradient(to right, #E0F7E0 50%, #E0E0E0 50%)',
    paddingLeft: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default ForumThreadCard;