
import React, { useState, useEffect } from 'react'
import { Box, Heading, Flex, Divider, Stack, FormControl, FormLabel, Input, HStack, Text, Link, Select,Table, TableContainer, Thead, Th, Tr } from '@chakra-ui/react'
// import client from '../../api/axiosInstance';
import InvoiceTable from './InvoiceTable';

export default function GenerateInvoice() {

  const [companyData, setCompanyData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  const [selectedBillingType, setSelectedBillingType] = useState('');
  const [showTable, setShowTable] = useState(false);

  


  // useEffect(() => {
  //   selectCompany();
  // }, []);

  // async function selectCompany(){
  //   const response = await client.get('/companies')
  //   const fetchCompanyData = response.data.allListedCompanies;
  //   const companyData = fetchCompanyData.map((company)=>({
  //     id : company._id,
  //     name : company.name,
  //   })
  //   )
  //   setCompanyData(companyData);
  // }

  function handleCompanyChange(event) {
    setSelectedCompany(event.target.value);
    setShowTable(false); 
  }

  function handleBillingTypeChange(event) {
    setSelectedBillingType(event.target.value);
    setShowTable(false); 
  }


  const isTableVisible = selectedCompany && selectedBillingType;

  return (
    <Flex flexDirection="column">
      <Flex alignItems='center' justifyContent='flex-start' mt='1em'>
        <Box>
          <Heading size='md' color='#34495E'>Generate Invoice</Heading>
        </Box>
      </Flex>

      <Divider mt="1em" borderColor="blue.500" borderWidth="0.1em" width="55em" />

      <Box mt="2em" mx="auto" >
        <HStack spacing={5}>
          <form>
            <Stack spacing={4}>
              <FormControl id="invoiceNumber" isRequired>
                <FormLabel fontWeight='bold'>Invoice Number</FormLabel>
                <Input type="number" placeholder='Enter Invoice Number' focusBorderColor='gray.200'/>
              </FormControl>
              <FormControl id="invoiceDate" isRequired>
                <FormLabel fontWeight='bold'>Invoice Date</FormLabel>
                <Input type="date" focusBorderColor='gray.200'/>
              </FormControl>
              <FormControl id="dueDate" isRequired>
                <FormLabel fontWeight='bold'>Due Date</FormLabel>
                <Input type="date" focusBorderColor='gray.200'/>
              </FormControl>
            </Stack>
          </form>
          <Box ml='15em' mt='1.8em'>
            <Heading size='sm'>GAMMAEDGE TECHNOLOGIES PRIVATE LIMITED</Heading>
            <Text fontSize='sm'>GSTIN: 23AAJCG9212C1ZZ</Text>
            <Text fontSize='sm'>PAN : AAJCG9212C</Text>
            <address>
              <Text fontSize='sm'>404, N1 Sky Star, New Ranibagh,<br />Indore, Madhya Pradesh 452001</Text>
              <HStack>
                <Link color={'blue'} href='mailto:accounts@gammaedge.io' fontSize='sm'>accounts@gammaedge.io</Link>
                <Box w="1px" h="1em" bg="gray.400" ></Box>
                <Text fontSize='sm'>+91-8878811955</Text>
              </HStack>
            </address>
            <HStack spacing={5}>
            <FormControl id="dropdown" mt="1.5em">
              <FormLabel><Heading size='xs'>Bill To:</Heading></FormLabel>
              <Select placeholder="Select an option" 
                      mt='1em' value={selectedCompany}
                      onChange={handleCompanyChange}
                      focusBorderColor='gray.200'>       

                {/* {companyData.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))} */}

              <option value='techracers' id='techracers'>Techracers Pvt Lmt</option>
              <option value='yash technologies' id='yash technologies'>Yash Technologies</option>
              <option value='systango' id='systango'>Systango</option>
              </Select>
            </FormControl>
            <FormControl id="dropdown" mt="1.5em">
              <FormLabel>
                <Heading size='xs'>Billing Type : </Heading>
              </FormLabel>
              <Select mt='1em' placeholder="Select an option" 
                value={selectedBillingType}
                onChange={handleBillingTypeChange}
                focusBorderColor='gray.200'>            
                <option value='monthly' id='monthly'>Monthly</option>
                <option value='hourly' id='hourly'>Hourly</option>
              </Select>
            </FormControl>
            </HStack>
          </Box>

        </HStack>
      </Box>

      {isTableVisible && (
        <InvoiceTable billingType={selectedBillingType} />
      )}
    </Flex>
  )
}
