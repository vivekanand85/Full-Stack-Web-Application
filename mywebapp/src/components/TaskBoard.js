import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const taskId = result.draggableId;
        const newStatus = result.destination.droppableId;

        try {
            await axios.put(`http://localhost:5000/api/tasks/${taskId}/status`, { status: newStatus });
            fetchTasks(); // Refresh tasks after updating status
        } catch (err) {
            alert('Error updating task status');
        }
    };

    const columns = {
        Pending: tasks.filter((task) => task.status === 'Pending'),
        Completed: tasks.filter((task) => task.status === 'Completed'),
        Done: tasks.filter((task) => task.status === 'Done'),
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {Object.keys(columns).map((status) => (
                    <Droppable droppableId={status} key={status}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    width: '30%',
                                    minHeight: '300px',
                                    border: '1px solid gray',
                                    padding: '10px',
                                }}
                            >
                                <h3>{status}</h3>
                                {columns[status].map((task, index) => (
                                    <Draggable draggableId={task._id} index={index} key={task._id}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={{
                                                    padding: '10px',
                                                    margin: '10px 0',
                                                    backgroundColor: 'lightgray',
                                                    ...provided.draggableProps.style,
                                                }}
                                            >
                                                <p>{task.name}</p>
                                                <small>{task.description}</small>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
