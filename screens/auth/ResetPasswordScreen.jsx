import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Modal } from 'react-native';
import { resetPassApi } from '../../service/apiService';
import LoadingOverlay from '../../components/loading';

export default function ResetPasswordScreen({ navigation, route }) {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        setNewPassword('');
        setEmail(route.params.email);
        setError('');
    }, []);

    const onSubmit = async () => {
        //Submit để lấy otp
        setLoading(true);
        let res = await resetPassApi(email, newPassword);
        setLoading(false);
        if (res && res?.data) {
            handleAlert();
            navigation.navigate('Login');
            setError("");
        } else setError(res?.message);
    };

    const handleAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000); // Hide the alert after 2 seconds
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <LoadingOverlay visible={loading} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView>
                    <View className="w-full mt-[40%] h-full px-6 my-6">
                        <Text style={styles.title}>EasyFarm</Text>
                        <Text style={styles.subtitle}>Reset Password</Text>

                        {/* Email input */}
                        <TextInput
                            style={[styles.input, error && styles.inputError]}
                            placeholder="Nhập mật khẩu mới"
                            placeholderTextColor="#999"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}
                            autoCapitalize="none"
                        />

                        {error && <Text style={styles.errorText}>{error}</Text>}

                        {/* Login button */}
                        <TouchableOpacity style={styles.loginButton} onPress={() => onSubmit()}>
                            <Text style={styles.loginText}>Đặt lại mật khẩu</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Modal animationType="slide" transparent={true} visible={showAlert}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.alertText}>
                            Đặt lại mật khẩu thành công!
                        </Text>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        marginTop: 50,
        backgroundColor: 'white',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 3,
    },
    alertText: {
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'green'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        paddingHorizontal: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#16a34a',
        textAlign: 'center',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 32,
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
        marginBottom: 15,
        color: '#333',
        fontSize: 16,
    },
    inputError: {
        borderBottomColor: '#ef4444',
    },
    errorText: {
        color: '#ef4444',
        marginBottom: 12,
        fontSize: 14,
    },
    loginButton: {
        backgroundColor: '#16a34a',
        paddingVertical: 12,
        borderRadius: 8,
        marginBottom: 16,
    },
    loginText: {
        color: 'white',
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 16,
    },
    signUpText: {
        color: 'black',
        textAlign: 'center',
        marginBottom: 8,
        fontSize: 14,
    },
    forgotText: {
        color: '#6b7280',
        textAlign: 'center',
        fontSize: 14,
    },
});
