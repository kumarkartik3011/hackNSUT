import React, {useState, useEffect} from 'react'
import Header from '../components/Header'
import { Box, Button, Container, Flex, Heading, Image, Input, Spacer, Stack, useToast, VStack } from '@chakra-ui/react'
import image from '../img/image.png'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import { USER_LOGIN_RESET } from '../constants/userConstants'


const HomeScreen = ({history, location}) => {
    const toast = useToast()
    const [input, setInput] = useState({
        email: "",
        password: ""
    })
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading, userInfo, error} = userLogin
    const changeHandler = (e) => {
        const {name, value} = e.target
        setInput(prevVal => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(input))
    }

    useEffect(() => {
        if(userInfo){
            history.push('/chats')
        }
    }, [userInfo, history]);
    return (
        <>
            <Header location={location}/>
            {error && (() => {
                toast({position: "top-right", title: `${error}`, status: "error", isClosable: true, duration: "4000"}) 
                dispatch({type: USER_LOGIN_RESET})
                })()
            }

            <Flex>
                <Container maxW="container.xl" mt={4}>
                    <Flex>
                        <Flex flexDirection="column">
                            <Box mt={16} ml={10}>
                                <Heading as='h1' size="4xl" className='rainbow' pb={4}>
                                    Hang out,<br /> anytime, <br /> anywhere    
                                </Heading>
                            </Box>
                            <Box mt={12} ml={10}>
                                <VStack>
                                    <Input placeholder='Email Address' type="email" borderRadius="xl" variant="filled" name="email" value={input.email} onChange={changeHandler} />
                                    <Input placeholder='Password' type="password" borderRadius="xl" variant="filled" name="password" value={input.password} onChange={changeHandler} />
                                </VStack>
                            </Box>
                            <Flex mt={4} ml={10}>
                                <Box>
                                    <Button isLoading={loading && true} bg="#9F08FF" color='white' borderRadius="2xl" onClick={submitHandler}>Login</Button>
                                </Box>
                            </Flex>
                        </Flex>
                        <Spacer/>
                        <Box>
                            <Image src={image} boxSize='660px'/>
                        </Box>
                    </Flex>
                </Container>
            </Flex>
        </>
    )
}

export default HomeScreen
