

const postLogin = (email, password) => {
    return axios.post(`auth/logIn`, {
        email: email,
        password: password,
    });
};