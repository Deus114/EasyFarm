import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { loginApi } from '../../service/apiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    useEffect(() => {
        AsyncStorage.setItem('token', null);
    }, []);
    const onSubmit = async () => {
        if (!email || !password) {
            setError('Email và mật khẩu là bắt buộc');
            return;
        }
        try {
            let res = await loginApi(email, password);
            console.log(res)
            if (res && res?.statusCode == 201) {
                console.log(res.data.access_token);
                AsyncStorage.setItem('token', res.data.access_token);
                navigation.navigate('Home');
            } else {
                setError(res.message);
            }
        } catch (error) {
            throw error;
        }
    };
    return (
        <SafeAreaView className="h-full bg-white">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView>
                    <View className="w-full mt-[40%] h-full px-6 my-6">
                        <Text style={styles.title}>EasyFarm</Text>
                        <Text style={styles.subtitle}>Login</Text>

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

                        {/* Password input */}
                        <TextInput
                            style={[styles.input, error && styles.inputError]}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        {error && <Text style={styles.errorText}>{error}</Text>}

                        {/* Login button */}
                        <TouchableOpacity style={styles.loginButton} onPress={() => onSubmit()}>
                            <Text style={styles.loginText}>Log in</Text>
                        </TouchableOpacity>

                        {/* Navigation links */}
                        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                            <Text style={styles.signUpText}>Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                            <Text style={styles.forgotText}>Forget Password?</Text>
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
        marginBottom: 8,
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
