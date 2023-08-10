import { createContext, useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react'
// allows us to pass data through our component trees
export const GlobalContext = createContext();

export default function Container({ children }) {
    //useEffect is a React hook that accepts a callback function with side effects.
    const [users, setUsers] = useState([]);
    const [errors, setErrors]= useState({});
    const toast = useToast();//call the toast message
    const { isOpen, onOpen, onClose } = useDisclosure();


    //fetch data
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

    //ajout data
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
    



    //delete data
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
            })
            .catch((err) => {
                console.error(err);
            });
    };



    return (
        <GlobalContext.Provider value={{ users, fetchUsers, deleteUser, addUser, isOpen, onOpen, onClose, errors, setErrors }}>
            {children}
        </GlobalContext.Provider>
    )
}