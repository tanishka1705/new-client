import { Box, Heading, Text } from '@chakra-ui/react'
import React from 'react'

function AccountDetails({ user }) {
  return (
    <Box ml='0.2em' mt='0.2em'>
      <Heading fontSize={'xs'}>{user.name}</Heading>
      <Text fontSize='xs' fontWeight='bold'>A/C NO: {user.account.acc_no}</Text>
      <Text fontSize='xs' fontWeight='bold'>BANK: {user.account.bank}</Text>
      <Text fontSize='xs' fontWeight='bold'>IFSC: {user.account.ifsc}</Text>
    </Box>
  )
}

export default AccountDetails