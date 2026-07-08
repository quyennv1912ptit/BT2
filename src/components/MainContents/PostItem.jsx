import React from "react";
import { useForm } from "react-hook-form";

const PostItem = ({ post, posts, setPosts }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        const updatedPosts = posts.map(p => {
            if(p.id == post.id) {
                return {
                    ...p,
                    comments: [...(p.comments || []), data.comment]
                };
            }
            return p;
        });

        setPosts(updatedPosts);

        reset();
    };

    const countWords = (text) => {
        return text.trim().split(/\s+/).length;
    };

    return <div className="post-item">
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        {
            post.comments && post.comments.map((comment, index) => 
                <p key={index}>{comment}</p>
            )
        }
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Bình luận</label>
            <input type="text" {...register("comment", {
                required: "Vui lòng nhập bình luận",
                validate: (value) => {
                    const wordCount = countWords(value);
                    return wordCount <= 200 || "Nội dung bình luận tối đa 200 từ";
                }
            })} />
            {errors.comment && <span>{errors.comment.message}</span>}
            <button type="submit">Đăng</button>
        </form>
    </div>
};

export default PostItem;