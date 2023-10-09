
import { EditIcon } from '@chakra-ui/icons'
import { Box, 
    Button, 
    Checkbox, 
    Flex, 
    FormControl, 
    FormLabel, 
    Input, 
    Modal, 
    ModalBody, 
    ModalContent, 
    ModalHeader, 
    ModalOverlay, 
    Table, 
    TableContainer, 
    Tbody, 
    Td, 
    Th, 
    Thead, 
    Tr, 
    useDisclosure, 
    useToast} from '@chakra-ui/react'
import React, { useState } from 'react'
import InvoicePDF from './InvoicePDF';
import { PDFViewer, pdf } from '@react-pdf/renderer';



export default function InvoiceTable({ billingType }) {
  const isHourly = billingType === 'hourly';

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRows, setSelectedRows] = useState([]);



  const invoiceData = [
    { id: 1, description: 'Builder (John Doe)', period: '15May - 15June', workingDays: '30', rate: '3', hour: '20.5', conversionRate: '79.2', amount: '23543' },
    { id: 2, description: 'Builder (Jane Smith)', period: '15May - 15June', workingDays: '30', rate: '2', hour: '10.2', conversionRate: '82.2', amount: '33543' },
    { id: 3, description: 'Builder (Jane Smith)', period: '15May - 15June', workingDays: '30', rate: '4', hour: '27', conversionRate: '70.5', amount: '20702' },
  ];

  const toast = useToast();InvoicePDF
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleCheckboxChange = (invoiceId) => {
   
    if (selectedRows.includes(invoiceId)) {
      
      setSelectedRows(selectedRows.filter((id) => id !== invoiceId));
    } else {
      setSelectedRows([...selectedRows, invoiceId]);
    }
  };

  const generatePDF = async () => {
    if (selectedRows.length === 0) {
      toast({
        title: 'No Rows Selected',
        description: 'Please select records to generate an invoice.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } else {
      onOpen();
      const pdfData = await pdf(
        <InvoicePDF invoice={invoiceData.filter((invoice) => selectedRows.includes(invoice.id))} />
      ).toBlob();
      setPdfBlob(pdfData); 
    }
  };

  const downloadPDF = () => {
    if (pdfBlob) {
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = pdfUrl;
      a.download = 'invoice.pdf';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      onClose();
      setSelectedRows([]);
    }
  };

  return (
    <>
      <Flex alignItems='center' justifyContent='center' margin={'2rem 0'}>
        <TableContainer sx={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', maxWidth: '100%' }} w="55em" >
          <Table variant='simple' colorScheme='gray'>
            <Thead>
              <Tr>
                <Th px={1} textAlign={'center'}>Select</Th>
                <Th px={1} textAlign={'center'}>Description</Th>
                {!isHourly && <Th px={1} textAlign={'center'}>Period</Th>}
                {!isHourly && <Th px={1} textAlign={'center'}>Working Days</Th>}
                <Th px={1} textAlign={'center'}>Rate /Hour</Th>
                <Th px={1} textAlign={'center'}>Hours</Th>
                <Th px={1} textAlign={'center'}>Conversion Rate</Th>
                <Th px={1} textAlign={'center'}>Amount</Th>
               
              </Tr>
            </Thead>
            <Tbody>
              {invoiceData.map((invoice) => (
                <Tr key={invoice.id} fontSize={'xs'}>
                  <Td px={1} textAlign={'center'}>
                    <Checkbox
                      isChecked={selectedRows.includes(invoice.id)}
                      onChange={() => handleCheckboxChange(invoice.id)}
                    />
                  </Td>
                  <Td px={1} textAlign={'center'}>{invoice.description}</Td>
                  {!isHourly && <Td px={1} textAlign={'center'}>{invoice.period}</Td>}
                  {!isHourly && <Td px={1} textAlign={'center'}>{invoice.workingDays}</Td>}
                  <Td px={1} textAlign={'center'}>{invoice.rate}</Td>
                  <Td px={1} textAlign={'center'}>{invoice.hour}</Td>
                  <Td px={1} textAlign={'center'}>{invoice.conversionRate}</Td>
                  <Td px={1} textAlign={'center'}>{invoice.amount}</Td>
                
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
      <Box ml='45em'>
        <Button colorScheme="teal" w='10em' onClick={generatePDF}>
          Generate Invoice
        </Button>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <PDFViewer width="100%" height="550em">
              <InvoicePDF invoice={invoiceData.filter((invoice) => selectedRows.includes(invoice.id))} />
            </PDFViewer>
            <Button colorScheme="teal" mr={3} mt={5}  onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="teal" mt={5} onClick={downloadPDF}>
              Download PDF
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* modal check */}

      {/* <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            {isHourly ? (
              <Box>
                <FormControl id="hours" isRequired>
                  <FormLabel fontWeight="bold">Hours</FormLabel>
                  <Input type="text" placeholder="Enter hours" />
                </FormControl>
              </Box>
            ) : (
              <Box>
                <FormControl id="period" isRequired>
                  <FormLabel fontWeight="bold">Period</FormLabel>
                  <Input type="text" placeholder="Enter period" />
                </FormControl>
                <FormControl id="workingDays" isRequired>
                  <FormLabel fontWeight="bold">Working Days</FormLabel>
                  <Input type="text" placeholder="Enter working days" />
                </FormControl>
                <FormControl id="hours" isRequired>
                  <FormLabel fontWeight="bold">Hours</FormLabel>
                  <Input type="text" placeholder="Enter hours" />
                </FormControl>
              </Box>
            )}
            <Button colorScheme="teal" mr={3} mt={5} onClick={onClose}>
              Close
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal> */}
    </>
  )
}



