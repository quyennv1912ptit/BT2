import React from "react";
import { useForm } from "react-hook-form";

const PostCreateModal = ({setActiveModal, posts, setPosts}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const countWords = (text) => {
        return text.trim().split(/\s+/).length;
    };

    const onSubmit = (data) => {
        const newPost = {
            id: Date.now(),
            title: data.title,
            content: data.content,
            comment: []
        };
        setPosts([...posts, newPost]);
        setActiveModal(null);
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
                        <input
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
                    <button type="submit">Xác nhận</button>
                </form>
            </div>
        </div>
    )
};

export default PostCreateModal;