import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import { Box, Flex } from '@chakra-ui/react'

export default function Layout(props) {
  return (
    <Flex>
        <Sidebar />
        <Box padding={'1rem'}>
            {props.children}
        </Box>
    </Flex>
  )
}
