import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { registerApi } from '../../service/apiService';
export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setfullName] = useState('');
    const [confPassword, setconfPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = async () => {
        if (!email || !password || !fullName || !confPassword) {
            setError('Mọi trường thông tin phía trên đều bắt buộc!');
            return;
        }
        if (password != confPassword){
            setError ('Mật khẩu và mật khẩu nhập lại bạn nhập không khớp!')
        }
        try {
            let res = await registerApi(fullName,email,password)
            console.log(res.statusCode)
            if (res && res?.statusCode == 201) {
                console.log('ok')
                navigation.navigate('Login');
            }
            else{
                setError(res.message);
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>EasyFarm</Text>
            <Text style={styles.subtitle}>Register</Text>

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

            {/* FullName input */}
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Full Name"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setfullName}
                keyboardType="default"
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

            {/* Confirm Password input */}
            <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry
                value={confPassword}
                onChangeText={setconfPassword}
            />

            {error && <Text style={styles.errorText}>{error}</Text>}

            {/* Login button */}
            <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
                <Text style={styles.loginText}>Create Account</Text>
            </TouchableOpacity>

            {/* Navigation links */}
            <TouchableOpacity onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.signUpText}>Have an account? Log In</Text>
            </TouchableOpacity>
        </View>
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
