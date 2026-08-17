import appClient from "./appClient";

export const registerUser = (data) => {
    return appClient.post('/register', data);
};

export const loginUser = (data) => {
    return appClient.post('login', data);
};

export const updateUserInfo = (data) => {
    return appClient.put("/users/info", data);
};