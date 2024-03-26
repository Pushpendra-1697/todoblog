import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, Avatar, Input } from '@chakra-ui/react';
import { RxCrossCircled } from "react-icons/rx";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find(task => task.id === taskId);
    if (taskToDelete && taskToDelete.status !== 'Completed') {
      setTasks(tasks.filter(task => task.id !== taskId));
    } else {
      alert('Completed tasks cannot be deleted');
    }
  };

  const updateTask = (taskId, newStatus, newPriority) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          status: newStatus,
          priority: newPriority
        };
      }
      return task;
    }));
  };


  return (
    <Box className="App" fontFamily={'Poppins'} minH={'100vh'} bgGradient="linear(to-r, red.100, blue.100)" display={'flex'} flexDirection={'column'} gap={'20px'} padding={'30px'}>
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Heading size={'lg'}>Task Board</Heading>
        <Avatar
          size={'sm'}
        />
      </Box>

      <Box border={'2px solid white'} boxShadow={'md'} borderRadius={'7px'} minH={'80vh'} p={'20px'} display={'flex'} flexDirection={'column'} gap={'30px'}>
        <Box display={'flex'} flexDirection={{ base: 'column', sm: 'column', md: 'row', lg: 'row', xl: "row", "2xl": 'row' }} gap={'10px'} justifyContent={'space-between'} alignItems={'center'}>
          <Box display={'flex'} flexDirection={'column'} gap={'20px'}>
            <Box display={'flex'} flexDirection={{ base: 'column', sm: "column", md: 'row', lg: 'row-reverse', xl: 'row', '2xl': 'row' }} alignItems={'center'} gap={'20px'}>
              <p>Filter By:</p>
              <Input bg={'white'} placeholder='Assignee Name' />
              <select style={{ padding: '7px 5px', borderRadius: '5px' }}>
                <option value={''}>Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
              <Input bg={'white'} type='date' /> To
              <Input bg={'white'} type='date' />
            </Box>
            <Box display={{ base: 'none', sm: 'none', lg: 'flex', md: 'flex', xl: 'flex', "2xl": 'flex' }} alignItems={'center'} gap={'20px'}>
              <p>Sort By:</p>
              <select style={{ padding: '7px 5px', borderRadius: '5px' }}>
                <option value={''}>Priority</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </Box>
          </Box>
          <Button onClick={onOpen} bg={'blue.600'} fontSize={'15px'} color={'white'}>Add New Task</Button>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>CREATE A TASK</ModalHeader>
            <ModalCloseButton as={RxCrossCircled} background={'none'} cursor={'pointer'} size={'sm'} />
            <ModalBody display={'flex'} justifyContent={'center'} alignItems={'center'} bgGradient="linear(to-r, red.100, blue.100)">
              <TaskForm onAddTask={addTask} />
            </ModalBody>
          </ModalContent>
        </Modal>
        <Box overflowX={'auto'}>
          <TaskList tasks={tasks} onDeleteTask={deleteTask} onUpdateTask={updateTask} />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
