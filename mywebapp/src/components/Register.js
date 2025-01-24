
import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        console.log(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Form Data:", formData);
    
        try {
            const response = await axios.post('/api/auth/register', formData);
            console.log("API Response:", response); 
            alert(response.data.message);
        } catch (err) {
            console.error("Error Object:", err); 
    
            if (err.response && err.response.data) {
                alert(err.response.data.message || 'Server error occurred');
            } else {
                alert('Failed to connect to the server. Please check your network or backend.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;
