import React from "react";

const PostItem = ({ post, posts, setPosts }) => {



    return <div className="post-item">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {
            post.comments && post.comments.map((comment, index) => 
                <p key={index}>{comment}</p>
            )
        }
        
    </div>
};

export default PostItem;