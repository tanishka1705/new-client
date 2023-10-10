import { Box, HStack, Heading, Text } from '@chakra-ui/react'
import React from 'react'

function SubTotal() {
  return (
   <Box ml='20em' mt='3em'>
    <HStack spacing='7em'>
      <Heading fontSize='xs'>SUBTOTAL</Heading>
      <Text fontSize='xs' fontWeight='bold'>0,0.0</Text>
    </HStack>   
    <HStack spacing='7em' mt={4}>
      <Text fontSize='xs' fontWeight='bold'>CGST @9%</Text>
      <Text fontSize='xs' fontWeight='bold'>0,0.0</Text>
    </HStack>   
    <HStack spacing='7em'>
      <Text fontSize='xs' fontWeight='bold'>SGST @9%</Text>
      <Text fontSize='xs' fontWeight='bold'>0,0.0</Text>
    </HStack>   
    <HStack spacing='7.5em' backgroundColor={'purple.500'} p={1} mt={4}>
      <Text fontSize='xs' fontWeight='bold' color={'white'}>TOTAL</Text>
      <Text fontSize='xs' fontWeight='bold' color={'white'}>0000,0.0</Text>
    </HStack>   
   </Box>
  )
}

export default SubTotal