import React, { useRef } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar";
import { searchPostByKeyword } from "../../api/postApi";

const Home = ({ posts, setPosts, isLoading, error }) => {
    const timeoutRef = useRef(null);

    const onSearch = (keyword) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = setTimeout(async () => {
            try {
                const res = await searchPostByKeyword(keyword);
                setPosts(res.data.data);
            } catch (err) {
                console.error("Lỗi khi tìm kiếm:", err);
            }
        }, 500);
    };

    if (isLoading) {
        return <div className="loading-state">Đang tải dữ liệu, vui lòng chờ...</div>;
    }

    if (error) {
        return <div className="error-state">Lỗi: {error}</div>;
    }

    return (
        <div className="home-container">
            <div className="post-list-container">
                <SearchBar onSearch={onSearch} />
                <h2>Danh sách bài viết</h2>
                {posts.length === 0 ? (
                    <div className="empty-state">Không tìm thấy bài viết nào phù hợp.</div>
                ) : (
                    <div className="post-grid">
                        {
                            posts.map((post) => (
                                <div key={post._id || post.id} className="post-card">
                                    <h3>{post.userName}</h3>
                                    <h3>{post.title}</h3>
                                    <div className="tags">
                                        {post.tags?.map((tag, index) => (
                                            <span key={index}>#{tag}</span>
                                        ))}
                                    </div>
                                    <p>
                                        {post.content && post.content.length > 100
                                            ? `${post.content.substring(0, 100)}...`
                                            : post.content}
                                    </p>
                                    <div>
                                        <span>👀 Lượt xem: {post.views}</span>
                                        <span>👍 Lượt thích: <strong>{post.reactions?.likes || 0}</strong></span>
                                        <span>👎 Lượt không thích: <strong>{post.reactions?.dislikes || 0}</strong></span>
                                    </div>
                                    
                                    <Link to={`/posts/${post._id || post.id}/${post.slug}`}>
                                        Xem chi tiết
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;