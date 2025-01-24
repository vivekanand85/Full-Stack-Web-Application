import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ fetchPosts }) => {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('caption', caption);
        formData.append('image', image);
        formData.append('userId', 'user_id_here'); // Replace with actual user ID

        try {
            await axios.post('http://localhost:5000/api/posts/create', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            fetchPosts(); // Refresh posts
        } catch (err) {
            alert('Error creating post');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Write a caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                required
            />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
            />
            <button type="submit">Post</button>
        </form>
    );
};

export default CreatePost;
