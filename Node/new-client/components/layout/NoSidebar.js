import { Box } from '@chakra-ui/react'
import React from 'react'

function NoSidebar(props) {
  return (
    <Box padding={'1rem'}>
      {props.children}
    </Box>
  )
}

export default NoSidebar