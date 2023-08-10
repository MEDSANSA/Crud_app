import { useContext, useEffect } from 'react';
import { GlobalContext } from './context/GlobalContainer';
import { Button, Box, Container, FormControl, Table, Thead, Tbody, Tr, Th, TableContainer, } from '@chakra-ui/react';
import Row from './components/Row';
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import Drawer from './components/Drawer';
import DrawerBox from './components/Drawer';


function App() {
  const { users, fetchUsers, isOpen, onOpen, onClose } = useContext(GlobalContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="App">
      <Container maxW={'full'} p="4" fontSize={'18px'}>
        <Box rounded="lg" boxShadow="base" p="4">
          <box mt="2" gap={'2'} mb="4" display={'flex'}>
            <FormControl >
              <input type="text" size="md" />
            </FormControl>
            <Button
              position={"right"}
              colorScheme='teal'
              variant='solid'
              maxW={"300px"}
              minW={"150px"}
              fontSize={"20px"}
              leftIcon={<AiOutlineSearch />}>Search</Button>
          </box>
        </Box>
        <box>
          <Box rounded="lg" boxShadow="base" mt="5">
            <box p="4" justifyContent="space-between" display={'flex'}>
              <text fontSize="xl" fontWeight="bold">
                liste des utilisateur
              </text>
              <Button
                colorScheme='teal'
                variant='solid'
                maxW={"300px"}
                minW={"150px"}
                fontSize={"20px"}
                leftIcon={<AiOutlinePlus />}
                onClick={onOpen}>Add user</Button>
            </box>
            <TableContainer>
              <Table variant='simple'>
                <Thead>
                  <Tr>
                    <Th>Avatar</Th>
                    <Th>Name</Th>
                    <Th>Email</Th>
                    <Th>Password</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {
                    users?.map((user) => {
                      return (
                        <Row key={user.id} user={user} />
                      )
                    })
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </box>
        <DrawerBox />
      </Container >
    </div >
  );
}

export default App;
