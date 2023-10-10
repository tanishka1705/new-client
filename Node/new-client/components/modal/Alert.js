import { AlertDialog, AlertDialogBody, AlertDialogFooter, AlertDialogHeader, AlertDialogContent, AlertDialogOverlay, Button } from '@chakra-ui/react'
import client from '../../api/axiosInstance'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { getCookie } from '../../utils/cookies'

const Alert = ({ id, cId, isOpen, onClose, flag }) => {

    const router = useRouter()

    const url = flag === 'company' ? `/companies/${id}` : `/projects/${cId}/${id}`

    const deleteHandler = async () => {
        const { data } = await client({
            url,
            method: 'DELETE',
            headers: {
                Authorization: getCookie()
            }
        })
        if (data.status === 'true') {
            toast.success(data.message)
            router.reload('/dashboard')
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