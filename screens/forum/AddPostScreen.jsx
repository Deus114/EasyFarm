import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { postPostApi } from '../../service/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddPostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handlePost = async () => {
    setErrorMessage('');

    // Kiểm tra rỗng
    if (!title.trim() || !content.trim()) {
      setErrorMessage('Please fill in both Title and Content.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userID');

      const res = await postPostApi(title, content, userId);

      if (res && res?.data) {
        console.log('Post OK');
        navigation.goBack();
      } else {
        setErrorMessage(res?.message || 'Failed to post. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('An unexpected error occurred.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={{ marginTop: 40 }}>
          {/* Header */}
          <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon name="arrow-back-outline" size={30} color="#4CAF50" />
            </TouchableOpacity>
            <Text style={styles.header}>Add Post</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.titleInput}
              placeholder="Title"
              value={title}
              onChangeText={setTitle}
            />
            <TextInput
              style={styles.descriptionInput}
              placeholder="Content"
              value={content}
              onChangeText={setContent}
              multiline={true}
            />

            {/* Lỗi */}
            {errorMessage !== '' && (
              <Text style={styles.errorText}>{errorMessage}</Text>
            )}

            <TouchableOpacity style={styles.postButton} onPress={handlePost}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    height: 200,
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
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
