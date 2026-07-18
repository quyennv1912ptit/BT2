import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { updatePost } from '../../api/postApi';

const PostEditModal = ({ setActiveModal, post, setPosts }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            title: post.title,
            content: post.body
        }
    });
    const [error, setError] = useState(null);

    const countWords = (text) => {
        const trimmedText = text.trim();
        if (!trimmedText) return 0;
        return trimmedText.split(/\s+/).length;
    };

    const onSubmit = async (data) => {
        setError(null);
        try {
            const res = await updatePost(post.id, {
                title: data.title,
                body: data.content,
            });

            const updatedPostFromServer = {
                ...res.data,
                tags: [...(post.tags || []), "edited"], 
                views: post.views,
                reactions: post.reactions
            };

            setPosts(prev => prev.map(p => 
                p.id === post.id ? updatedPostFromServer : p
            ));

            setActiveModal(null);

        } catch (err) {
            setError(err.response?.data?.message || err.message || "Có lỗi xảy ra khi sửa bài viết.");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-btn" onClick={() => setActiveModal(null)}>X</button>
                <h2>Sửa bài viết</h2>
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
                            type="text"
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
                    {error && <div className="error-state" style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
                    <button type="submit">Xác nhận</button>
                </form>
            </div>
        </div>
    )
};

export default PostEditModal;
