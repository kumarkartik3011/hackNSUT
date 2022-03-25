import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import { Avatar, Box, Button, Flex, Icon, Input, Spinner, Text } from '@chakra-ui/react'
import { fetchAllMessages, sendMessage } from '../../actions/messageActions'
import MessageScrollList from '../MessageScrollList'
import { getReciever } from '../../utils/chatLogics'
import MessageLoader from '../MessageLoader'
import groupIcon from '../../img/groupIcon.png'

const Box2 = ({setSideBox}) => {
    const groupChatImgURL = `https://nirc.icai.org/wp-content/plugins/profilegrid-user-profiles-groups-and-communities/public/partials/images/default-group.png`
    const [messageField, setMessageField] = useState("")
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    const messageSend = useSelector(state => state.messageSend)
    const { message: messageSent, error} = messageSend
    const messageListAll = useSelector(state => state.messageListAll)
    const {loading: loadingMessage, error: errorMessage } = messageListAll
    const chatCurrentSet = useSelector(state => state.chatCurrentSet)
    const {currentChat} = chatCurrentSet
    const sendMessageHandler = () => {
        dispatch(sendMessage(currentChat._id, messageField))
        setMessageField("")
    }
    useEffect(() => {
        if(currentChat){
            dispatch(fetchAllMessages(currentChat._id))
        }
    }, [currentChat])
    return (
        <Box bg="white" w="75%" minWidth="50%" borderLeft="1px solid rgb(229,229,229)">
                { currentChat ? (
                <Flex flexDirection="column" justifyContent='stretch' height='100vh'>
                    <Flex flexDirection="row" justifyContent="flex-start" borderBottom='1px solid rgb(229,229,229)' py={3}>
                            <Flex w='80%' ml={4} onClick={() => setSideBox(true) }>
                                <Box>
                                    <Avatar src={currentChat.isGroupChat ? groupIcon : getReciever(userInfo, currentChat.users).displayPicture} boxSize="2.5rem" borderRadius="50%"></Avatar>
                                </Box>
                                <Text fontSize='lg' ml={3}>{  currentChat.isGroupChat ? currentChat.chatName : getReciever(userInfo, currentChat.users).name}</Text>
                            </Flex>
                    </Flex>
                    <Flex height='83.4%' w='100%'>
                        <Flex w="100%" h="100%" flexDirection='column' overflowY="hidden">
                            {loadingMessage ? <MessageLoader/> : <MessageScrollList/>}
                        </Flex>
                    </Flex>
                    <Flex flexDirection='column' justifyContent='flex-end' mb={3}>
                        <Flex px={2}>
                            <Button variant='flushed' _hover={{backgroundColor: "rgba(229,229,229)"}}><Icon as={InsertEmoticonIcon}/></Button>
                            <Input placeholder="Type a Message" borderRadius='25px' w='90%' value={messageField} onChange={(e) => setMessageField(e.target.value)} onKeyPress={(e) => (messageField.trim() !== ""  && e.key === 'Enter') && sendMessageHandler()}/>
                            <Button onClick={sendMessageHandler} disabled={(messageField === "" || messageField) && true} >Send</Button>
                        </Flex>
                    </Flex>
                </Flex>)
                : <Flex minHeight="100vh" justifyContent="center" alignItems="center" as='Text' fontSize="xl">Click on the chats to get started</Flex>}
            </Box>
    )
}

export default Box2