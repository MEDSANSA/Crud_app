import { createContext, useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react'
// allows us to pass data through our component trees
export const GlobalContext = createContext();

export default function Container({ children }) {

    const [users, setUsers] = useState([]);
    const [user, setUser] = useState({});
    const [errors, setErrors] = useState([]);
    const [input, setInput] = useState("");
    const toast = useToast();//call the toast message
    const { isOpen, onOpen, onClose } = useDisclosure();

    //back ne9s
    const SearchUser = (input) => {
        fetch(`http://localhost:5000/users/search/${input}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setUsers(data);
        })
        .catch((err) => {
            console.error(err);
        });
    }


    function fetchUsers() {
        fetch('http://localhost:5000/users')
            .then(res => {
                return res.json();
            })
            .then(data => {
                setUsers(data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const addUser = (form, setForm) => {
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form),
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => {
                try {
                    setUsers((user) => [...user, data]);
                    toast({
                        title: 'User Added!',
                        status: 'success',
                        duration: 3000,
                        position: 'bottom',
                    });
                    onClose();
                    setForm({});
                    fetchUsers();
                } catch (err) {
                    setErrors(err.message);
                    console.error(err);
                }
            })
            .catch((err) => {
                setErrors(err.message);
                console.error(err);
            });
    };

    const deleteUser = (id) => {
        fetch(`http://localhost:5000/users/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                setUsers(user => user.filter(user => user._id !== id));
                toast({
                    title: 'User Deleted!',
                    status: 'success',
                    duration: 3000,
                    position: 'bottom',
                });
                fetchUsers();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const findUser = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/users/${id}`);
            const data = await res.json();
            setUser(data);
        } catch (err) {
            setErrors(err.message);
        }
    };


    return (
        <GlobalContext.Provider value={{ users, fetchUsers, SearchUser, deleteUser, addUser, findUser, setUser, isOpen, onOpen, onClose, errors, setErrors,input, setInput }}>
            {children}
        </GlobalContext.Provider>
    )
}