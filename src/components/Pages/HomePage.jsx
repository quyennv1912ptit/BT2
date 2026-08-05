import React, { useEffect, useState } from "react";
import { getPosts, searchPost } from "../../api/postApi";
import { Link } from "react-router-dom";

const Home = ({ posts, setPosts, isLoading, error }) => {

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        setFilter(posts);
    }, [posts]);

    if (isLoading) {
        return <div className="loading-state">Đang tải dữ liệu, vui lòng chờ...</div>;
    }

    if (error) {
        return <div className="error-state">Lỗi: {error}</div>;
    }

    if (posts.length === 0) {
        return <div className="empty-state">Hiện tại chưa có bài viết nào.</div>;
    }

    const handleChange = (e) => {
        e.preventDefault();
        setSearch(e.target.value);
    }

    console.log(search);

    const handleSearch = async () => {
        if(!search) {
            setFilter(posts);
            return;
        }
        const arr = await searchPost(search);
        // console.log(arr.data.posts);
        setFilter(arr.data.posts);
    }

    return (
        <div className="home-container">
            <div className="post-list-container">
                <h2>Danh sách bài viết</h2>
                <input type="text" value={search} onChange={handleChange} />
                <button onClick={handleSearch}>search</button>

                <div className="post-grid">
                    {
                        filter.map((post) => (
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