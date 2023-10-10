import { ChakraProvider } from '@chakra-ui/react'
import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import NoSidebar from '../components/layout/NoSidebar'

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === '/';
  return (
    <ChakraProvider>
       {isLoginPage ? (
        <NoSidebar>
          <Component {...pageProps} />
        </NoSidebar>
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
      <Toaster />
    </ChakraProvider>
  )

}

export default MyApp
