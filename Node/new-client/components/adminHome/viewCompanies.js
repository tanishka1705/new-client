import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Table, Tbody, Td, Th, Thead, Tr, FormControl } from '@chakra-ui/react'
import { useState } from 'react'
import Alert from '../modal/Alert'
import ActionModal from '../modal/Modal'

const ViewCompanies = ({ allListedCompanies }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [alertisOpen, setAlertIsOpen] = useState(false)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [gstin, setGSTIN] = useState('')
    const [address, setAddress] = useState({})

    return (
        <>
            <Table variant='simple' colorScheme='gray'>
                <Thead>
                    <Tr>
                        {/* <Th fontSize={'15'} sx={{ color: '#0b0e37db' }}>SNO</Th> */}
                        <Th fontSize={'15'} sx={{ color: '#0b0e37db' }}>Company Name</Th>
                        <Th fontSize={'15'} sx={{ color: '#0b0e37db' }}>GSTIN No</Th>
                        <Th fontSize={'15'} sx={{ color: '#0b0e37db' }}>Address</Th>
                        <Th fontSize={'15'} sx={{ color: '#0b0e37db' }} colSpan={2} p={1.5}>Action</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {allListedCompanies?.map((company, indx) => (
                        <Tr key={indx} h='0.2rem' fontSize='sm'>
                            {/* <Td>{indx + 1}</Td> */}
                            <Td fontWeight={'bolder'} fontSize={'md'}>{company.name}</Td>
                            <Td>{company.gstin}</Td>
                            <Td fontSize='xs'>
                                <p>{`${company.address.street}, ${company.address.city}`}</p>
                                <p>
                                    {`${company.address.state} ${company.address.pin}, ${company.address.country}`}
                                </p>
                            </Td>
                            <Td cursor={'pointer'} p={0}>
                                <EditIcon color={'blue.500'}
                                    onClick={() => {
                                        setId(company._id)
                                        setName(company.name)
                                        setGSTIN(company.gstin)
                                        setAddress({
                                            street: company.address.street,
                                            city: company.address.city,
                                            state: company.address.state,
                                            pin: company.address.pin,
                                            country: company.address.country
                                        })

                                        setIsOpen(true)
                                    }}
                                />
                            </Td>
                            <Td cursor={'pointer'} p={0}>
                                <DeleteIcon color={'red.500'}
                                    onClick={() => {
                                        setId(company._id)
                                        setAlertIsOpen(true)
                                    }}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <ActionModal isOpen={isOpen} onClose={setIsOpen} id={id} name={name} gstin={gstin} address={address} setName={setName} setGSTIN={setGSTIN} setAddress={setAddress} />
            <Alert flag='company' isOpen={alertisOpen} id={id} onClose={setAlertIsOpen} />
        </>
    )
}

export default ViewCompanies