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
            <button onClick={() => setActiveModal("create-post")}>Tạo bài viết</button>
            {
                posts && posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>
                            {post.body.length > 100
                                ? `${post.body.substring(0, 100)}...`
                                : post.body}
                        </p>
                        <button className="view-button" onClick={() => navigate(`/posts/${post.id}`)}>Xem</button>
                        <button className="edit-button" onClick={() => {
                            setEditPost(post);
                            setActiveModal('edit-post')
                        }}>Sửa</button>
                        <button className="delete-button" onClick={() => {
                            setDeletePost(post);
                            setActiveModal('delete-post');
                        }}>Xóa</button>
                    </div>
                ))
            }
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