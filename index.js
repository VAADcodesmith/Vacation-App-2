import React from 'react';
import { createRoot, render } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app.jsx';

const root = createRoot(document.getElementById('root'));

  root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  );


  // return (
  //   <Flex minHeight="100vh" alignItems="center" justifyContent="center">
  //     <Box bg="brand.bg" p={5} borderRadius="10px">
  //       <Heading color="brand.text" mb={5}>Vacation - Destination</Heading>
  //       <FormControl as="form" onSubmit={handleLogin} mb={5} borderRadius="10px">
  //         <Input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" mb={3} />
  //         <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" mb={3} />
  //         <Button type="submit" colorScheme="brand">Log in</Button>
  //         <Button onClick={handleSignup} colorScheme="brand" mt={3}>Sign Up</Button>
  //       </FormControl>
  //       {errorMessage && <Text color="red.500">{errorMessage}</Text>}
  //     </Box>
  //   </Flex>
  // );
