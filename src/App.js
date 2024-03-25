import React, { useState } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
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


  return (
    <div className="App">
      <Button mb={'20px'} onClick={onOpen}>Add New Task</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>CREATE A TASK</ModalHeader>
          <ModalCloseButton as={RxCrossCircled} background={'none'} cursor={'pointer'} size={'sm'} />
          <ModalBody>
            <TaskForm onAddTask={addTask} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <TaskList tasks={tasks} onDeleteTask={deleteTask} />
    </div>
  );
}

export default App;
