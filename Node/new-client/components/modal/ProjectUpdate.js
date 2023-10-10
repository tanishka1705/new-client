import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Button, Input, Box, Flex, Select, HStack } from '@chakra-ui/react'
import client from '../../api/axiosInstance'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { getCookie } from '../../utils/cookies'

const ProjectUpdate = ({ isOpen, onClose, id, cId, description, rate, projectAmount, conversionRate, setDescription, setRate, setProjectAmount, setConversionRate }) => {

    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const submitHandler = async (e) => {
        e.preventDefault()

        try {
            setIsLoading(true)
            const { data } = await client({
                url: `/projects/${cId}/${id}`,
                method: 'PATCH',
                headers: {
                    "Content-Type": 'application/json',
                    Authorization: getCookie()
                },
                data: JSON.stringify({ description, rate, projectAmount, conversionRate })
            })

            setIsLoading(false)

            if (data.status === 'true') {
                toast.success('Project Updated Successfully!')
                onClose(false)
                router.reload()
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
                <ModalHeader>Update Project</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={submitHandler}>
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Description</FormLabel>
                            <Input placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
                        </FormControl>

                        <HStack>
                            <FormControl mt={4}>
                                <FormLabel>Currency</FormLabel>
                                <Select value={rate.currency} onChange={e => setRate({ ...rate, currency: e.target.value })}>
                                    <option value={'INR'}>INR</option>
                                    <option value={'USD'}>USD</option>
                                    <option value={'POUND'}>POUND</option>
                                </Select>
                            </FormControl>

                            <FormControl mt={4}>
                                <FormLabel>Rate</FormLabel>
                                <Input value={rate.rate} onChange={e => setRate({ ...rate, rate: e.target.value })} />
                            </FormControl>

                        </HStack>
                        <HStack>
                            <FormControl isRequired>
                                <FormLabel>Project Amount</FormLabel>
                                <Input
                                    value={projectAmount}
                                    type="number"
                                    name="amount"
                                    onChange={e => setProjectAmount(e.target.value)}
                                    placeholder='$'
                                    step='0.01'
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Conversion Rate</FormLabel>
                                <Input
                                    value={conversionRate}
                                    type="number"
                                    name="crate"
                                    onChange={e => setConversionRate(e.target.value)}
                                    placeholder='$'
                                    step='0.01'
                                />
                            </FormControl>
                        </HStack>
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

export default ProjectUpdate