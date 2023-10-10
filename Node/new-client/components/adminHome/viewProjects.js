import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Tbody, Td, Th, Thead, Tr, FormControl } from '@chakra-ui/react'
import { useState } from 'react'
import Alert from '../modal/Alert'
import ProjectUpdate from '../modal/ProjectUpdate'

const ViewProjects = ({ allListedProjects }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [alertisOpen, setAlertIsOpen] = useState(false)
    const [id, setId] = useState('')
    const [cId, setcId] = useState('')
    const [description, setDescription] = useState('')
    const [rate, setRate] = useState({ currency: 'INR', rate: 0 })
    const [projectAmount, setProjectAmount] = useState('')
    const [conversionRate, setConversionRate] = useState('')

    return (
        <>
            <Table variant='simple' colorScheme='gray' size={'md'}>
                <Thead>
                    <Tr>
                        <Th fontSize={'13'} sx={{ color: '#0b0e37db' }}>Description</Th>
                        <Th fontSize={'13'} sx={{ color: '#0b0e37db' }} textAlign={'center'} colSpan={2}>Rate</Th>
                        <Th fontSize={'13'} sx={{ color: '#0b0e37db' }} textAlign='center'>
                            Project <span style={{ display: 'block' }}>Amount</span></Th>
                        <Th fontSize={'13'} sx={{ color: '#0b0e37db' }} textAlign='center'>Conversion <span style={{ display: 'block' }}>Rate</span></Th>
                        <Th fontSize={'13'} sx={{ color: '#0b0e37db' }} textAlign='center'>Project
                            <span style={{ display: 'block' }}>BelongsTo</span>
                        </Th>
                        <Th fontSize={'13'} sx={{ color: '#0b0e37db' }} colSpan={2} p={1.5}>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {allListedProjects?.map((project, indx) => (
                        <Tr key={indx} h='0.2rem' fontSize='sm'>
                            <Td fontWeight={'bolder'} fontSize={'md'}>{project.description}</Td>
                            <Td fontSize='xs'>{project?.rate?.currency}</Td>
                            <Td fontSize='xs'>{project?.rate?.rate}</Td>
                            <Td fontSize='xs' textAlign={'center'}>{project?.projectAmount}</Td>
                            <Td fontSize='xs' textAlign={'center'}>{project?.conversionRate}</Td>
                            <Td fontSize='xs'>{project?.projectBelongsTo?.name}</Td>
                            <Td cursor={'pointer'} p={0}>
                                <EditIcon color={'blue.500'}
                                    onClick={() => {
                                        setId(project?._id)
                                        setDescription(project?.description)
                                        setRate({ currency: project?.rate?.currency, rate: project?.rate?.rate })
                                        setProjectAmount(project?.projectAmount)
                                        setConversionRate(project?.conversionRate)

                                        setIsOpen(true)
                                    }}
                                />
                            </Td>
                            <Td cursor={'pointer'} p={0}>
                                <DeleteIcon color={'red.500'}
                                    onClick={() => {
                                        setId(project?._id)
                                        setcId(project?.projectBelongsTo?._id)
                                        setAlertIsOpen(true)
                                    }}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <ProjectUpdate isOpen={isOpen} onClose={setIsOpen} id={id} cId={cId} description={description} rate={rate} projectAmount={projectAmount} conversionRate={conversionRate} setDescription={setDescription} setRate={setRate} setProjectAmount={setProjectAmount} setConversionRate={setConversionRate} />
            <Alert flag='project' isOpen={alertisOpen} id={id} cId={cId} onClose={setAlertIsOpen} />
        </>
    )
}

export default ViewProjects