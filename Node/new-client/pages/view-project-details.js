import React from 'react'
import ViewProjDetails from '../components/projectDetails/ViewProjDetails'
import client from '../api/axiosInstance'

export default function ViewProjectDeatilsHome() {
  // if (message) return toast.error(message)

  return (
   <ViewProjDetails />
  )
}

// export async function getServerSideProps() {
//   const { data } = await client('/projects')
//   console.log(data);
//   if (data.success === 'true') {
//     return {
//       props: { allListedProjects: data.allListedProjects}
//     }
//   }
//   return {
//     props: { message: data.message }
//   }
// }

// export async function getServerSideProps() {
//   try {
//     const { data } = await client('/projects')
//     console.log(data);
//     if (data.success === 'true') {
//       return {
//         props: { allListedProjects: data.allListedProjects }
//       }
//     } else {
//       throw new Error(data.message);
//     }
//   } catch (error) {
//     console.error('Error in getServerSideProps:', error);
//     return {
//       props: { message: 'An error occurred while fetching data' }
//     }
//   }
// }