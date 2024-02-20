import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
  keyframes,
  useStyleConfig
} from "@chakra-ui/react";
import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);

const shakeAnimation = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }
  
  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
`;

const Login = () => {
  const BACKEND_URL = 'http://localhost:3000';
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const inputStyles = useStyleConfig("Input", {});
  if (errorMessage) {
    inputStyles.field.animation = `${shakeAnimation} 0.82s cubic-bezier(.36,.07,.19,.97) both`
  }

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleLogin = event => {
    event.preventDefault();
    if (!username || !password) {
      setErrorMessage('Username and password are required');
      return;
    }

    fetch(`${BACKEND_URL}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (!data.username) {
        setErrorMessage(data.error);
        return alert('Invalid username/password');
      } else {
        navigate('/map');
      }
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  };
  
    const handleSignUp = () => {
      navigate('/signup');
    };


  return (
    <Flex flexDirection="column" width="100wh" height="100vh" backgroundColor="gray.200" justifyContent="center" alignItems="center">
      <Stack flexDir="column" mb="2" justifyContent="center" alignItems="center">
        <Avatar bg="brand.bg" />
        <Heading color="brand.text">Vacation - Destination</Heading>
        <Box minW={{ base: "90%", md: "468px" }} >
          <form onSubmit={handleLogin}>
            <Stack spacing={4} p="1rem" backgroundColor="whiteAlpha.900"boxShadow="md" minH="200px" borderRadius="10px">
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" children={<CFaUserAlt color="gray.300" />}/>
                  <Input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.300" children={<CFaLock color="gray.300" />}/>
                  <Input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>{showPassword ? "Hide" : "Show"}</Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText textAlign="right"/>
              </FormControl>
              {errorMessage && <Text color="red.500">{errorMessage}</Text>}
              <Button borderRadius="9px" type="submit" variant="solid" colorScheme="brand" width="full">Login</Button>
            </Stack>
          </form>
        </Box>
      </Stack>
      <Box>New to us?{" "}
        <Link color="brand.bg" onClick={handleSignUp}>Sign Up</Link>
      </Box>
    </Flex>
  );
}

export default Login;
