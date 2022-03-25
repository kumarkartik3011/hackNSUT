import { Box, Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

const MessageLoader = () => {
    return (
        <Flex justifyContent='center'>
            <Box pt={6}>
                <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.400' size='lg'/>
            </Box>
        </Flex>
    )
}

export default MessageLoader