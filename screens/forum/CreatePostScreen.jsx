import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { postPostApi } from '../../service/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreatePostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handlePost = async () => {
    // Add functionality to handle posting (e.g., save to state or API)
    console.log('Post submitted:', { title, content });
    let userId = AsyncStorage.getItem('userID');
    let res = await postPostApi(title, content, userId);
    if (res && res?.status == 201) {
        console.log("Post OK");
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.header}>Add Post</Text>
      </View>

      {/* Form Content */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.titleInput}
          placeholder="Post Name"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={styles.descriptionInput}
          placeholder="Description"
          value={content}
          onChangeText={setContent}
          multiline={true}
          numberOfLines={10} // Increased to allow more visible lines
        />
        <TouchableOpacity style={styles.postButton} onPress={handlePost}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </View>
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
  formContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E0F7E0',
    borderRadius: 20,
    margin: 16,
    justifyContent: 'space-between', // Space out title, description, and button
  },
  titleInput: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  descriptionInput: {
    flex: 1, // Expand to fill available space
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  postButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  postButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});