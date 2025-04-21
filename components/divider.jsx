import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DividerWithText = () => {
    return (
        <View style={styles.container}>
            <View style={styles.line} />
            <Text style={styles.text}>Hay</Text>
            <View style={styles.line} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: 'gray',
    },
    text: {
        marginHorizontal: 10,
        fontSize: 16,
        color: 'black',
    },
});
export default DividerWithText;