import axios from "axios";
import { useState } from "react";

const ResetPassword = ({ token }) => {
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password });
            alert('Password reset successful!');
        } catch (err) {
            alert('Error resetting password');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="password" placeholder="Enter new password" onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">Reset Password</button>
        </form>
    );
};


export default ResetPassword;