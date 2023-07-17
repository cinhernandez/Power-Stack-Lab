import React, {useEffect, useContext} from "react";
import { AppContext } from "../AppContext";
import PostsForm from "./PostsForm";

const Posts = () => {
    const { posts, setPosts } = useContext(AppContext);

    useEffect(() => {
        fetch('/posts')
        .then(res => res.json())
        .then((data) => setPosts(data))
        .catch(err => console.log(err));
    }, []);

    const handleDelete = (postId) => {
        fetch(`/posts/${postId}`, {
            method: 'DELETE',
        })
        .then((res) => res.json())
        .then((data) => {
            setPosts((prevPosts) => {
                const updatedPosts = prevPosts.filter((post) => post.id !== postId);
                return updatedPosts;
            });
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="bg-gradient-animation min-h-screen flex flex-col justify-start items-center">
        <div className="mt-8 text-center">
        <PostsForm />
          <div className="mb-4">
          </div>

          {posts.map((post) => (
          <div key={post.id} className="flex flex-col items-center mt-10">
            <h2 className="text-2xl font-bold mb-4 text-center text-black">Community Posts</h2>
            <p className="text-xl font-bold mb-4 text-center text-black">Title: {post.title}</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Content: {post.body}</p>
            <p className="text-xl font-bold mb-4 text-center text-black">Date: {post.date}</p>
        
            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
          </div>
          </div>
    )
}

export default Posts