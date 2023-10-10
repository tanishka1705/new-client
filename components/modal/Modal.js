import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Button, Input, Box, Flex } from '@chakra-ui/react'
import client from '../../api/axiosInstance'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/router'

const ActionModal = ({ isOpen, onClose, id, name, gstin, address, setName, setGSTIN, setAddress }) => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const { data } = await client({
                url: `/companies/${id}`,
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json'
                },
                data: JSON.stringify({ name, gstin, address: address })
            })

            setIsLoading(false)

            if (data.status === 'true') {
                toast.success('Company Updated Successfully!')
                onClose(false)
                router.push('/')
            }
            else throw (data.message)

        } catch (error) {
            setIsLoading(false)
            toast.error(error.response.data.message)
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create your account</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitHandler}>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Company Name</FormLabel>
                            <Input placeholder='Company Name' value={name} onChange={e => setName(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>GSTIN</FormLabel>
                            <Input placeholder='GSTIN' value={gstin} onChange={e => setGSTIN(e.target.value)} />
                        </FormControl>

                        <Box>
                            <Flex>
                                <FormControl mt={4} me={1}>
                                    <FormLabel>Street</FormLabel>
                                    <Input placeholder='Street' value={address.street}
                                        onChange={e => setAddress({ ...address, street: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl mt={4} ms={1}>
                                    <FormLabel>City</FormLabel>
                                    <Input placeholder='State' value={address.city}
                                        onChange={e => setAddress({ ...address, city: e.target.value })}
                                    />
                                </FormControl>
                            </Flex>

                            <Flex>
                                <FormControl mt={4}>
                                    <FormLabel>State</FormLabel>
                                    <Input placeholder='State' value={address.state}
                                        onChange={e => setAddress({ ...address, state: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl mt={4} mx={2}>
                                    <FormLabel>PIN</FormLabel>
                                    <Input placeholder='PIN' value={address.pin}
                                        onChange={e => setAddress({ ...address, pin: e.target.value })}
                                    />
                                </FormControl>

                                <FormControl mt={4}>
                                    <FormLabel>Country</FormLabel>
                                    <Input placeholder='Country' value={address.country}
                                        onChange={e => setAddress({ ...address, country: e.target.value })}
                                    />
                                </FormControl>
                            </Flex>
                        </Box>
                    </ModalBody>

                    <ModalFooter as='div'>
                        <Button type='submit' colorScheme='purple' mr={3}>
                            {`${isLoading ? 'Updating' : 'Submit'}`}
                        </Button>
                        <Button onClick={() => onClose(false)}>Cancel</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal >
    )
}

export default ActionModal