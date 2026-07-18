import axiosClient from "./axiosClient";

export const getPosts = () => {
    return axiosClient.get("/posts", { params: { limit: 10 } });
};

export const getPostById = (id) => {
    return axiosClient.get(`/posts/${id}`);
};

export const getPostComments = (id) => {
    return axiosClient.get(`/posts/${id}/comments`);
};

export const createPost = (data) => {
    return axiosClient.post('/posts/add', data);
};

export const updatePost = (id, data) => {
    return axiosClient.put(`/posts/${id}`, data);
};

export const deletePost = (id) => {
    return axiosClient.delete(`/posts/${id}`);
};