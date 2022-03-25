import React, { useEffect, useRef, useState } from 'react'
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Button, Container, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, Flex, Input, Skeleton, StackDivider, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUser } from '../actions/userActions';
import Userloading from './UserLoading';
import UserListItem from './UserListItem';
import { USER_SEARCH_RESET } from '../constants/userConstants';
import { createOneToOneChat } from '../actions/chatActions';

const SidebarCreateChat = ({isOpenCreateChat, onCloseCreateChat}) => {
    const btnRef = useRef()
    const [search, setSearch] = useState("")
    const dispatch = useDispatch()
    const userSearch = useSelector(state => state.userSearch)
    const { loading, users, error } = userSearch 
    const inputHandler = (e) => {
        setSearch(e.target.value)
    }
    const chatOpener = (user) => {
        dispatch(createOneToOneChat(user._id))
        onCloseCreateChat()
        dispatch({type: USER_SEARCH_RESET})
    }
    useEffect(() => {
        if(search !== "") {
            dispatch(searchUser(search))
        } else{
            dispatch({type: USER_SEARCH_RESET})
        }
    }, [search])
    
    return (
        <Drawer
            isOpen={isOpenCreateChat}
            placement='left'
            onClose={onCloseCreateChat}
            initialFocusRef={btnRef}
            size='sm'
            >
            <DrawerContent shadow="none" w='25%' maxW='25%'>
                <DrawerHeader>
                    <Flex>
                        <Button variant="flushed" onClick={() => {onCloseCreateChat(); setSearch(""); dispatch({type: USER_SEARCH_RESET})}} _focus={{outline: "none"}}>
                            <ArrowBackIcon/>
                        </Button>
                    </Flex>
                </DrawerHeader>
                <DrawerBody>
                    <Container>
                        <Input variant="filled" placeholder='Type here...' borderRadius="20px" mb={5} value={search} onChange={inputHandler} ref={btnRef}/>
                    </Container>
                        <VStack spacing={2}>
                            {loading ? <Userloading/> : (
                                users.map(user => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        initiateChat={chatOpener}
                                    />
                                ))
                            )}
                        </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    )
}

export default SidebarCreateChat 
