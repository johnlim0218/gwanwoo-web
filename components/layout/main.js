import Head from 'next/head';
import { Box, Container } from '@chakra-ui/react';
import NoSsr from '../no-ssr';
import Navbar from '../navbar';
import VoxelDog from '../vocel-dog';

const Main = ({ children, router }) => {
  console.log(router);
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>John Lim&apos;s - website</title>
      </Head>

      <Navbar path={router.asPath} />
      
      <Container maxW="container.md" pt={14}>
        <NoSsr>
          <VoxelDog />
        </NoSsr>
        {children}
      </Container>
    </Box>
  )
}

export default Main;