import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, Button, FormLabel, HStack, Input, Stack, Flex, Select } from '@chakra-ui/react';
import client from '../../api/axiosInstance';
import { getCookie } from '../../utils/cookies';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';

const ProjectModal = ({ isOpen, onClose }) => {

    const [description, setDescription] = useState()
    const [rate, setRate] = useState({ currency: 'INR', rate: 0 })
    const [amount, setAmount] = useState()
    const [conversionRate, setConversionRate] = useState()
    const [belongsTo, setBelongsTo] = useState()
    const router = useRouter()

    const { data, error, isLoading } = useSWR(['/companies', getCookie()], async function ([url, token]) {
        const { data } = await client({
            url,
            headers: {
                Authorization: token
            }
        });
        if (data.status === 'true') {
            setBelongsTo(data.allListedCompanies[0]?._id)
            return data.allListedCompanies
        }
        else throw new Error(data.message)
    })

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            if (description && amount && conversionRate && belongsTo && Object.keys(rate).length === 2) {
                const { data } = await client({
                    url: '/projects',
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: getCookie()
                    },
                    data: JSON.stringify({ description, rate, amount, conversionRate, companyId: belongsTo })
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
                    <ModalHeader>Create Project</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex alignItems='center' justifyContent='center' p='4'>
                            <form onSubmit={submitHandler}>
                                <Stack>
                                    <FormControl isRequired>
                                        <FormLabel>Description</FormLabel>
                                        <Input
                                            type="text"
                                            name="description"
                                            onChange={e => setDescription(e.target.value)}
                                        />
                                    </FormControl>

                                    <HStack>
                                        <FormControl isRequired>
                                            <FormLabel>Currency</FormLabel>
                                            <Select
                                                type="text"
                                                name="rate"
                                                value= {rate.currency}
                                                onChange={e => setRate({ ...rate, currency: e.target.value })}
                                            >
                                                <option value='INR'>INR</option>
                                                <option value='USD'>USD</option>
                                                <option value='Pound'>POUND</option>
                                            </Select>
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Rate</FormLabel>
                                            <Input
                                                type="number"
                                                name="rate"
                                                onChange={e => setRate({ ...rate, rate: e.target.value })}
                                                placeholder='$'
                                                step='0.01'
                                            />
                                        </FormControl>
                                    </HStack>
                                    <HStack>
                                        <FormControl isRequired>
                                            <FormLabel>Amount</FormLabel>
                                            <Input
                                                type="number"
                                                name="amount"
                                                onChange={e => setAmount(e.target.value)}
                                                placeholder='$'
                                                step='0.01'
                                            />
                                        </FormControl>
                                        <FormControl isRequired>
                                            <FormLabel>Conversion Rate</FormLabel>
                                            <Input
                                                type="number"
                                                name="crate"
                                                onChange={e => setConversionRate(e.target.value)}
                                                placeholder='$'
                                                step='0.01'
                                            />
                                        </FormControl>
                                    </HStack>
                                    <FormControl isRequired>
                                        <FormLabel>Project Belongs To</FormLabel>
                                        <Select
                                            value={data && data[0]?._id}
                                            onChange={e => setBelongsTo(e.target.value)}
                                        >
                                            {
                                                isLoading && <option>Loading...</option>
                                            }
                                            {
                                                data?.map(cmp => (
                                                    <option key={cmp._id} value={cmp._id}>{cmp.name}</option>
                                                ))
                                            }
                                        </Select>
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
            </Modal >
        </>
    )
}

export default ProjectModal