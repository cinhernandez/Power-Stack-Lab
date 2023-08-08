import React, { useContext } from 'react';
import { AppContext } from '../AppContext';

const PostsForm = () => {
    const { title, setTitle, body, setBody, date, setDate, setPosts } = useContext(AppContext);



    const handleCreate = () => {
        const newPost = {
            title,
            body,
            date,
          
        };
     
        fetch('/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPost),
            credentials: 'include',
        })
        .then((res) => res.json())
        .then((createdPost) => {
          setPosts((prevPosts) => [...prevPosts, createdPost]);


           // Reset form fields
        setTitle('');
        setBody('');
        setDate('');

        
      })
    
      
  }

    const handleSubmit = async (e) => {
        e.preventDefault();
          handleCreate();
        }
      

       
     

    return (
       
        <div className="w-full mx-auto bg-white p-6 rounded-lg shadow-lg mt-12  ">
        <h2 className="text-2xl font-bold mb-4 text-center text-black mt-1"> Create Community Post</h2>
        <div className="mb-4 space-y-4">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="block text-sm font-medium">Title:</label>
          <input
            type="text"
            id="setTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
    
          <label htmlFor="body" className="block text-sm font-medium">Comment:</label>
          <textarea
            type="text"
            id="setBody"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500" >
        </textarea>
    
          <label htmlFor="date" className="block text-sm font-medium">Date Submitted:</label>
          <input
            type="date"
            id="setDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></input>
    
        
          <div className='w-full border-b border-white mb-4'></div>
          <button type="submit" className="w-full bg-gradient-to-r from-red-500 to-black text-white font-semibold py-2 px-4 rounded hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Submit
          
          </button>
        </form>
        </div>
        </div>
      
    )

    

}

export default PostsForm