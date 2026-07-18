import React, { useEffect, useState } from "react";
import { getPosts } from "../../api/postApi";
import { Link } from "react-router-dom";

const Home = ({ posts, setPosts }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const res = await getPosts();
                setPosts(res.data.posts);
            } catch (e) {
                setError(e.response?.data?.message || "Không thể tải danh sách bài viết. Vui lòng thử lại!");
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    if (isLoading) {
        return <div className="loading-state">Đang tải dữ liệu, vui lòng chờ...</div>;
    }

    if (error) {
        return <div className="error-state">Lỗi: {error}</div>;
    }

    if (posts.length === 0) {
        return <div className="empty-state">Hiện tại chưa có bài viết nào.</div>;
    }

    return (
        <div className="home-container">
            <div className="post-list-container">
                <h2>Danh sách bài viết</h2>
                <div className="post-grid">
                    {
                        posts.map((post) => (
                            <div key={post.id} className="post-card">
                                <h3>{post.title}</h3>
                                <div className="tags">
                                    {post.tags.map((tag, index) => (
                                        <span key={index}>#{tag}</span>
                                    ))}
                                </div>
                                <p>
                                    {post.body.length > 100
                                        ? `${post.body.substring(0, 100)}...`
                                        : post.body}
                                </p>
                                <div>
                                    <span>👀 Lượt xem: {post.views}</span>
                                    <span>❤️ Lượt thích: {post.reactions?.likes || 0}</span>
                                </div>
                                <Link to={`/posts/${post.id}`}>
                                    Xem chi tiết
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Home;