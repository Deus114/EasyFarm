import instance from '../utils/axiosCuztomize';

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
    return instance.post(`api/v1/auth/register`, {
        name: name,
        email: email,
        password: password,
        role: 'USER'
    });
}

export const sensorsApi = (userID) =>{
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