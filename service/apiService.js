import instance from '../utils/axiosCuztomize';

// Auth module
export const loginApi = (email, password) => {
    return instance.post(`api/v1/auth/login`, {
        username: email,
        password: password,
    });
};

export const authAccountApi = () => {
    return instance.get('api/v1/auth/account');
}

export const registerApi = (name, email, password) => {
    console.log('register')
    return instance.post(`api/v1/auth/register`, {
        name: name,
        email: email,
        password: password,
        role: 'USER'
    });
}

export const forgotPassApi = (email) => {
    return instance.post(`api/v1/auth/forgot-password`, {
        email
    });
}

export const verifyOtpApi = (email, otp) => {
    return instance.post(`api/v1/auth/verify-otp`, {
        email, otp
    });
}

export const resetPassApi = (email, newPassword) => {
    return instance.post(`api/v1/auth/reset-password`, {
        email, newPassword
    });
}

// Sensor module
export const sensorsApi = (userID) => {
    return instance.get(`api/v1/sensors/${userID}`);
}