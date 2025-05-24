import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const LoadingOverlay = ({ visible }) => {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#ffffff" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 999,
    },
    loaderContainer: {
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 10,
    },
});

export default LoadingOverlay;
