import appClient from "./appClient";

export const getPosts = () => {
    return appClient.get("/api/posts");
};

export const searchPostByKeyword = (keyword) => {
    return appClient.get(`/api/posts/search?q=${keyword}`);
};

export const getPostById = (id) => {
    return appClient.get(`/api/posts/${id}`);
};

export const createPost = (data) => {
    return appClient.post(`/api/posts`, data);
};

export const updatePost = (id, data) => {
    return appClient.put(`/api/posts/${id}`, data);
};

export const deletePost = (id) => {
    return appClient.delete(`/api/posts/${id}`);
};

export const getPostCommentsById = (id) => {
    return appClient.get(`/api/posts/${id}/comments`);
};

export const createComment = (postId, data) => {
    return appClient.post(`/apit/posts/${postId}/comments"`, data);
};

export const deleteCommentById = (id) => {
    return appClient.delete(`/api/comments/${id}`);
};