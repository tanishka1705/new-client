import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useState } from 'react';
import ActionModal from '../modal/Modal';
import Alert from '../modal/Alert';



const AdminHome = ({ allListedCompanies }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [alertisOpen, setAlertIsOpen] = useState(false)
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [gstin, setGSTIN] = useState('')
    const [address, setAddress] = useState({})

    return (
        <>
            <Flex alignItems='center' justifyContent='center' margin={'2rem 0'}>
                <TableContainer sx={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', maxWidth: '100%' }} w="55em" >
                    <Table variant='simple' colorScheme='gray'>
                        <Thead>
                            <Tr>
                                <Th fontSize={'15'} sx={{ color: '#0b0e37db' }}>SNO</Th>
                                <Th fontSize={'15'} sx={{ color: '#0b0e37db' }}>Company Name</Th>
                                <Th fontSize={'15'} sx={{ color: '#0b0e37db' }}>GSTIN No</Th>
                                <Th fontSize={'15'} sx={{ color: '#0b0e37db' }}>Address</Th>
                                <Th fontSize={'15'} sx={{ color: '#0b0e37db' }} colSpan={2} p={1.5}>Action</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {allListedCompanies.map((company, indx) => (
                                <Tr key={indx} h='0.2rem' fontSize='sm'>
                                    <Td>{indx + 1}</Td>
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
                                                setIsOpen(true)
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
                </TableContainer>
            </Flex>
            <ActionModal isOpen={isOpen} onClose={setIsOpen} id={id} name={name} gstin={gstin} address={address} setName={setName} setGSTIN={setGSTIN} setAddress={setAddress} />
            <Alert isOpen={alertisOpen} id={id} onClose={setAlertIsOpen} />
        </>
    );
}

export default AdminHome;
