import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Checkbox,
    ToggleButtonGroup,
    ToggleButton,
    Box,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [filter, setFilter] = useState('all'); // all, completed, incomplete

    // Fetch tasks from backend
    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then((res) => res.json())
            .then((data) => setTasks(data))
            .catch((error) => console.error('Error fetching tasks:', error));
    }, []);

    // Add a new task
    const addTask = async () => {
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTask, completed: false }),
        });
        const task = await response.json();
        setTasks([...tasks, task]);
        setNewTask('');
    };

    // Delete a task
    const deleteTask = async (id) => {
        await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' });
        setTasks(tasks.filter((task) => task._id !== id));
    };

    // Toggle task completion
    const toggleCompletion = async (id, completed) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: !completed }),
        });
        const updatedTask = await response.json();
        setTasks(
            tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
        );
    };

    // Handle task filtering
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'completed') return task.completed;
        if (filter === 'incomplete') return !task.completed;
        return true;
    });

    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Todo List
            </Typography>

            {/* Task input */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                <TextField
                    variant="outlined"
                    fullWidth
                    label="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={addTask}
                    sx={{ whiteSpace: 'nowrap' }}
                >
                    Add Task
                </Button>
            </Box>

            {/* Filter toggle buttons */}
            <ToggleButtonGroup
                value={filter}
                exclusive
                onChange={(e, newFilter) => setFilter(newFilter || 'all')}
                fullWidth
                sx={{ mb: 3 }}
            >
                <ToggleButton value="all">Все</ToggleButton>
                <ToggleButton value="completed">Завешеныы</ToggleButton>
                <ToggleButton value="incomplete">Incomplete</ToggleButton>
            </ToggleButtonGroup>

            {/* Task list */}
            <List>
                {filteredTasks.map((task) => (
                    <ListItem
                        key={task._id}
                        secondaryAction={
                            <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteTask(task._id)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <Checkbox
                            checked={task.completed}
                            onChange={() =>
                                toggleCompletion(task._id, task.completed)
                            }
                        />
                        <ListItemText
                            primary={task.title}
                            secondary={task.completed ? 'Completed' : 'Incomplete'}
                        />
                    </ListItem>
                ))}
            </List>

            {/* Footer */}
            <Typography
                variant="caption"
                display="block"
                align="center"
                color="textSecondary"
                sx={{ mt: 4 }}
            >
                Powered by React & Material-UI
            </Typography>
        </Container>
    );
};

export default App;
