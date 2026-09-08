import appClient from "./appClient";

export const getUserById = (id) => {
    return appClient.get(`/api/users/${id}`);
};

export const updateUserById = (id, data) => {
    return appClient.put(`/api/users/${id}`, data);
};