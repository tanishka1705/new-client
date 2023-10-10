import { Box, Divider, Flex, HStack, Heading, Card, CardHeader, CardBody } from '@chakra-ui/react'
import React from 'react'

const Cards = () => {
    return (
        <>
            <Flex flexDirection="column">
                <Flex alignItems='center' justifyContent='flex-start' mt='1em'>
                    <Box>
                        <Heading size='md' color='#34495E'>Welcome to Your Dashboard!</Heading>
                    </Box>
                </Flex>
                <Divider mt="1em" borderColor="blue.500" borderWidth="0.1em" width="55em" />
            </Flex>
            <Flex alignItems='center' justifyContent='center' margin={'2rem 0'}>
                <HStack spacing={7}>
                    <Card w='17em' style={{ backgroundImage: `url('/images/card.jpg')`, backgroundSize: 'cover' }}>
                        <CardHeader color='white'>Total Number of Projects</CardHeader>
                        <CardBody>
                            <Heading color='white'>23</Heading>
                        </CardBody>
                    </Card>
                    <Card w='17em' style={{ backgroundImage: `url('/images/cardd2.jpg')`, backgroundSize: 'cover' }}>
                        <CardHeader color='white'>Total Number of Companies</CardHeader>
                        <CardBody>
                            <Heading color='white'>23</Heading>
                        </CardBody>
                    </Card>
                    <Card w='18em' style={{ backgroundImage: `url('/images/card3.jpg')`, backgroundSize: 'cover' }}>
                        <CardHeader color='white'>Invoice Generated in Last 7 days</CardHeader>
                        <CardBody>
                            <Heading color='white'>23</Heading>
                        </CardBody>
                    </Card>
                </HStack>
            </Flex>
        </>
    )
}

export default Cards