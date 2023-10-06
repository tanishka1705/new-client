import React from 'react'
import Cards from '../components/cards/Card'
import AdminHome from '../components/adminHome/AdminHome'
import { Heading } from '@chakra-ui/react'
import toast from 'react-hot-toast'

export default function Dashboard({ allListedCompanies, message }) {

    if (message) toast.error(message)
    
  return (
    <>
     <Cards />
     {
        allListedCompanies === undefined ?
          <Heading fontSize={'lg'} my='16' textAlign='center'>{message}</Heading>
          : (
            <AdminHome allListedCompanies={allListedCompanies} />
          )
      }
    </>
  )
}

// export async function getServerSideProps() {
//   try {
//     const { data } = await client('/companies')
//     if (data.status === 'true') {
//       return {
//         props: { allListedCompanies: data.allListedCompanies }
//       }
//     }
//     else throw new Error(data.message)
//   } catch (error) {
//     return {
//       props: { message: error.response.data.message }
//     }
//   }
// }

export async function getServerSideProps() {
  try {
    const { data } = await client('/companies');
    if (data?.status === 'true') {
      return {
        props: { allListedCompanies: data.allListedCompanies }
      };
    } else {
      throw new Error(data?.message || 'Unknown error occurred');
    }
  } catch (error) {
    return {
      props: { message: error.response?.data?.message || 'An error occurred' }
    };
  }
}
