import React from 'react'
import { Avatar, Box, Flex, IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

const UserBadgeItem = ({participant, strikeOff}) => {
    const { name, displayPicture } = participant
    return (
        <Flex alignItems='center' my={2}>
            <Avatar size='xs' src={displayPicture}/>
            <Box ml={1}>
                {name}
            </Box>
            <IconButton variant='ghost' size='xs' ml={1} onClick={() => strikeOff(participant._id)}><CloseIcon/></IconButton>
        </Flex>
    )
}

export default UserBadgeItem