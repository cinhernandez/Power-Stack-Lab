import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const CommentForm = ({ postId, closeForm }) => {
    const { setPosts, comment, setComment } = useContext(AppContext);

    const handleSubmit = (event) => {
        event.preventDefault();


    fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
           credentials: 'include'
        },
        body: JSON.stringify({
          body: comment
        })
      })
      .then(response => response.json())
      .then(data => {
        setPosts(prevPosts => {
          const updatedPosts = prevPosts.map(post => {
            if (post.id === postId) {
              return {...post, comments: [...post.comments, data]};
            } else {
              return post;
            }
          });
          return updatedPosts;
        });
        closeForm();
      })
      .catch(err => console.log(err));
    };
  

    return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Your comment"
        className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
        rows="4"
        required
      ></textarea>
      <button type="submit" className="mt-3 w-full px-3 py-2 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Submit</button>
      <button onClick={closeForm} className="mt-3 w-full px-3 py-2 text-white bg-red-500 rounded-md focus:bg-red-600 focus:outline-none">Cancel</button>
    </form>
    )
}

export default CommentForm
