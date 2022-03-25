import React, {useState, useEffect, useRef} from 'react'
import { EditIcon, SearchIcon } from '@chakra-ui/icons'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Avatar, Box, Button, Container, Flex, Heading, Icon, Input, InputGroup, InputLeftElement, Menu, MenuButton, MenuItem, MenuList, Spacer, VStack } from '@chakra-ui/react'
import ChatListItem from '../ChatListItem'
import Userloading from '../UserLoading'
import { useDispatch, useSelector } from 'react-redux'
import { CHAT_CURRENT_RESET, CHAT_CURRENT_SET } from '../../constants/chatConstants'
import { fetchAllChats } from '../../actions/chatActions'
import { logout } from '../../actions/userActions'
import { getReciever } from '../../utils/chatLogics'
import { MESSAGE_ALL_LIST_RESET } from '../../constants/messageConstants'
import { Link } from 'react-router-dom'
import groupIcon from '../../img/groupIcon.png'

const Box1 = ({isOpen, onOpen, onClose, isOpenCreateChat, onOpenCreateChat, onCloseCreateChat, isOpenCreateGroupChat, onOpenCreateGroupChat, onCloseCreateGroupChat}) => {
    const githubLink = 'https://www.github.com/bhavyawahie'
    const avatarIconURL = "https://www.clevelanddentalhc.com/wp-content/uploads/2018/03/sample-avatar.jpg"
    const [localSearch, setLocalSearch] = useState("")
    const localSearchInput = useRef(null)
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const chatAllList = useSelector(state => state.chatAllList)
    const { loading, chats, error } = chatAllList
    const chatOneToOneCreate = useSelector(state => state.chatOneToOneCreate)
    const {loading: createChatLoading, chat: createdChat, error: createChatError} = chatOneToOneCreate
    const messageSend = useSelector(state => state.messageSend)
    const { message } = messageSend
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const { currentChat } = chatCurrentSet
    useEffect(() => {
        if(userInfo){
            dispatch(fetchAllChats(localSearch))
        }
    }, [createdChat, localSearch, message])
    const logoutHandler = () => {
        dispatch(logout())
    }
    const searchButtonClickHandler = () => {
        localSearchInput.current.focus()
    }
    const chatOpener = (chatId) => {
        if(currentChat && chatId !== currentChat._id){
            dispatch({type: MESSAGE_ALL_LIST_RESET})
        }
        dispatch({type: CHAT_CURRENT_RESET})
        dispatch({type: CHAT_CURRENT_SET, payload: chats.find(chat => chat._id === chatId)})
    }
    return (
        <Box w="25%" minWidth='25%'>
                <Flex flexDirection="column" mt={2}>
                    <Container py={2}>
                        <Flex flexDirection="row">
                            <Box py={1} pr={2}>
                                    <Avatar as='button' name="sample user" src={userInfo.displayPicture} boxSize="40px" borderRadius="50%" onClick={onOpen} _focus={{outline: 'none'}}/>            
                            </Box>
                            <Heading d={{base: "none", lg: "flex"}} size="lg" py={1}>Chats</Heading>
                            <Spacer/>
                            <Button onClick={onOpenCreateChat} variant='flush' w='1' borderRadius="full" bgColor="#EDF2F7"><EditIcon/></Button>
                            <Box>
                                <Flex p={2}>
                                    <Menu borderRadius="50%" placement="left-end" offset={[14,-5]}>
                                        <MenuButton><Icon as={MoreVertIcon}/></MenuButton>
                                        <MenuList  minWidth='170px'>
                                            <MenuItem color="blackAlpha.600" onClick={onOpenCreateGroupChat}>New Group</MenuItem>
                                            <MenuItem color="blackAlpha.600" onClick={logoutHandler}>Logout</MenuItem>
                                            <Link to={{pathname: githubLink}} target='_blank'>
                                                <MenuItem color="blackAlpha.600">Contact Us</MenuItem>
                                            </Link>
                                        </MenuList>
                                    </Menu>
                                </Flex>
                            </Box>
                        </Flex>
                    </Container>
                    <Container>
                        <InputGroup my={2} variant='filled'>
                            <InputLeftElement borderRadius="25px"><Button variant="flush" onClick={searchButtonClickHandler} _focus={{outline: "none"}}><SearchIcon color="blackAlpha.400"/></Button></InputLeftElement>
                            <Input ref={localSearchInput} placeholder="Search" borderRadius="25px" onChange={(e) => setLocalSearch(e.target.value)}/>
                        </InputGroup>
                    </Container>
                    <VStack spacing={0} mt={2} px={2} overflowY='scroll' height='82vh'>
                            {loading ? <Userloading/> : (
                                chats.map(chat => (
                                    <ChatListItem
                                        key={chat._id}
                                        id={chat._id}
                                        name={chat.isGroupChat ? chat.chatName : getReciever(userInfo, chat.users).name}
                                        displayPicture={chat.isGroupChat? groupIcon : getReciever(userInfo, chat.users).displayPicture}
                                        lastMessage={chat.lastMessage ? chat.isGroupChat ? `${chat.lastMessage.sender.name}: ${chat.lastMessage.content}`: chat.lastMessage.content : null}
                                        timeStamp={chat.lastMessage ? chat.lastMessage.createdAt : ""}
                                        initiateChat={chatOpener}
                                        openContext={() => alert(`clicked (right)`)}
                                        bg={currentChat === chat ? '#cee5f2' : '#FFF'}
                                        hover={currentChat === chat ? "" : "#EDF2F7"}
                                    />
                                ))
                            )}
                    </VStack>        
                </Flex>
            </Box>
    )
}

export default Box1