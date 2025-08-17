import axios from 'axios';
import { message } from 'antd';

const request = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000 * 60 * 10,
});

// 添加响应拦截器
request.interceptors.response.use(
    (response) => {
        return response;
    },
    function (error) {
        const messages = error.response.data.message;
        message.error(Array.isArray(messages) ? messages?.[0] ?? '' : messages);
        return Promise.reject(error);
    }
);

export default request;
