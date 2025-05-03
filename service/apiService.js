import instance from '../utils/axiosCuztomize';

export const loginApi = (email, password) => {
    return instance.post(`api/v1/auth/login`, {
        username: email,
        password: password,
    });
};