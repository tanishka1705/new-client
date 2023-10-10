import React, { useState, useEffect } from 'react'
import { Box, Heading, Flex, Divider, Stack, FormControl, FormLabel, Input, HStack, Text, Link, Select, Table, TableContainer, Thead, Th, Tr } from '@chakra-ui/react'
import InvoiceTable from './InvoiceTable';
import { getCookie } from '../../utils/cookies';
import client from '../../api/axiosInstance';
import toast from 'react-hot-toast';

export default function GenerateInvoice() {

  const [userId, setUserId] = useState(typeof window !== 'undefined' && localStorage.getItem('user'))
  const [user, setUser] = useState([])
  const [companyData, setCompanyData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState();
  const [selectedBillingType, setSelectedBillingType] = useState('');
  const [showTable, setShowTable] = useState(false);

  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date());
  const [dueDate, setDueDate] = useState(new Date())

  // fetch
  async function getUser() {
    try {
      const { data } = await client({
        url: `/user/${userId}`,
        headers: {
          Authorization: getCookie()
        }
      })
      if (data.status === 'true') setUser(data.user)
      else throw new Error(data.message)

    } catch (error) {
      toast.error(error.message || 'Unknown error occurred!')
    }
  }

  async function selectCompany() {
    try {
      const { data } = await client({
        url: '/companies',
        headers: {
          Authorization: getCookie()
        }
      })
      if (data.status === 'true') setCompanyData(data.allListedCompanies)
      else throw new Error(data.message)

    } catch (error) {
      toast.error(error.message || 'Unknown error occurred!')
    }
  }

  useEffect(() => {
    selectCompany();
    getUser()
  }, []);


  async function handleCompanyChange(e) {
    setSelectedCompany(e.target.value)
    try {
      const { data } = await client({
        url: `/companies/project/${e.target.value}`,
        headers: {
          Authorization: getCookie()
        }
      })
      if (data.status === 'true') setProjectData(data.allListedProjects[0].projects)
      else throw new Error(data.message)

    } catch (error) {
      toast.error(error.message || 'Unknown error occurred!')
    }

    setShowTable(false)
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
                <Input type="number"
                  placeholder='Enter Invoice Number'
                  focusBorderColor='gray.200'
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                />
              </FormControl>

              <FormControl id="invoiceDate" isRequired>
                <FormLabel fontWeight='bold'>Invoice Date</FormLabel>
                <Input type="date"
                  focusBorderColor='gray.200'
                  value={invoiceDate ? invoiceDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    if (dateValue) {
                      setInvoiceDate(new Date(dateValue));
                    } else {
                      setInvoiceDate(null);
                    }
                  }}
                />
              </FormControl>

              <FormControl id="dueDate" isRequired>
                <FormLabel fontWeight='bold'>Due Date</FormLabel>
                <Input type="date"
                  focusBorderColor='gray.200'
                  value={dueDate ? dueDate.toISOString().split('T')[0] : ''}
                  min={dueDate.toISOString().split('T')[0]}
                  onChange={(e) => {
                    const dateValue = e.target.value;
                    if (dateValue) {
                      setDueDate(new Date(dateValue));
                    } else {
                      setDueDate(null);
                    }
                  }}

                />
              </FormControl>

            </Stack>
          </form>
          <Box ml='15em' mt='1.8em'>
            <Heading size='sm'>{user?.name}</Heading>
            <Text fontSize='sm'>GSTIN: {user?.gstin}</Text>
            <Text fontSize='sm'>PAN : {user?.pan}</Text>
            <address>
              <Text fontSize='sm'>{`${user?.address?.street}, ${user?.address?.city} ${user?.address?.pin}, ${user?.address?.state} ${user?.address?.country}`}</Text>
              <HStack>
                <Link color={'blue'} href='mailto:accounts@gammaedge.io' fontSize='sm'>{user?.email}</Link>
                <Text fontSize='sm'>+91-{user?.contact}</Text>
              </HStack>
            </address>
            <HStack spacing={5}>
              <FormControl id="dropdown" mt="1.5em">
                <FormLabel><Heading size='xs'>Bill To:</Heading></FormLabel>
                {/* select companies */}
                <Select placeholder="Select an option"
                  mt='1em' value={selectedCompany}
                  onChange={handleCompanyChange}
                  focusBorderColor='gray.200'>

                  {companyData.map((company) => (
                    <option key={company._id} value={company._id}>
                      {company.name}
                    </option>
                  ))}

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
        <InvoiceTable billingType={selectedBillingType}
          invoiceNumber={invoiceNumber}
          invoiceDate={invoiceDate}
          dueDate={dueDate}
          projects={projectData}
          user={user} />
      )}

    </Flex>
  )
}
