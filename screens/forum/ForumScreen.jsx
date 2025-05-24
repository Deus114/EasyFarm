import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ForumThreadCard from './ForumThreadCard';

// Hardcoded forum thread data
const hardcodedThreads = [
  {
    id: '1',
    title: 'Best Practices for Tech Startups',
    author: 'JaneDoe',
    content: 'Starting a tech company in 2025 can be challenging. What strategies have worked for you? I’ve been focusing on agile development and customer feedback loops, but I’d love to hear other perspectives.',
    timestamp: 'May 24, 2025, 3:00 PM',
  },
  {
    id: '2',
    title: 'AI Ethics Discussion',
    author: 'JohnSmith',
    content: 'With AI becoming more integrated into daily life, how do we ensure ethical usage? I’m particularly concerned about privacy and bias in machine learning models. Thoughts?',
    timestamp: 'May 24, 2025, 2:30 PM',
  },
  {
    id: '3',
    title: 'Favorite Coding Tools in 2025',
    author: 'CodeMaster',
    content: 'What tools are you using for development this year? I’ve been loving the latest VS Code updates and some new AI-powered debugging tools. Share your favorites!',
    timestamp: 'May 24, 2025, 1:15 PM',
  },
];

export default function ForumScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedThread, setSelectedThread] = useState(null);

  const filteredThreads = hardcodedThreads.filter(thread =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const closeModal = () => setSelectedThread(null);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Forum</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputWrapper}>
          <Icon name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search threads..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity>
          <Icon name="settings-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {/* Forum Threads List */}
      <ScrollView style={styles.scrollView}>
        {filteredThreads.map(thread => (
          <ForumThreadCard
            key={thread.id}
            thread={thread}
            onPress={setSelectedThread}
          />
        ))}
      </ScrollView>

      {/* Modal Overlay */}
      <Modal
        visible={!!selectedThread}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Icon name="close" size={24} color="#FF0000" />
            </TouchableOpacity>
            {selectedThread && (
              <View style={styles.modalInfo}>
                <Text style={styles.modalTitle}>{selectedThread.title}</Text>
                <Text style={styles.modalAuthor}>By {selectedThread.author}</Text>
                <Text style={styles.modalContent}>{selectedThread.content}</Text>
                <Text style={styles.modalTimestamp}>{selectedThread.timestamp}</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  searchInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E0F7E0',
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    color: '#888',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalAuthor: {
    fontSize: 14,
    color: '#4CAF50',
    marginBottom: 10,
  },
  modalContent: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  modalTimestamp: {
    fontSize: 12,
    color: '#888',
  },
});