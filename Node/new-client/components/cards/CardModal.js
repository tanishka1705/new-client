import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, Button, FormLabel, HStack, Input, Stack, Flex } from '@chakra-ui/react';
import client from '../../api/axiosInstance';
import { getCookie } from '../../utils/cookies';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/router';

const CardModal = ({ isOpen, onClose }) => {

    const [name, setName] = useState('')
    const [gstNo, setGstNo] = useState('')
    const [address, setAddress] = useState({})
    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if (name !== '' && gstNo !== '' && Object.keys(address).length === 5) {
                const { data } = await client({
                    url: '/companies',
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: getCookie()
                    },
                    data: JSON.stringify({ name, gstin: gstNo, address })
                })
                if (data.status === 'true') {
                    toast.success(data.message)
                    onClose(false)
                    router.reload('/dashboard')
                }
                else throw new Error(data.message)
            }
            else throw new Error('All fields are required!')
        } catch (error) {
            toast.error(error?.response?.data?.message || error?.message || 'Something went wrong please try again later!')
        }
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => onClose(false)}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Company</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex alignItems='center' justifyContent='center' p='4'>
                            <form onSubmit={submitHandler}>
                                <Stack>
                                    <FormControl isRequired>
                                        <FormLabel>Company Name</FormLabel>
                                        <Input
                                            type="text"
                                            name="companyName"
                                            onChange={e => setName(e.target.value)}
                                        />
                                    </FormControl>

                                    <FormControl isRequired>
                                        <FormLabel>GSTIN Number</FormLabel>
                                        <Input
                                            type="text"
                                            name="gstinNumber"
                                            onChange={e => setGstNo(e.target.value)}
                                        />
                                    </FormControl>

                                    <FormControl>
                                        <FormLabel>Address</FormLabel>
                                        <HStack>
                                            <Input
                                                type="text"
                                                name="street"
                                                placeholder="Street"
                                                onChange={e => setAddress({ ...address, street: e.target.value })}
                                            />

                                            <Input
                                                type="text"
                                                name="city"
                                                placeholder="City"
                                                onChange={e => setAddress({ ...address, city: e.target.value })}
                                            />
                                        </HStack>
                                    </FormControl>

                                    <HStack>
                                        <Input
                                            type="text"
                                            name="state"
                                            placeholder="State"
                                            onChange={e => setAddress({ ...address, state: e.target.value })}
                                        />

                                        <Input
                                            type="text"
                                            name="pin"
                                            placeholder="PIN"
                                            onChange={e => setAddress({ ...address, pin: e.target.value })}
                                        />
                                    </HStack>
                                    <FormControl>
                                        <FormLabel>Country</FormLabel>
                                        <Input
                                            type="text"
                                            name="country"
                                            onChange={e => setAddress({ ...address, country: e.target.value })}
                                        />
                                    </FormControl>
                                </Stack>

                                <ModalFooter>
                                    <Button type='submit' colorScheme='purple' mr={3}>
                                        Create
                                    </Button>
                                    <Button onClick={() => onClose(false)}>Cancel</Button>
                                </ModalFooter>
                            </form>
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CardModal