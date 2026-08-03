import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createPost } from "../../api/postApi";

const PostCreateModal = ({ setActiveModal, posts, setPosts }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [error, setError] = useState(null);

    const countWords = (text) => {
        const trimmedText = text.trim();
        if (!trimmedText) return 0;
        return trimmedText.split(/\s+/).length;
    };

    const onSubmit = async (data) => {
        setError(null);
        try {
            const res = await createPost({
                title: data.title,
                body: data.content,
                userId: Number(data.userId)
            });

            const newPostFromServer = {
                ...res.data,
                tags: ["new"],
                views: 0,
                reactions: { likes: 0, dislikes: 0 }
            };

            setPosts([newPostFromServer, ...posts]);

            setActiveModal(null);

        } catch (err) {
            setError(err.response?.data?.message || err.message || "Có lỗi xảy ra khi tạo bài viết.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={() => setActiveModal(null)}>X</button>
                <h2>Tạo bài viết</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label>Tiêu đề</label>
                        <input
                            type="text"
                            {...register("title", {
                                required: "Vui lòng nhập tiêu đề",
                                validate: (value) => {
                                    const wordCount = countWords(value);
                                    return wordCount <= 50 || "Tiêu đề dài tối đa 50 từ"
                                }
                            })}
                        />
                        {errors.title && (
                            <span>{errors.title.message}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>Nội dung</label>
                        <textarea
                            {...register("content", {
                                required: "Vui lòng nhập nội dung",
                                validate: (value) => {
                                    const wordCount = countWords(value);
                                    return wordCount <= 1000 || "Nội dung dài tối đa 1000 từ"
                                }
                            })}
                        />
                        {errors.content && (
                            <span>{errors.content.message}</span>
                        )}
                    </div>
                    <div className="form-group">
                        <label>userId</label>
                        <input
                            type="number"
                            {...register("userId", {
                                required: "Vui lòng nhập userId",
                            })}
                        />
                        {errors.userId && <span className="error-text" style={{ color: "red" }}>{errors.userId.message}</span>}
                    </div>
                    {error && <div className="error-state" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Đang xử lý..." : "Xác nhận"}
                    </button>
                </form>
            </div>
        </div>
    )
};

export default PostCreateModal;