import { Avatar, Box, Button, Td, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GlobalContext } from "../context/GlobalContainer";

const Row = ({ user }) => {
    const { deleteUser } = useContext(GlobalContext);

    return (
        <Tr>
            <Td><Avatar name={user.name} /></Td>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{user.password}</Td>
            <Td>
                <Box display={"flex"} gap={"1"}>
                    <Button colorScheme={'blue'}>
                        <AiFillEdit />
                    </Button>
                    <Button colorScheme='red' onClick={() => deleteUser(user.id)} key={user.id}>
                        <AiFillDelete />
                    </Button>
                </Box>
            </Td>
        </Tr>
    );
}
export default Row;