import React from 'react'
import { Avatar, Box, Flex, Spacer, Text } from '@chakra-ui/react'
import { useSelector } from 'react-redux'

const ChatListItem = ({id, name, displayPicture, lastMessage, timeStamp, initiateChat, openContext, bg, hover}) => {
    return (
        <Flex w='100%' px={2} py={3} flexDirection='row' borderRadius='10px' _hover={{backgroundColor: hover}} bg={bg} onClick={() => initiateChat(id)} onContextMenu={() => openContext(id)}>
                <Box mr={4} ml={1}>
                    <Avatar name={name} src={displayPicture} backgroundColor="#DADADA" />
                </Box>
                <Box as='Flex' justifyContent='center' width='500px'>
                    <Flex justifyContent="space-between">
                        <Box fontSize="lg" isTruncated>{name}</Box>
                        <Spacer/>
                        <Box fontSize="xs" color="blackAlpha.400">{timeStamp.split('.')[0]}</Box>
                    </Flex>
                    <Text fontSize="sm" color="blackAlpha.800">{lastMessage}</Text>
                </Box>
            </Flex>
    )
}

export default ChatListItem