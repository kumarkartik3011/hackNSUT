import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Button, Container, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react'
import logo from '../logo.svg'

const Header = ({location}) => {
    return (
        <Flex boxShadow='sm'>
            <Container maxW='container.xl'>
                <Flex>
                    <Box p={4} color='black' display='flex' alignItems='flex-end'>
                        {/* <Image src={logo} boxSize='40px'/> */}
                        <Heading as='h1' size='xl' pl={3}>Vaad</Heading>
                    </Box>
                        <Spacer/>
                    <Box p={4} display='flex'>
                        {/* <Link to='#'>
                            <Text ml={2} p={2}>Lorem</Text>
                        </Link>
                        <Link to='#'>
                            <Text ml={2} p={2}>Ipsum</Text>
                        </Link> */}
                        <Link to='#'>
                            <Text ml={2} p={2}>Privacy</Text>
                        </Link>
                        <Link to={location.pathname === '/' ? '/register' : '/'}>
                            <Button ml={2} p={2} variant='solid' bg='#0084FF' color='#FFFFFF'>{location.pathname === '/' ? "Register": "Login"}</Button>
                        </Link>
                    </Box>    
                </Flex>
            </Container>
        </Flex>
    )
}

export default Header