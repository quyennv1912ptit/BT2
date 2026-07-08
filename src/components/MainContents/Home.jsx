import React from "react";
import PostItem from "./PostItem";

const Home = ({ posts, setPosts }) => {
    return (
        <div className="home-container">
            {
                posts && posts.map((post) => (
                    <PostItem key={post.id} post={post} posts={posts} setPosts={setPosts}/>
                ))
            }
        </div>
    );
};

export default Home;