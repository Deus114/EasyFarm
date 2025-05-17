import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { forgotPassApi } from '../../service/apiService';
import LoadingOverlay from '../../components/loading';

export default function ForgotPasswordScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setEmail("")
        setError('');
    }, []);

    const onSubmit = async () => {
        //Submit để lấy otp
        setLoading(true);
        let res = await forgotPassApi(email);
        setLoading(false);
        if (res && res?.data) {
            navigation.navigate('VerifyOtp', {
                email: email,
            });
            setError("");
        } else setError(res?.message);
    };
    return (
        <SafeAreaView className="h-full bg-white">
            <LoadingOverlay visible={loading} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView>
                    <View className="w-full mt-[40%] h-full px-6 my-6">
                        <Text style={styles.title}>EasyFarm</Text>
                        <Text style={styles.subtitle}>Forgot Account</Text>

                        {/* Email input */}
                        <TextInput
                            style={[styles.input, error && styles.inputError]}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        {error && <Text style={styles.errorText}>{error}</Text>}

                        {/* Login button */}
                        <TouchableOpacity style={styles.loginButton} onPress={() => onSubmit()}>
                            <Text style={styles.loginText}>Get OTP</Text>
                        </TouchableOpacity>

                        {/* Navigation links */}
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signUpText}>Already have an account? Log in</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
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
