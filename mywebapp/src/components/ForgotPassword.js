import axios from "axios";
import { useState } from "react";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            alert('Password reset link sent!');
        } catch (err) {
            alert('Error sending reset link');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Send Reset Link</button>
        </form>
    );
};
export default ForgotPassword;