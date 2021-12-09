import Head from 'next/head';
import { Box, Container } from '@chakra-ui/react';
import NoSsr from '../no-ssr';
import Navbar from '../navbar';
// import VoxelDog from '../voxel-dog';
import Footer from '../footer';
import Character from '../character';

const Main = ({ children, router }) => {
  
  return (
    <Box as="main" pb={8}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Lim Gwanwoo&apos;s - website</title>
      </Head>

      <Navbar path={router.asPath} />
      
      <Container maxW="container.md" pt={14}>
        <NoSsr>
          <Character />
        </NoSsr>
        {children}

        <Footer />
      </Container>
    </Box>
  )
}

export default Main;