import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = ({ fetchTasks }) => {
    const [task, setTask] = useState({ name: '', description: '' });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/tasks/create', task);
            fetchTasks(); 
        } catch (err) {
            alert('Error creating task');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Task Name" onChange={handleChange} required />
            <textarea name="description" placeholder="Task Description" onChange={handleChange}></textarea>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default CreateTask;
