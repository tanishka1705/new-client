import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, FormControl, Heading, Image, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React, { useState } from 'react'
import client from '../../api/axiosInstance';
import toast from 'react-hot-toast';
import setCookie from '../../utils/cookies';

const boxStyle = {
  backgroundImage: `url('/images/bg2.jpeg')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: '100vw',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: -1,
};

function Login() {

  const initialLoginFormData = {
    email: '',
    password: '',
  }

  const [loginFormData, setLoginFormData] = useState(initialLoginFormData)
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = loginFormData;

      if (email && password) {
        const { data } = await client({
          url: '/user/login',
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          data: JSON.stringify({ email, password })
        })
        if (data.status === 'true') {
          // set-cookie
          setCookie(data.token)
          localStorage.setItem('user', data.user._id)
          toast.success(data.message)
          router.push('/dashboard')
        }
        else throw new Error(data.message)
      }
      else throw new Error(`All fields are required!`)
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (

    <Box style={boxStyle}>
      <Flex alignItems='center' justifyContent='center' mt='7em'>
        <Flex alignItems='center' justifyContent='center' bg='white' w='40em' p='4em' borderRadius={10}>
          <Box mr="2rem">
            <Image src='/images/login.svg' w="100%" h="auto" maxW="300px" />
          </Box>

          <Box>
            <form onSubmit={handleLoginSubmit}>
              <Heading color='#354561' fontSize={'3xl'} align='center'>USER LOGIN</Heading>
              <Text align='center' color='gray.500' mt={2} fontSize={'sm'}>Log into your account</Text>
              <Stack spacing={6} mt={6}>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<EmailIcon color={'gray.400'} />}
                    />
                    <Input type='email'
                      placeholder='Enter Email'
                      name='email'
                      value={loginFormData.email}
                      onChange={e => setLoginFormData({ ...loginFormData, email: e.target.value })}
                      focusBorderColor='gray.200'
                    />
                  </InputGroup>

                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<LockIcon color={'gray.400'} />}
                    />
                    <Input type={showPassword ? 'text' : 'password'}
                      placeholder='Enter Password'
                      name='password'
                      value={loginFormData.password}
                      onChange={e => setLoginFormData({ ...loginFormData, password: e.target.value })}
                      focusBorderColor='gray.200'
                    />
                    <InputRightElement>
                      <Button onClick={() => setShowPassword(!showPassword)} color={'gray.400'} bg='transparent'
                        _hover={{ bg: 'transparent' }}
                        _active={{ bg: 'transparent' }}
                        _focus={{ outline: 'none' }}>
                        {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Button type='submit' colorScheme='blue' w='7em' alignSelf='center'>
                  Login
                </Button>
              </Stack>
            </form>
          </Box>
        </Flex>
      </Flex>
    </Box>


  )
}

export default Login