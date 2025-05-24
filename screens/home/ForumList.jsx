import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

// Mock API function for forums (replace with actual API call)
const forumsApi = async (userId) => {
  // Simulated API response
  return {
    statusCode: 200,
    data: [
      {
        id: '1',
        title: 'Best Practices for Tech Startups',
        author: 'JaneDoe',
        content: 'Starting a tech company in 2025 can be challenging...',
        timestamp: 'May 24, 2025, 3:00 PM',
      },
      {
        id: '2',
        title: 'AI Ethics Discussion',
        author: 'JohnSmith',
        content: 'With AI becoming more integrated into daily life...',
        timestamp: 'May 24, 2025, 2:30 PM',
      },
      {
        id: '3',
        title: 'Favorite Coding Tools in 2025',
        author: 'CodeMaster',
        content: 'What tools are you using for development this year?...',
        timestamp: 'May 24, 2025, 1:15 PM',
      },
      {
        id: '4',
        title: 'Future of Remote Work',
        author: 'TechGuru',
        content: 'How will remote work evolve in the coming years?...',
        timestamp: 'May 24, 2025, 10:00 AM',
      },
    ],
  };
};

const ForumList = ({ userId, navigation, maxItems }) => {
  const [forumList, setForumList] = useState([]);
  const [forumShowed, setForumShowed] = useState([]);

  useEffect(() => {
    const fetchForumUserID = async () => {
      try {
        let forumRes = await forumsApi(userId);
        if (forumRes && forumRes?.statusCode === 200) {
          setForumList(forumRes.data);
          // Handle limiting the number of items
          if (maxItems) {
            const contentLength = Math.min(forumRes.data.length, maxItems);
            setForumShowed(forumRes.data.slice(0, contentLength));
          } else {
            setForumShowed(forumRes.data);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchForumUserID();
  }, [userId]);

  return (
    <View className="w-full flex flex-row justify-between flex-wrap">
      {forumShowed && forumShowed.map((data, index) => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Forum', { threadId: data.id })}
          key={index}
          className="w-full sm:w-[48%]"
        >
          <View className="w-full h-[120px] flex-row flex p-[10px] rounded-xl bg-[#DFF1E6] mb-2">
            <Text className="text-[20px] w-[40%] rounded-l-full font-semibold">
              {data.author}
            </Text>
            <Text className="text-[15px] w-[60%] rounded-r-full font-semibold">
              {data.title}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ForumList;