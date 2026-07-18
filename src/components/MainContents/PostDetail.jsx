import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, getPostComments } from '../../api/postApi';
import { useForm } from "react-hook-form";

const PostDetail = () => {
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPostDetail = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const [postRes, commentsRes] = await Promise.all([
                    getPostById(id),
                    getPostComments(id)
                ]);
                setPost({
                    ...postRes.data,
                    comments: commentsRes.data.comments
                });
            } catch (err) {
                if (err.response && err.response.status == 404) {
                    setError("Không tìm thấy bài viết");
                } else {
                    setError("Có lỗi xảy ra khi tải bài viết. Vui lòng thử lại!");
                }
            } finally {
                setIsLoading(false);
            }

        };
        fetchPostDetail();
    }, [id])

    const handleGoBack = () => {
        navigate(-1);
    };

const onSubmit = (data) => {
        const newComment = {
            id: Date.now(),
            body: data.comment,
            likes: 0,
            user: {
                username: "guest_user",
                fullName: "Khách Ẩn Danh"
            }
        };

        const updatedPost = {
            ...post,
            comments: [...(post.comments || []), newComment]
        };

        setPost(updatedPost);
        reset();
    };

    const countWords = (text) => {
        return text.trim().split(/\s+/).length;
    };

    if (isLoading) {
        return <div className="loading-state">Đang tải dữ liệu, vui lòng chờ...</div>;
    }

    if (error) {
        return (
            <div className="error-state">
                <h2>Lỗi!</h2>
                <p>{error}</p>
                <button onClick={handleGoBack} className="btn-back">Quay lại</button>
            </div>)
    }

    if (!post) return null;

    return (
        <div className="post-detail-container">
            <button onClick={handleGoBack} className="btn-back">
                ⬅ Quay lại
            </button>

            <div className="post-content">
                <h1>{post.title}</h1>

                <div className="tags">
                    {post.tags?.map((tag, index) => (
                        <span key={index} className="tag-badge">
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="post-body">
                    <p>{post.body}</p>
                </div>

                <div className="stats-container">
                    <span>👀 Số lượt xem: <strong>{post.views}</strong></span>
                    <span>👍 Lượt thích: <strong>{post.reactions?.likes || 0}</strong></span>
                    <span>👎 Lượt không thích: <strong>{post.reactions?.dislikes || 0}</strong></span>
                </div>
            </div>
            <div className='post-comment-container'>
                <h2>Bình luận</h2>
                {post.comments && post.comments.length > 0 ?
                    post.comments.map(comment => (
                        <div key={comment.id} className='post-comment'>
                            <span>Họ tên: {comment.user.fullName} </span>
                            <span>Tài khoản: {comment.user.username} </span>
                            <div className='comment-body'>
                                <p>{comment.body}</p>
                            </div>
                            <span>👍 Lượt thích: <strong>{comment.likes || 0}</strong></span>
                        </div>
                    )) : (
                        <p>Chưa có bình luận nào.</p>
                    )
                }
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Bình luận</label>
                <input type="text" {...register("comment", {
                    required: "Vui lòng nhập bình luận",
                    validate: (value) => {
                        const wordCount = countWords(value);
                        return wordCount <= 200 || "Nội dung bình luận tối đa 200 từ";
                    }
                })} />
                {errors.comment && <span>{errors.comment.message}</span>}
                <button type="submit">Đăng</button>
            </form>
        </div>
    );
}

export default PostDetail;
