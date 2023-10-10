import { useState } from 'react';
import { Heading } from '@chakra-ui/react'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import client from '../api/axiosInstance'
import { getCookie } from '../utils/cookies'
import { useRouter } from 'next/router'
import Spinner from '../components/layout/Spinner'
import Cards from '../components/cards/Cards'
import { Flex, TableContainer, FormControl, Select } from '@chakra-ui/react'
import ViewCompanies from '../components/adminHome/viewCompanies';
import ViewProjects from '../components/adminHome/viewProjects';

export default function Dashboard() {

  const [filter, setFilter] = useState('companies')
  const router = useRouter()

  const { data, error, isLoading } = useSWR([`/${filter}`, getCookie()], async function ([url, token]) {
    const { data } = await client({
      url,
      headers: {
        Authorization: token
      }
    });
    if (data.status === 'true') {
      if (filter === 'companies') return data.allListedCompanies
      else return data.allListedProjects
    }
    else throw new Error(data.message)
  })

  if (error && error?.response?.data.status === 401) {
    toast.error('Please Login first!')
    router.push('/')
  }

  return (
    <>
      <Cards />
      <form style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <FormControl w='15em'>
          <Select outline='none' onChange={e => setFilter(e.target.value)}>
            <option value='companies'>View Companies</option>
            <option value='projects'>View Projects</option>
          </Select>
        </FormControl>
      </form>
      
      {isLoading && <Spinner />}
      {!isLoading && !data && (
        <Heading fontSize={'lg'} my='16' textAlign='center'>
          There are no listed companies!
        </Heading>
      )}
      {data && (
        <>
          <Flex alignItems='center' justifyContent='center' margin={'2rem 0'}>
            <TableContainer sx={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', maxWidth: '100%' }} w="55em" >
              {filter === 'companies' && <ViewCompanies allListedCompanies={data} />}
              {filter === 'projects' && <ViewProjects allListedProjects={data} />}
            </TableContainer>
          </Flex>
        </>)
      }
    </>
  )
}