import { Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Button, Stack, } from '@chakra-ui/react'
import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalContainer';
import Inputs from './Inputs';


export default function DrawerBox() {

    const { isOpen, onOpen, onClose, addUser, errors } = useContext(GlobalContext);

    const [form, setForm] = useState({});

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const onAdd = () => {
        addUser(form, setForm);
    }

    return (
        <>
            <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Create / Update your account</DrawerHeader>

                    <DrawerBody>
                        <Stack spacing={"24px"}>
                            <Inputs name="name" onChangeHandler={onChangeHandler} errors={errors?.name} />
                            <Inputs name="email" onChangeHandler={onChangeHandler} errors={errors?.email} />
                            <Inputs name="password" onChangeHandler={onChangeHandler} errors={errors?.password} />
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='blue' onClick={() => onAdd()}>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}