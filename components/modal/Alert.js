import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react'
import client from '../../api/axiosInstance'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'

const Alert = ({ id, isOpen, onClose }) => {

    const router = useRouter()

    const deleteHandler = async () => {
        const { data } = await client({
            url: `/companies/${id}`,
            method: 'DELETE'
        })
        if (data.status === 'true') {
            toast.success(data.message)
            router.push('/')
        }
        else toast.error(data.message)
    }

    return (
        <AlertDialog
            isOpen={isOpen}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Delete Customer
                    </AlertDialogHeader>

                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>

                    <AlertDialogFooter>
                        <Button onClick={() => onClose(false)}>
                            Cancel
                        </Button>
                        <Button colorScheme='red' onClick={() => {
                            onClose(false)
                            deleteHandler(id)
                        }} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    )
}

export default Alert