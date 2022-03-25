import React from 'react';
import { Container, Skeleton, Stack } from '@chakra-ui/react';

const Userloading = () => {
    return (
        <Container my={5}>
            <Stack>
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
                <Skeleton height='40px' />
            </Stack>
        </Container>
    )
}

export default Userloading
