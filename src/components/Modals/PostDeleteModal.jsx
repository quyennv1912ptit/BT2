import React, { useState } from 'react';
import { deletePost } from '../../api/postApi';

const PostDeleteModal = ({ setActiveModal, post, setPosts }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(null);

    const handleDeletePost = async () => {
        setIsDeleting(true);
        setError(null);
        
        try {
            await deletePost(post.id);
            
            setPosts(prevPosts => prevPosts.filter(p => p.id !== post.id));
            
            setActiveModal(null);
            
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Có lỗi xảy ra khi xóa bài viết.");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button 
                    className="close-btn" 
                    onClick={() => setActiveModal(null)}
                    disabled={isDeleting}
                >
                    X
                </button>
                
                <h2>Xác nhận xóa?</h2>
                <div className="delete-warning">
                    <span className="delete-warning-icon">⚠️</span>
                    <p>Bài viết <strong>{post.title}</strong> sẽ bị xóa vĩnh viễn và không thể khôi phục.</p>
                </div>

                {error && <div className="error-state">{error}</div>}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="btn-secondary"
                        onClick={() => setActiveModal(null)}
                        disabled={isDeleting}
                    >
                        Hủy
                    </button>

                    <button
                        type="button"
                        className="btn-danger"
                        onClick={handleDeletePost}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Đang xóa..." : "Xóa bài viết"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PostDeleteModal;