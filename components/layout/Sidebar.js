import {
  Box,
  Flex,
  HStack,
  Image,
  ListItem,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export default function Sidebar() {

  const listItemStyles = {
    position: "relative",
    textDecoration: "none",
    _hover: {
      _before: {
        content: '""',
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1.5,
        height: "0.1rem", 
        background: "#7b68ee", 
        transition: "width 1s ease", 
        width: "100%",
      },
    },
  };

  //temporary dashboard link on home 
const email = 'user@example.com';
const password = 'secretPassword';

const dashboardLink = `/dashboard?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;


  return (
    <Box
      w="18em"
      h="100vh"
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Flex h="20" alignItems="center" mx="8" mt="3" justifyContent="space-between">
        <Image src="/images/logo.jpeg" w="13rem" />
      </Flex>

      <Box alignItems="center" mx="8" mt="8" justifyContent="space-between">
        <UnorderedList listStyleType={"none"} spacing={5}>
        <HStack>
            <Image src="/images/homelogo.svg" w="1.2em" />
            <Link href={dashboardLink}>
              <ListItem _hover={listItemStyles}>Home</ListItem>
            </Link> 
          </HStack>
          <HStack>
            <Image src="/images/companylogo.svg" w="1.2em" />
            <Link href='/company-details'>
              <ListItem _hover={listItemStyles}>Create Company</ListItem>
            </Link> 
          </HStack>
          <HStack>
            <Image src="/images/projectlogo.svg" w="1.2em" />
            <Link href='/project-details'>
              <ListItem _hover={listItemStyles}>Create Project</ListItem>
            </Link>
          </HStack>
        
          <HStack>
            <Image src="/images/viewprojlogo.svg" w='1.2em'/>
            <Link href='/view-project-details'>
              <ListItem _hover={listItemStyles}>View Project Details</ListItem>
            </Link>
          </HStack>
          <HStack>
            <Image src="/images/generateinvoicelogo.svg" w='1.2em' />
            <Link href='/generate-invoice'>
            <ListItem _hover={listItemStyles}>Generate Invoice</ListItem>
            </Link>
          </HStack>
          <HStack>
            <Image src="/images/invoicehistorylogo.svg" w='1.2em' />
          <Link href='/invoice-history'>
            <ListItem _hover={listItemStyles}>Invoice History</ListItem>
          </Link>
          </HStack>
        </UnorderedList>
      </Box>
    </Box>
  );
}
