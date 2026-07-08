import React from "react";
import PostCreateModal from "../Modals/PostCreateModal";

const ManagePosts = ({ posts, setPosts, activeModal, setActiveModal }) => {
    return (
        <div className="manage-posts-container">
            {
                posts && posts.map((post) => (
                    <div key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </div>
                ))
            }
            <button onClick={() => setActiveModal("create-post")}>Tạo bài viết</button>
            {
                activeModal === "create-post" && <PostCreateModal setActiveModal={setActiveModal} posts={posts} setPosts={setPosts} />
            }
        </div>
    );
};

export default ManagePosts;