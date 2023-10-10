import { Box, Divider, Flex, HStack, Heading, Card, CardHeader, CardBody, Link } from '@chakra-ui/react'
import { useState } from 'react'
import CardItem from './CardItem'
import CardModal from "./CardModal"
import ProjectModal from "./ProjectModal"
import { useRouter } from 'next/router'

const Cards = () => {

    const [isOpen, setIsOPen] = useState(false)
    const [isProjectCardOpen, setisProjectCardOpen] = useState(false)
    const router = useRouter()

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
                    <CardItem title='Create Company' onClick={setIsOPen} />
                    <CardItem title='Create Project' onClick={setisProjectCardOpen} />

                    <Card w='17em' cursor='pointer' style={{ backgroundImage: `url('/images/card.jpg')`, backgroundSize: 'cover' }} onClick={() => router.push('/generate-invoice')}>
                        <CardHeader color='white' fontSize='1.3em' textAlign='center'>Generate Invoice</CardHeader>
                    </Card>
                </HStack>
            </Flex>

            <CardModal isOpen={isOpen} onClose={setIsOPen} />
            <ProjectModal isOpen={isProjectCardOpen} onClose={setisProjectCardOpen} />
        </>
    )
}

export default Cards