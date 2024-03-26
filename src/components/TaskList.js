import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, useDisclosure, Text, Heading, Box, Button } from '@chakra-ui/react';
import React from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import DeleteTask from './DeleteTask';
import UpdateTask from './UpdateTask';

function TaskList({ tasks, onDeleteTask, onUpdateTask }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const statusColumns = ['Pending', 'In Progress', 'Completed', 'Deployed', 'Deferred'];


    function formatDate(timestamp) {
        const date = new Date(timestamp);

        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
        return formattedDate;
    };
    return (
        <Box display={'grid'} gridTemplateColumns={'repeat(5,1fr)'} gap={'30px'}>
            {tasks.length > 0 && statusColumns.map((status) =>
                <Box key={status} display={'flex'} flexDirection={'column'} borderRadius={'7px'} boxShadow={'lg'} minW={'250px'}>
                    <Heading py={'10px'} color={'white'} background={status === "Pending" ? 'beige' : status === "In Progress" ? 'orange' : status === 'Completed' ? 'green' : status === 'Deployed' ? 'blue' : 'bisque'} fontSize={'23px'} borderTopRadius={'7px'} textAlign={'center'}>{status}</Heading>
                    <Box p={'10px'} display={'flex'} flexDirection={'column'} gap={'10px'} bg={'white'}>
                        {tasks.filter((task) => task.status === status).map((task) =>
                            <Box key={task.id} display={'flex'} flexDirection={'column'} gap={'10px'} background={'beige'} p={'5px'} borderRadius={'3px'}>
                                <Box borderBottom={'1px solid black'} p={'5px'} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Heading as={'h3'} size={'23px'}>{task.title}</Heading>
                                    <Text background={'blue'} p={'2px 6px'} borderRadius={'2px'} color={'white'}>{task.priority}</Text>
                                </Box>
                                <Text>{task.description}</Text>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Text>@{task.assignee}</Text>
                                    <Box background={'blue'} p={'3px'} borderRadius={'2px'} color={'white'}>
                                        <BsThreeDotsVertical cursor={'pointer'} onClick={onOpen} />
                                    </Box>
                                </Box>

                                <Modal isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent background={'aliceblue'} borderRadius={'10px'} w={'200px'}>
                                        <ModalCloseButton />
                                        <ModalBody>
                                            <UpdateTask onUpdateTask={onUpdateTask} task={task} />
                                            <DeleteTask onDeleteTask={onDeleteTask} id={task.id} title={task.title} />
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>

                                <Text>Start Date: {formatDate(task.startDate)}</Text>
                                {(task.endDate && task.status === "Completed") && <Text>End Date: {formatDate(task.endDate)}</Text>}
                                <Button isDisabled bg={'blue.600'} fontSize={'15px'} color={'white'}>{task.status}</Button>
                            </Box>
                        )}
                    </Box>
                </Box>
            )}
        </Box>
    );
}

export default TaskList;
