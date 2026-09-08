import appClient from "./appClient";

export const registerUser = (data) => {
    return appClient.post('/api/auth/register', data);
};

export const loginUser = (data) => {
    return appClient.post('/api/auth/login', data);
};