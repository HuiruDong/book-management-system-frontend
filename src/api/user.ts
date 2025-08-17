import axios from '../utils/request';

export const login = (username: string, password: string) => {
    return axios.post('/user/login', { username, password });
};

export const register = (username: string, password: string) => {
    return axios.post('/user/register', { username, password });
};
