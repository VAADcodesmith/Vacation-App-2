import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Map from './Map.jsx';
import theme from '../styles/theme.js'
import { ChakraProvider } from '@chakra-ui/react';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/map' element={<Map/>} />
      </Routes>
    </ChakraProvider>
  );
};