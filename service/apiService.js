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