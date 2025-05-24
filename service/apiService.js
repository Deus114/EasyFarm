import axios from '../utils/axiosCuztomize';

// Auth module
export const loginApi = (email, password) => {
    return axios.post(`api/v1/auth/login`, {
        username: email,
        password: password,
    });
};

export const authAccountApi = () => {
    return axios.get('api/v1/auth/account');
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

export const schedulesApi = (userID) => {
    console.log('called')
    return instance.get(`api/v1/schedules/${userID}`);
}

//Unfinished
export const schedulesIDApi = (ID) => {
    console.log('called')
    return instance.get(`api/v1/schedules/${ID}/detail`);
}

export const notificationsAPI = () => {
    return instance.get(`api/v1/notifications`);
}

export const postScheduleApi = (data) => {
    return instance.post(`api/v1/schedules`,data);
}

export const pauseScheduleApi = (ID) => {
    return instance.patch(`api/v1/schedules/${ID}/pause`);
}

export const resumeScheduleApi = (ID) => {
    return instance.patch(`api/v1/schedules/${ID}/resume`);
}

export const deleteScheduleApi = (ID) => {
    return instance.delete(`api/v1/schedules/${ID}`);
}

export const addSensorApi = (name, serialNumber, img, type, description, userID) => {
    // console.log("Post", name, serialNumber, img, type, description, userID);
    return instance.post(`api/v1/sensors`, {
        name: name, 
        serialNumber: serialNumber, 
        img: img, 
        type: type, 
        description: description, 
        userId: userID
    });
}