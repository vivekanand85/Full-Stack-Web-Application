import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Feed = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts');
            setPosts(response.data);
        } catch (err) {
            alert('Error fetching posts');
        }
    };

    return (
        <div>
            <h2>Feed</h2>
            {posts.map((post) => (
                <div key={post._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <img src={post.imageUrl} alt="Post" style={{ width: '100%', maxHeight: '300px' }} />
                    <h3>{post.caption}</h3>
                    <p>Posted by: {post.user?.name || 'Anonymous'}</p>
                </div>
            ))}
        </div>
    );
};

export default Feed;
