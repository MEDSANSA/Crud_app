import React, { useContext, useEffect, useState } from 'react';
import { GlobalContext } from './context/GlobalContainer';
import { Button, Box, Container, FormControl, Table, Thead, Tbody, Tr, Th, TableContainer, Input, useColorMode, useColorModeValue, Menu, MenuButton, MenuList, Center, MenuItem, Avatar, Text } from '@chakra-ui/react';
import Row from './components/Row';
import { AiOutlinePlus, AiOutlineSearch } from "react-icons/ai";
import DrawerBox from './components/Drawer';
import SimpleSidebar from './components/SideBar';
import { FaMoon, FaSun } from 'react-icons/fa'

function App() {
  const { users, fetchUsers, SearchUser, onOpen, input, setInput } = useContext(GlobalContext);

  //color state
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    fetchUsers();
  }, []);

  const searchHandler = (input) => {
    SearchUser(input);
  }

  const onchangeHandler = (e) => {
    setInput(e.target.value);
  }

  return (
    <div className="App">
      <Container maxW={'full'} p="4" fontSize={'18px'} display="flex" bg={useColorModeValue('gray.100', 'gray.900')}>
        <SimpleSidebar />
        <Box flex="1">
          <Box rounded="lg" boxShadow="base" p="4">
            <Box mt="2" gap={'2'} mb="4" display={'flex'} justifyContent="flex-end">
              <FormControl flex="1">
                <Input type="text" size="md" width="100%" placeholder="Type your name here..." onChange={onchangeHandler} />
              </FormControl>
              <Button
                colorScheme='twitter'
                variant='solid'
                maxW={"300px"}
                minW={"150px"}
                fontSize={"20px"}
                leftIcon={<AiOutlineSearch />}
                onClick={() => searchHandler()}
              >
                Search
              </Button>
              {/* color mode button */}
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <FaMoon /> : <FaSun />}
              </Button>
              {/* account menu */}
              <Menu>
                <MenuButton as={Button} rounded={'full'} variant={'link'} cursor={'pointer'} minW={0}>
                  <Avatar size={'sm'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <Center>
                    <Avatar size={'2xl'} src={'https://avatars.dicebear.com/api/male/username.svg'} />
                  </Center>
                  <br />
                  <Center>
                    <p>username</p>
                  </Center>
                  <br />
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </Box>
          <Box>
            <Box rounded="lg" boxShadow="base" mt="5">
              <Box p="4" justifyContent="space-between" display={'flex'}>
                <Text fontSize="4xl" as='b'>
                  liste des utilisateur
                </Text>
                <Button
                  colorScheme='twitter'
                  variant='solid'
                  maxW={"300px"}
                  minW={"150px"}
                  fontSize={"20px"}
                  leftIcon={<AiOutlinePlus />}
                  onClick={onOpen}
                >
                  Add user
                </Button>
              </Box>
              <TableContainer>
                <Table variant='simple'>
                  <Thead>
                    <Tr>
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
          </Box>
        </Box>
      </Container>
      <DrawerBox />
    </div>
  );
}

export default App;
