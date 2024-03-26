import { Box, Button, Input } from '@chakra-ui/react';
import React, { useState } from 'react';


function TaskForm({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignee, setAssignee] = useState('');
    const [priority, setPriority] = useState('P0');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            title,
            description,
            startDate: new Date().toISOString(),
            status: 'Pending',
            assignee,
            priority
        };
        onAddTask(newTask);
        setTitle('');
        setDescription('');
        setAssignee('');
        setPriority('P0');
    };

    return (
        <Box>
            <form onSubmit={handleSubmit} style={{display:'flex', flexDirection:'column', gap:'20px'}}>
                <Box display={'flex'} gap={'30px'}>
                    Title:
                    <Input
                        w={'200px'}
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Box>

                <Box display={'flex'} gap={'30px'}>
                    Description:
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Box>
                <Box display={'flex'} gap={'30px'}>
                    Assignees:
                    <Input
                    w={'200px'}
                        type="text"
                        placeholder="Assignee"
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                    />
                </Box>
                <Box display={'flex'} gap={'30px'}>
                    Priority:
                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="P0">P0</option>
                        <option value="P1">P1</option>
                        <option value="P2">P2</option>
                    </select>
                </Box>
                <Button bg={'blue'} type="submit">Add Task</Button>
            </form>
        </Box>
    );
}

export default TaskForm;
