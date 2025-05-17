import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, ScrollView, Platform, Modal } from 'react-native';
import { forgotPassApi, verifyOtpApi } from '../../service/apiService';
import { OtpInput } from 'react-native-otp-entry';
import LoadingOverlay from '../../components/loading';

export default function VerifyOtpScreen({ navigation, route }) {
    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const reSend = useRef(null);

    useEffect(() => {
        setOtp('');
        setEmail(route.params.email);
        setError('');
    }, []);

    const maskEmail = email => {
        const [name, domain] = email.split('@');
        if (name.length <= 2) {
            return `${name[0]}*${name.slice(-1)}@${domain}`;
        }
        const maskedName = `${name[0]}${'*'.repeat(name.length - 2)}${name.slice(
            -1,
        )}`;
        return `${maskedName}@${domain}`;
    };

    const handleAlert = () => {
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000); // Hide the alert after 2 seconds
    };

    const handleResend = async () => {
        reSend.current.clear();
        setLoading(true);
        let res = await forgotPassApi(email);
        setLoading(false);
        if (res && res?.data) {
            setError("");
            handleAlert();
        } else {
            setError(res.message);
        }
    }

    const fillOTP = async otp => {
        setLoading(true);
        let res = await verifyOtpApi(email, otp);
        setLoading(false);
        if (res && res?.data) {
            navigation.navigate('ResetPassword', {
                email: email,
            });
            setError("");
        } else {
            reSend.current.clear();
            setError(res?.message);
        }
    };

    return (
        <SafeAreaView className="h-full bg-white">
            <LoadingOverlay visible={loading} />
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
                <ScrollView>
                    <View className="w-full mt-[40%] h-full px-6 my-6">
                        <Text style={styles.title}>EasyFarm</Text>
                        <Text style={styles.subtitle}>OTP Verify</Text>

                        {/* Email input */}
                        <Text className="text-base mt-5 mb-5">
                            Mã xác thực 6 số được gửi đến email {maskEmail(email)}
                        </Text>
                        <OtpInput
                            autoFocus={true}
                            ref={reSend}
                            numberOfDigits={6}
                            onTextChange={otp => {
                                setOtp(otp);
                            }}
                            onFilled={otp => {
                                fillOTP(otp);
                            }}
                            focusStickBlinkingDuration={400}
                            theme={{
                                pinCodeContainerStyle: {
                                    width: 50,
                                    height: 50,
                                },
                            }}
                        />

                        {error && <Text style={styles.errorText}>{error}</Text>}
                        <View className="justify-center pt-5 flex-row gap-2">
                            <Text className="text-lg">Không nhận được mã?</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    handleResend();
                                }}
                            >
                                <Text className="text-[#79AC78] text-lg">Gửi lại</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <Modal animationType="slide" transparent={true} visible={showAlert}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.alertText}>
                            Đã gửi lại mã OTP thành công đến email {maskEmail(email)}
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
