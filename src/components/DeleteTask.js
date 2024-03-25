import { Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { RxCrossCircled } from "react-icons/rx";

const DeleteTask = ({ onDeleteTask, id, title }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box>
            <Text cursor={'pointer'} onClick={onOpen}>Delete</Text>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>DELETE TASK</ModalHeader>
                    <ModalCloseButton as={RxCrossCircled} background={'none'} cursor={'pointer'} size={'sm'} />
                    <ModalBody bgGradient="linear(to-r, red, blue.500)" display={'flex'} flexDirection={'column'} gap={'10px'}>
                        <Text>Do You Wish to Delete Task</Text>
                        <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                            <Heading size={'20px'} as={'h3'}>{title}</Heading>
                            <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} gap={'20px'}>
                                <Button background={'blue.600'} color={'white'} onClick={() => onDeleteTask(id)}>Yes</Button>
                                <Button onClick={onClose} background={'blue.600'} color={'white'}>No</Button>
                            </Box>
                        </Box>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default DeleteTask;