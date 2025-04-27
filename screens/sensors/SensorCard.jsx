// components/SensorCard.js
import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

export default function SensorCard({
  onPress,
  imageSource,
  title,
  icons = [],          // array of { library: 'ionicons'|'material', name: string }
  style,
  imageStyle,
  titleStyle,
  iconSize = 20,
  iconColor = '#333',
}) {
  const renderIcon = ({ library, name }, i) => {
    if (library === 'material')
      return (
        <MaterialCommunityIcons
          key={i}
          name={name}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      );
    return (
      <Icon
        key={i}
        name={name}
        size={iconSize}
        color={iconColor}
        style={styles.icon}
      />
    );
  };

  return (
    <TouchableOpacity
      style={[styles.card, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {imageSource && (
        <Image source={imageSource} style={[styles.image, imageStyle]} />
      )}
      <Text style={[styles.title, titleStyle]} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.iconRow}>
        {icons.map(renderIcon)}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEE',
    borderRadius: 12,
    padding: 12,
    marginVertical: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  iconRow: {
    flexDirection: 'row',
    marginLeft: 12,
  },
  icon: {
    marginHorizontal: 4,
  },
});
