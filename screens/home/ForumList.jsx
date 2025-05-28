import { init } from '@sentry/react-native';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Mock API function for forums (replace with actual API call)
// const initialForums = [
//   {
//     id: '1',
//     title: 'Cách trồng cây',
//     img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png', // Placeholder image
//     timestamp: 'May 24, 2025, 3:00 PM',
//   },
//   {
//     id: '2',
//     title: 'AI Ethics Discussion',
//     img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
//     timestamp: 'May 24, 2025, 2:30 PM',
//   },
//   {
//     id: '3',
//     title: 'Favorite Coding Tools in 2025',
//     img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
//     timestamp: 'May 24, 2025, 1:15 PM',
//   },
//   {
//     id: '4',
//     title: 'Future of Remote Work',
//     img: 'https://docs.ohstem.vn/en/latest/_images/1.12.png',
//     timestamp: 'May 24, 2025, 10:00 AM',
//   },
// ];

const ForumList = ({ navigation, maxItems }) => {
  const [forumList, setForumList] = useState([]);

  useEffect(() => {

  }, []);

  return (
    <View className="w-full flex flex-row justify-between flex-wrap">
      {forumList && forumList.map((data, index) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Post');
          }}
          className="w-full sm:w-[48%]"
        >
          <View style={styles.forumCard}>
            <Image source={{ uri: data.img }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{data.title}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = {
  forumCard: {
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
    backgroundColor: '#FFF', // To ensure the image stands out
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
};

export default ForumList;