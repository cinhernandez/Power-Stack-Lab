import React, {useEffect, useContext} from "react";
import { AppContext } from "../AppContext";
import PostsForm from "./PostsForm";
import CommentForm from "./CommentForm";

const Posts = () => {
    const { posts, setPosts, likes, setLikes, commentFormPostId, setCommentFormPostId, 
      isLoggedIn } = useContext(AppContext);

    const openCommentForm = (postId) => {
      setCommentFormPostId(postId);
    };

    const closeCommentForm = () => {
      setCommentFormPostId(null);
    };

    useEffect(() => {
      fetch('/posts')
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setPosts(data);
        // Initialize likes from LocalStorage
        const initialLikes = {};
        data.forEach(post => {
          initialLikes[post.id] = Number(localStorage.getItem(`likes-${post.id}`)) || 0;
        });
        setLikes(initialLikes);
      })
      .catch(err => console.log(err));
    }, []);
  
    const handleLike = (postId) => {
      const newLikes = (likes[postId] || 0) + 1;
      setLikes({...likes, [postId]: newLikes});
      localStorage.setItem(`likes-${postId}`, newLikes.toString());
    };


    const handleDelete = (postId) => {
        fetch(`/posts/${postId}`, {
            method: 'DELETE',
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to delete post');
            }
            return res.json();
        })
        .then((data) => {
            setPosts((prevPosts) => {
                const updatedPosts = prevPosts.filter((post) => post.id !== postId);
                return updatedPosts;
            });
        })
        .catch(err => console.log(err));
    };
    

    
    


    return (
    
        <div className="bg-black min-h-screen flex flex-col justify-start items-center animated-gradient">
        <div className="mt-8 text-center w-2/3">
        {isLoggedIn && (
            <PostsForm />
        )}
            <div className="mb-4">
            </div>
            <div className="flex items-center justify-center p-3 max-w-sm mx-auto bg-white rounded-xl shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-4 text-black">Community Forum</h2>
            </div>
            {posts.map((post) => (
            <div key={post.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-10">
            <div className="flex items-center">
            <img src="https://source.unsplash.com/random/200x200/?fitness" alt="Fitness-Placeholder" className="rounded-full h-12 w-12 mr-4" />
                <p className="text-m font-bold mb-4 text-black">@{post.user?.username}</p>
            </div>
                <h2 className="text-xl font-bold mb-2 text-black">Title: {post.title}</h2>
                <p className="text-black">{post.body}</p>
                <p className="text-sm text-gray-700">{post.date}</p>
                <h4 className="text-m font-bold mt-4 mb-2 p-2 m-2 rounded text-white bg-gradient-to-r from-red-500 to-black ">Comments:</h4>
                {post.comments.map((comment) => (
                <div key={comment.id} className="border-2 border-gray-400 p-2 m-2 rounded bg-gray-100 px-4 py-2 mb-2">
                <div className="flex items-center">
                <img src="https://source.unsplash.com/random/200x200/?fitness" alt="Fitness-Placeholder" className="rounded-full h-12 w-12 mr-4" />
                    <p className="text-sm text-blue-500">@{comment.user?.username}</p>
                    </div>
                    <p className= "text-black">{comment.body}</p>
                </div>
                ))} 
    
                <div className="flex items-center justify-between mt-4">
                {isLoggedIn && (
                    <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-gradient-to-r from-red-500 to-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                )}
                    <button
                        onClick={() => handleLike(post.id)}
                        className="bg-gradient-to-r from-red-500 to-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Like 🤍 {likes[post.id]}
                    </button>
                    {isLoggedIn && (
                    <button
                        onClick={() => openCommentForm(post.id)}
                        className="bg-gradient-to-r from-red-500 to-black hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Comment
                    </button>
                    )}

        
                </div>
                {commentFormPostId === post.id && <CommentForm postId={post.id} closeForm={closeCommentForm} />}
            </div>
                   
            ))}
        </div>
        </div>
    )
    
}

export default Posts