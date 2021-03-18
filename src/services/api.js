import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import {API_URL, API_TOKEN} from '@env';

const api = axios.create({
    baseURL: API_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});

api.interceptors.request.use(
    (request) => {
        if (request.headers) {
            if (request.headers.auth) {
                if (!request.params) {
                    request.params = {};
                }
                request.params.token = API_TOKEN;

                delete request.headers.auth;
            } else {
                delete request.headers.auth;
            }
        }

        return request;
    },
    (error) => Promise.reject(error)
);

export default api;
