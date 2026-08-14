import appClient from "./appClient";

export const getPosts = () => {
    return appClient.get("/posts");
};

export const getPostBySlug = (slug) => {
    return appClient.get(`/posts/${slug}`);
};

export const getPostComments = (slug) => {
    return appClient.get(`/posts/${slug}/comments`);
};

export const createPost = (data) => {
    return appClient.post('/posts', data);
};

export const updatePost = (slug, data) => {
    return appClient.put(`/posts/${slug}`, data);
};

export const deletePost = (slug) => {
    return appClient.delete(`/posts/${slug}`);
};

export const addPostComment = (slug, data) => {
    return appClient.post(`/posts/${slug}/comments`, data);
};

export const getUserById = (id) => {
    return appClient.get(`/users/${id}`);
};