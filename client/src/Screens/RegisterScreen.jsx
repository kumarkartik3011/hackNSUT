import React, {useState, useEffect} from 'react'
import { Box, Button, Container, Flex, Heading,  Image,  Input, InputGroup, InputRightElement, Spacer, VStack, useToast, position } from '@chakra-ui/react'
import {ViewIcon, ViewOffIcon} from '@chakra-ui/icons'
import Header from '../components/Header'
import image2 from '../img/image2.png'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'

const RegisterScreen = ({history, location}) => {
    const toast = useToast()
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [visibleButton, setVisibleButton] = useState(false)
    const [visibleButton_2, setVisibleButton_2] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading, userInfo, error} = userRegister
    const inputHandler = (e) => {
        const { name, value } = e.target
        setInput(prevVal => {
            return {
                ...prevVal,
                [name]: value
            }
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(input.password !== confirmPassword) {
            toast({
                position: 'top-right',
                title: "Passwords Do Not Match!",
                status: 'warning',
                isClosable: true
            })
        } else {
            dispatch(register(input))
        }
    }
    useEffect(() => {
        if(userInfo){
            history.push('/chats')
        }
    }, [userInfo, history]);
    return (
        <>
            <Header location={location}/>
            {error && toast({position: "top-right", title: `${error}`, status: "error", isClosable: true})}
            <Flex>
                <Container maxW="container.xl" mt={4}>
                    <Flex mr={14}>
                        <Box mt={16} ml={10}>
                            <Image src={image2} sizes='200px'/>
                        </Box>
                        <Spacer/>
                        <Flex flexDirection="column" mr={10}>
                            <Box mt={16}>
                                <Heading as='h1' size="4xl" className='rainbow-reverse' pb={4}>
                                    Connect<br /> with your <br /> Loved ones!
                                </Heading>
                            </Box>
                            <Box mt={6} mr={10} display='flex' justifyContent="flex-start">
                                <VStack w="100%">
                                    <Input placeholder='Name' type="text" borderRadius="xl" variant="filled" name='name' value={input.name} onChange={inputHandler}/>
                                    <Input placeholder='Email Address' type="email" borderRadius="xl" variant="filled" name='email' value={input.email} onChange={inputHandler}/>
                                    <InputGroup>
                                        <Input placeholder='Password' type={showPassword ? "text" :"password"} borderRadius="xl" variant="filled" name='password' value={input.password} onChange={inputHandler} onFocus={() => setVisibleButton(true)}/>
                                        <InputRightElement width='4.5rem'><Button opacity='33%' size='sm' variant="ghost" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <ViewOffIcon/> : <ViewIcon/>}</Button></InputRightElement>
                                    </InputGroup>
                                    <InputGroup>
                                        <Input placeholder='Confirm Password' type={showConfirmPassword ? "text" :"password"} borderRadius="xl" variant="filled" name='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onFocus={() => setVisibleButton_2(true)}/>
                                        <InputRightElement width='4.5rem'><Button opacity="33%" size='sm' variant="ghost" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>{showConfirmPassword ? <ViewOffIcon/> : <ViewIcon/>}</Button></InputRightElement>
                                    </InputGroup>
                                </VStack>
                            </Box>
                            <Flex mt={4} mr={10}>
                                <Box>
                                    <Button isLoading={loading && true} bg="#F95C8A" color='white' borderRadius="2xl" onClick={submitHandler}>Register</Button>
                                </Box>
                            </Flex>
                        </Flex>
                    </Flex>
                </Container>
            </Flex>
        </>
    )
}

export default RegisterScreen
