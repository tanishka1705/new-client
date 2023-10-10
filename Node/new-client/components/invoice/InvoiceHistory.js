import React from 'react'
import { Box, Heading, Flex, Divider } from '@chakra-ui/react'

export default function InvoiceHistory() {
  return (
    <Flex flexDirection="column">
          <Flex alignItems='center' justifyContent='flex-start' mt='1em'>
            <Box>
              <Heading size='md' color='#34495E'>Invoice History</Heading>
            </Box>
          </Flex>
          <Divider mt="1em" borderColor="blue.500" borderWidth="0.1em" width="55em" />
    </Flex>
  )
}
