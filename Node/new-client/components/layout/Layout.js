import React, { Fragment } from 'react'
import Sidebar from './Sidebar'
import { Box, Flex } from '@chakra-ui/react'
import Header from './Header'

export default function Layout(props) {
  return (
    <>
      <Header />
      <Flex>
        <Sidebar />
        <Box padding={'1rem'}>
          {props.children}
        </Box>
      </Flex>
    </>
  )
}
