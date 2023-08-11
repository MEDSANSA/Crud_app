import React from 'react';
import { Box, Flex, Icon, useColorModeValue, Text } from '@chakra-ui/react';
import { AiOutlineUser, AiOutlineCalendar, AiOutlineHome } from 'react-icons/ai';


const LinkItems = [
    { name: 'Home', icon: AiOutlineHome , url: "http://localhost:5000/users"},
    { name: 'Utilisateur', icon: AiOutlineUser , url: "http://localhost:3000/users"},
    { name: 'Congé', icon: AiOutlineCalendar , url: ""},
];

const NavItem = ({ icon, children , url}) => {
    return (
        <Box as="a" href={url} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex align="center" p="4" mx="4" borderRadius="lg" role="group" cursor="pointer" _hover={{ bg: '#00acee', color: 'white', }}>
                {icon && (
                    <Icon mr="4" fontSize="16" _groupHover={{ color: 'white', }} as={icon} />
                )}
                {children}
            </Flex>
        </Box>
    );
};

const SidebarContent = () => {
    return (
        <Box bg={useColorModeValue('white', 'gray.900')} borderRight="1px" borderRightColor={useColorModeValue('gray.200', 'gray.700')} w={{ base: 'full', md: 60 }} pos="flex" h="full" >
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Crud App
                </Text>
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} url={link.url}>
                    {link.name}
                </NavItem>
            ))}
        </Box>
    );
};

export default function SimpleSidebar() {
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent />
            <Box ml={{ base: 0, md: 60 }} p="2">
                {/*space */}
            </Box>
        </Box>
    );
}