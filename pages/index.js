import AdminHome from '../components/adminHome/AdminHome'
import client from '../api/axiosInstance'
import Cards from '../components/cards/Card'
import { Heading } from '@chakra-ui/react'
import toast from 'react-hot-toast'
import NoSidebar from '../components/layout/NoSidebar'
import Login from '../components/auth/Login'

export default function Home() {

  // if (message) toast.error(message)

  return (
    <>
      {/* <Cards />
      {
        allListedCompanies === undefined ?
          <Heading fontSize={'lg'} my='16' textAlign='center'>{message}</Heading>
          : (
            <AdminHome allListedCompanies={allListedCompanies} />
          )
      } */}
      <NoSidebar>
         <Login />
      </NoSidebar>
     
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
