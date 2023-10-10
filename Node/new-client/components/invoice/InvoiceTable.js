
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, HStack, Heading, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import InvoicePDF from './InvoicePDF';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import SubTotal from './SubTotal';
import AccountDetails from './AccountDetails';

export default function InvoiceTable({ billingType, invoiceNumber, invoiceDate, dueDate, projects, user }) {
  const isHourly = billingType === 'hourly';

  const [project, setProject] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isCheckBoxOpen, setisCheckBoxOpen] = useState(false)
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    setSelectedRows([]);
  }, [billingType]);

  const toast = useToast();
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleCheckboxChange = (invoiceId) => {

    if (selectedRows.includes(invoiceId)) {
      setSelectedRows(selectedRows.filter((id) => id !== invoiceId));
    } else {
      setSelectedRows([...selectedRows, invoiceId]);
      setisCheckBoxOpen(true)
    }

  };


  const generatePDF = async () => {
    if (!invoiceNumber || !invoiceDate || !dueDate) {
      toast({
        title: 'Missing Required Fields',
        description: 'Please fill in all the required fields before generating the invoice.',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
      });
    } else if (selectedRows.length === 0) {
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
        <InvoicePDF invoice={projects.filter((invoice) => selectedRows.includes(invoice._id))}
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          dueDate={dueDate}
          isHourly={isHourly} />
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

  const saveHandler = () => {
    if (!isHourly) {
      if (!hours) {
        showToast('Please fill in all the required fields');
        return;
      }
    } else {
      if (!period || !workingDays || !hours) {
        showToast('Please fill in all the required fields')
        return;
      }
    }
    //save logic 
  }

  const showToast = (message) => {
    toast({
      title: 'Missing Required Fields',
      description: message,
      status: 'error',
      duration: 3000,
      isClosable: true,
      position: 'top',
    })
  }

  return (
    <>
      {projects.length !== 0 ? (
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
                    {!isHourly && <Th px={1} textAlign={'center'}> Total Working Days</Th>}
                    <Th px={1} textAlign={'center'}>Hours</Th>
                    {isHourly && <Th px={1} textAlign={'center'}>Rate</Th>}
                    {isHourly && <Th px={1} textAlign={'center'}>Conversion Rate</Th>}
                    <Th px={1} textAlign={'center'}>Amount</Th>

                  </Tr>
                </Thead>
                <Tbody>
                  {
                    projects.map((project) => (
                      <Tr key={project._id} fontSize={'xs'}>
                        <Td px={1} textAlign={'center'}>
                          <Checkbox
                            isChecked={selectedRows.includes(project._id)}
                            onChange={() => {
                              isHourly ? setProject({ hours: 0, conversionRate: project.conversionRate }) : setProject({ period: 0, workingDays: 0, totalWorkingDays: 0, hours: 0 })

                              handleCheckboxChange(project._id)
                            }}
                          />
                        </Td>
                        <Td px={1} textAlign={'center'}>{project.description}</Td>
                        {!isHourly && <Td px={1} textAlign={'center'}>{`${project.rate.rate} ${project.rate.currency}`}</Td>}
                        {!isHourly && <Td px={1} textAlign={'center'}>{0}</Td>}
                        {!isHourly && <Td px={1} textAlign={'center'}>{0}</Td>}
                        {!isHourly && <Td px={1} textAlign={'center'}>{0}</Td>}
                        <Td px={1} textAlign={'center'}>{0.0}</Td>
                        {isHourly && <Td px={1} textAlign={'center'}>{project.rate.rate}</Td>}
                        {isHourly && <Td px={1} textAlign={'center'}>{project.conversionRate}</Td>}
                        <Td px={1} textAlign={'center'}>{project.amount}</Td>
                      </Tr>
                    ))
                  }
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
          <Box ml='45em'>
            <Button colorScheme="purple" w='10em' onClick={generatePDF}>
              Generate Invoice
            </Button>
          </Box>

          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalBody>
                <PDFViewer width="100%" height="550em">
                  <InvoicePDF invoice={projects.filter((invoice) => selectedRows.includes(invoice._id))}
                    invoiceNumber={invoiceNumber}
                    invoiceDate={invoiceDate}
                    dueDate={dueDate}
                    isHourly={isHourly} />
                </PDFViewer>
                <Button colorScheme="purple" mr={3} mt={5} onClick={onClose}>
                  Close
                </Button>
                <Button colorScheme="purple" mt={5} onClick={downloadPDF}>
                  Download PDF
                </Button>
              </ModalBody>
            </ModalContent>
          </Modal>

          {/* modal check */}

          <Modal isOpen={isCheckBoxOpen} onClose={() => setisCheckBoxOpen(false)} size="md">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalBody>
                {isHourly ? (
                  <Box>
                    <FormControl id="hours" isRequired>
                      <FormLabel fontWeight="bold" fontSize={'sm'}>Hours</FormLabel>
                      <Input type="text" value={project.hours} focusBorderColor='gray.200' />
                    </FormControl>
                    <FormControl id="Conversion Rate" isRequired>
                      <FormLabel fontWeight="bold" fontSize={'sm'}>Conversion Rate</FormLabel>
                      <Input type="text" value={project.conversionRate} focusBorderColor='gray.200' />
                    </FormControl>
                  </Box>
                ) : (
                  <Box>
                    <FormControl id="period" isRequired>
                      <FormLabel fontWeight="bold" fontSize={'sm'}>Period</FormLabel>
                      <Input type="text" value={project.period} focusBorderColor='gray.200' />
                    </FormControl>
                    <FormControl id="workingDays" isRequired>
                      <FormLabel fontWeight="bold" fontSize={'sm'}>Working Days</FormLabel>
                      <Input type="text" value={project.workingDays} focusBorderColor='gray.200' />
                    </FormControl>
                    <FormControl id="Total Working Days" isRequired mt={4}>
                      <FormLabel fontWeight="bold" fontSize={'sm'}> Total Working Days</FormLabel>
                      <Input type="text" value={project.totalWorkingDays} focusBorderColor='gray.200' />
                    </FormControl>
                    <FormControl id="hours" isRequired mt={4}>
                      <FormLabel fontWeight="bold" fontSize={'sm'}>Hours</FormLabel>
                      <Input type="text" value={project.hours} focusBorderColor='gray.200' />
                    </FormControl>
                  </Box>
                )}
                <Button colorScheme="purple" mr={4} mt={5} size={'sm'} ml='18em' onClick={() => setisCheckBoxOpen(false)}>
                  Close
                </Button>
                <Button colorScheme='purple' mr={3} mt={5} size={'sm'} onClick={saveHandler}>
                  Save
                </Button>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>

          <HStack>
            <AccountDetails user={user} />
            <SubTotal />
          </HStack>
        </>
      ) : <Heading fontSize='1.2rem' mx='auto' mt='5rem' color='red'>No project listed!</Heading>}
    </>
  )
}



