// import React from 'react'
// import { Box, Heading, Flex, Divider, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
// import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
// import { useState } from 'react';
// // import ActionModal from '../modal/Modal';
// import ProjectModal from '../modal/ProjectModal';

// const ViewProjDetails = ({allListedProjects}) => {
 
//     const [isOpen, setIsOpen] = useState(false)
//     const [id, setId] = useState('')
//     const [description, setDescription] = useState('')
//     const [company, setCompany] = useState('')
//     const [rate, setRate] = useState('')
//     const [totalHours, setTotalHours] = useState('')
//     const [conversionRate, setConversionRate] = useState('')

//   return (
//     <>
//     <Flex flexDirection="column">
//         <Flex alignItems='center' justifyContent='flex-start' mt='1em'>
//           <Box>
//             <Heading size='md' color='#34495E'>View Project Details</Heading>
//           </Box>
//         </Flex>
//         <Divider mt="1em" borderColor="blue.500" borderWidth="0.1em" width="55em" />
//       </Flex>
//       <Flex alignItems='center' justifyContent='center' margin={'2rem 0'}> 
//                 <TableContainer sx={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', maxWidth: '100%'}} w="55em" >
//                     <Table variant='simple' colorScheme='gray'>
//                         <Thead>
//                             <Tr>
                               
//                                 <Th sx={{ fontSize: '0.8rem', color: '#0b0e37db' }}>Description</Th>
//                                 <Th sx={{ fontSize: '0.8rem', color: '#0b0e37db' }}>Company</Th>
//                                 <Th sx={{ fontSize: '0.8rem', color: '#0b0e37db' }}>Rate</Th>
//                                 <Th sx={{ fontSize: '0.8rem', color: '#0b0e37db' }}>Total Hour</Th>
//                                 <Th sx={{ fontSize: '0.8rem', color: '#0b0e37db' }}>Conversion Rate</Th>
//                                 <Th sx={{ fontSize: '0.8rem', color: '#0b0e37db' }} colSpan={2} p={1.5}>Action</Th>
//                             </Tr>
//                         </Thead>
//                         <Tbody>
//                             {allListedProjects.map((project, indx) => (
//                                 <Tr key={indx} h='0.2rem' fontSize='sm'>
                                   
//                                     <Td>{project.description}</Td>
//                                     <Td>{project.company}</Td>
//                                     <Td>{project.rate}</Td>
//                                     <Td>{project.totalHours}</Td>
//                                     <Td>{project.conversionRate}</Td>
//                                     <Td cursor={'pointer'} p={0}> 
//                                        <EditIcon color={'blue.500'}
//                                         onClick={() => {
//                                             setIsOpen(true)
//                                             setId(project._id)
//                                             setDescription(project.description)
//                                             setCompany(project.company)
//                                             setRate(project.rate)
//                                             setTotalHours(project.totalHours)
//                                             setConversionRate(project.conversionRate)
//                                         }}
//                                         />
//                                     </Td>
//                                     <Td cursor={'pointer'} p={0}>
//                                         <DeleteIcon color={'red.500'}/>
//                                     </Td>
//                                 </Tr>
//                             ))}
//                         </Tbody>
//                     </Table>
//                 </TableContainer>
//             </Flex>
//             {/* <ActionModal isOpen={isOpen} onClose={setIsOpen} id={id} name={name} gstin={gstin} address={address} setName={setName} setGSTIN={setGSTIN} setAddress={setAddress} /> */}
//      <ProjectModal isOpen={isOpen} onClose={setIsOpen}  />
//     </>
//   )
// }

// export default ViewProjDetails;  

import React from 'react'

export default function ViewProjDetails() {
  return (
    <div>ViewProjDetails</div>
  )
}
