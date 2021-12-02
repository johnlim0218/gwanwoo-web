import { Container, Box, Heading } from '@chakra-ui/react';

const Index = () => {

  return (
    <Container>
      <Box borderRadius="lg" bg="red" p={3} mb={6} align="center">
        Hello, I&apos;m a full-stack developer based in KOREA!
      </Box>

      <Box display={{ md:'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Lim Gwanwoo(임관우)
          </Heading>
          <p>Developer / Photographer / Writer</p>
        </Box>
      </Box>
    </Container>
  )
}

export default Index;