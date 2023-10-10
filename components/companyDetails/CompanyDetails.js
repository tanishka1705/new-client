
import React, { useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Flex,
  Heading,
  Box,
  Divider,
} from '@chakra-ui/react';
import toast from 'react-hot-toast'
import client from '../../api/axiosInstance';

export default function CompanyDetails() {


  const initialFormData = {
    companyName: '',
    gstinNumber: '',
    street: '',
    state: '',
    city: '',
    pin: '',
    country: '',
  };


  const [formData, setFormData] = useState(initialFormData);

  const [errors, setErrors] = useState({
    companyName: '',
    gstinNumber: '',
  });

  
    
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
      const newErrors = {};
      if (!formData.companyName.trim()) {
        newErrors.companyName = 'Company Name is required';
      }
      if (!formData.gstinNumber.trim()) {
        newErrors.gstinNumber = 'GSTIN Number is required';
      }


  
      setErrors(newErrors);
  
  
      if (Object.keys(newErrors).length === 0) {
        postReq()
      }
    };
  
  
    async function postReq() {
      try {
        const postData = {
          name: formData.companyName,
          gstin: formData.gstinNumber,
          address: {
            street: formData.street,
            city: formData.city,
            state: formData.state,
            pin: formData.pin,
            country: formData.country,
          }
        }
  
        const response = await client.post('/companies', postData, {
          headers: {
            "Content-Type": 'application/json'
          }
        });
  
        if (response.status === 201) {
          setFormData(initialFormData);
          toast.success('Company Registered Successfully')
        }
        else {
          console.error('not saved');

        }
      } catch (error) {
        console.error('An error occurred while saving data:', error);
      }
  
    }
  
    return (
      <>
        <Flex flexDirection="column">
          <Flex alignItems='center' justifyContent='flex-start' mt='1em'>
            <Box>
              <Heading size='md' color='#34495E'>Register Company</Heading>
            </Box>
          </Flex>
          <Divider mt="1em" borderColor="blue.500" borderWidth="0.1em" width="55em" />
        </Flex>
  
        <Flex alignItems='center' justifyContent='center' p='4'>
          <form>
            <Stack spacing={4} mt='1em' bg='#B9D9EB' p={10} borderRadius={5} w='40em'>
              <FormControl isRequired isInvalid={!!errors.companyName}>
                <FormLabel>Company Name</FormLabel>
                <Input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.companyName}</FormErrorMessage>
              </FormControl>
  
              <FormControl isRequired isInvalid={!!errors.gstinNumber}>
                <FormLabel>GSTIN Number</FormLabel>
                <Input
                  type="text"
                  name="gstinNumber"
                  value={formData.gstinNumber}
                  onChange={handleChange}
                />
                <FormErrorMessage>{errors.gstinNumber}</FormErrorMessage>
              </FormControl>
  
              <FormControl>
                <FormLabel>Address</FormLabel>
                <HStack>
                  <Input
                    type="text"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="Street"
                  />
  
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                  />
  
  
  
                </HStack>
              </FormControl>
  
              <HStack>
                <Input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                />
  
                <Input
                  type="text"
                  name="pin"
                  value={formData.pin}
                  onChange={handleChange}
                  placeholder="PIN"
                />
              </HStack>
              <FormControl>
                <FormLabel>Country</FormLabel>
                <Input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                />
              </FormControl>
              <Button colorScheme="blue" w='10em' position='relative' top='1em' left='13em' onClick={handleSubmit}>
                Submit
              </Button>
            </Stack>
  
          </form>
  
        </Flex>
  
        
      </>
    );
  }
  

  

  
