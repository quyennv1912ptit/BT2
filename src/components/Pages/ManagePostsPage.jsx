import React, { useState } from "react";
import PostCreateModal from "../Modals/PostCreateModal";
import PostDeleteModal from "../Modals/PostDeleteModal";
import { useNavigate } from "react-router-dom";
import PostEditModal from "../Modals/PostEditModal";

const ManagePosts = ({ posts, setPosts, isLoading, error }) => {
    const [activeModal, setActiveModal] = useState(null);
    const navigate = useNavigate();
    const [deletePost, setDeletePost] = useState(null);
    const [editPost, setEditPost] = useState(null);

    if (isLoading) {
        return <div className="loading-state">Đang tải dữ liệu, vui lòng chờ...</div>;
    }

    if (error) {
        return <div className="error-state">Lỗi tải dữ liệu: {error}</div>;
    }

    return (
        <div className="manage-posts-container">
            <button className="create-button" onClick={() => setActiveModal("create-post")}>
                + Tạo bài viết
            </button>
            
            <div className="post-list">
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className="post-item">
                            <h3>{post.userName}</h3>
                            <h2>{post.title}</h2>
                            <p>
                                {post.body && post.body.length > 100
                                    ? `${post.body.substring(0, 100)}...`
                                    : post.body}
                            </p>
                            
                            <div className="action-buttons">
                                <button 
                                    className="view-button" 
                                    onClick={() => navigate(`/posts/${post.slug}`)}
                                >
                                    Xem
                                </button>
                                
                                <button className="edit-button" onClick={() => {
                                    setEditPost(post);
                                    setActiveModal('edit-post');
                                }}>
                                    Sửa
                                </button>
                                
                                <button className="delete-button" onClick={() => {
                                    setDeletePost(post);
                                    setActiveModal('delete-post');
                                }}>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state">Chưa có bài viết nào để quản lý.</div>
                )}
            </div>

            {activeModal === "create-post" && (
                <PostCreateModal setActiveModal={setActiveModal} posts={posts} setPosts={setPosts} />
            )}

            {activeModal === "edit-post" && (
                <PostEditModal setActiveModal={setActiveModal} post={editPost} setPosts={setPosts} />
            )}

            {activeModal === "delete-post" && (
                <PostDeleteModal setActiveModal={setActiveModal} post={deletePost} setPosts={setPosts} />
            )}
        </div>
    );
};

export default ManagePosts;