import React, { useState } from 'react';
import { Box, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { RxCrossCircled } from "react-icons/rx";

const UpdateTask = ({ task, onUpdateTask }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [status, setStatus] = useState(task?.status);
    const [priority, setPriority] = useState(task?.priority);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateTask(task.id, status, priority);
    };

    const handleReset = () => {
        setPriority(task?.priority);
        setStatus(task?.status);
    };

    return (
        <Box borderBottom={'2px solid white'}>
            <Text cursor={'pointer'} onClick={onOpen}>Edit</Text>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>EDIT TASK</ModalHeader>
                    <ModalCloseButton as={RxCrossCircled} background={'none'} cursor={'pointer'} size={'sm'} />
                    <ModalBody bgGradient="linear(to-r, red.100, blue.100)" display={'flex'} flexDirection={'column'} gap={'10px'}>
                        <Box pt={'10px'} pb={'10px'}>
                            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <Box display={'flex'} gap={'30px'}>
                                    Title:
                                    <Input
                                        w={'200px'}
                                        type="text"
                                        placeholder="Title"
                                        value={task?.title}
                                        readOnly
                                    />
                                </Box>

                                <Box display={'flex'} gap={'30px'}>
                                    Description:
                                    <Textarea
                                        placeholder="Description"
                                        value={task?.description}
                                        readOnly
                                    />
                                </Box>
                                <Box display={'flex'} gap={'30px'}>
                                    Assignees:
                                    <Input
                                        w={'200px'}
                                        type="text"
                                        placeholder="Assignee"
                                        value={`@${task?.assignee}`}
                                        readOnly
                                    />
                                </Box>
                                <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                                    <Box>
                                        Priority:
                                        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: '3px 10px', borderRadius: '5px', border: '1px solid black', marginLeft: '7px' }}>
                                            {task && (
                                                <option value={priority}>{priority}</option>
                                            )}
                                            {priority !== "P0" && (
                                                <option value="P0">P0</option>
                                            )}
                                            {priority !== "P1" && (
                                                <option value="P1">P1</option>
                                            )}
                                            {priority !== "P2" && (
                                                <option value="P2">P2</option>
                                            )}
                                        </select>
                                    </Box>
                                    <Box>
                                        Status:
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: '3px 10px', borderRadius: '5px', border: '1px solid black', marginLeft: '7px' }}>
                                            {task && (
                                                <option value={status}>{status}</option>
                                            )}
                                            {status !== "Pending" && (
                                                <option value="Pending">Pending</option>
                                            )}
                                            {status !== "In Progress" && (
                                                <option value="In Progress">In Progress</option>
                                            )}
                                            {status !== "Completed" && (
                                                <option value="Completed">Completed</option>
                                            )}
                                            {status !== "Deployed" && (
                                                <option value="Deployed">Deployed</option>
                                            )}
                                            {status !== "Deferred" && (
                                                <option value="Deferred">Deferred</option>
                                            )}
                                        </select>
                                    </Box>
                                </Box>
                                <Button colorScheme='blue' type="submit">Submit</Button>
                            </form>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleReset}>
                            Reset
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default UpdateTask;