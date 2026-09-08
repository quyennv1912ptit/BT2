import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { deleteCommentById, getPostById, getPostCommentsById, createComment } from '../../api/postApi';
import { AuthContext } from '../../context/AuthContext';

const PostDetailPage = () => {
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { user, isLoggedIn } = useContext(AuthContext);

    const { id } = useParams();
    const navigate = useNavigate();

    const fetchPostDetail = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [postRes, commentsRes] = await Promise.all([
                getPostById(id),
                getPostCommentsById(id)
            ]);

            setPost(postRes.data.data || postRes.data);
            setComments(commentsRes.data.data || commentsRes.data);
        } catch (err) {
            if (err.response && err.response.status === 404) {
                setError("Không tìm thấy bài viết");
            } else {
                setError("Có lỗi xảy ra khi tải bài viết. Vui lòng thử lại!");
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPostDetail();
    }, [id]);

    const handleBack = () => {
        navigate(-1);
    };

    const countWords = (text) => {
        const trimmed = text.trim();
        if (!trimmed) return 0;
        return trimmed.split(/\s+/).length;
    };

    const onSubmit = async (data) => {
        try {
            const response = await createComment(id, {
                body: data.comment
            });

            alert(response.data.message || "Bình luận thành công");

            const commentsRes = await getPostCommentsById(id);
            setComments(commentsRes.data.data || commentsRes.data);

            reset({ comment: "" });
        } catch (error) {
            alert("Lỗi: " + (error.response?.data?.message || "Lỗi kết nối"));
        }
    };

    const handleClick = async (commentId) => {
        try {
            await deleteCommentById(commentId);
            fetchPostDetail();
        } catch (error) {
            alert("Lỗi: " + (error.response?.data?.message || "Lỗi kết nối"));
        }
    };

    if (isLoading) {
        return <div className="loading-state">Đang tải dữ liệu, vui lòng chờ...</div>;
    }

    if (error) {
        return (
            <div className="error-state">
                <h2>Lỗi!</h2>
                <p>{error}</p>
                <button onClick={handleBack} className="btn-back">Quay lại</button>
            </div>
        );
    }

    if (!post) return null;

    return (
        <div className="post-detail-container">
            <button onClick={handleBack} className="btn-back">
                ⬅ Quay lại
            </button>

            <div className="post-content">
                <h2>{post.userName}</h2>
                <h1>{post.title}</h1>

                <div className="tags">
                    {post.tags?.map((tag, index) => (
                        <span key={index} className="tag-badge">
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="post-body">
                    <p>{post.content}</p>
                </div>

                <div className="stats-container">
                    <span>👀 Số lượt xem: <strong>{post.views || 0}</strong></span>
                    <span>👍 Lượt thích: <strong>{post.reactions?.likes || 0}</strong></span>
                    <span>👎 Lượt không thích: <strong>{post.reactions?.dislikes || 0}</strong></span>
                </div>
            </div>

            <div className='post-comment-container'>
                <h2>Bình luận</h2>
                {comments && comments.length > 0 ? (
                    comments.map(comment => (
                        <div key={comment.id} className='post-comment'>
                            <span>Tài khoản: {comment.user_name} </span>
                            <div className='comment-body'>
                                <p>{comment.body}</p>
                            </div>
                           { (user?.id === comment.user_id || user?.role === "admin") && 
                             <button className="btn-delete-comment" onClick={() => handleClick(comment.id)}>Xóa bình luận</button>
                           }
                        </div>
                    ))
                ) : (
                    <p>Chưa có bình luận nào.</p>
                )}
            </div>

            {isLoggedIn ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Bình luận của bạn</label>
                    <input
                        type="text"
                        {...register("comment", {
                            required: "Vui lòng nhập bình luận",
                            validate: (value) => {
                                const wordCount = countWords(value);
                                return wordCount <= 200 || "Nội dung bình luận tối đa 200 từ";
                            }
                        })}
                    />
                    {errors.comment && <span className="error-text">{errors.comment.message}</span>}
                    <button type="submit">Đăng</button>
                </form>
            ) : (
                <p className="login-prompt">
                    Vui lòng <Link to="/login">đăng nhập</Link> để tham gia bình luận.
                </p>)}
        </div>
    );
}

export default PostDetailPage;