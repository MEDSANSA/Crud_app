import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import the ui designer
import { ChakraProvider } from '@chakra-ui/react';
//import the global container
import Container from './context/GlobalContainer';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <Container>
      <App />
    </Container>
  </ChakraProvider>
);
