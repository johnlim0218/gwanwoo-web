import NextLink from 'next/link';
import { Container, Box, Heading, Image, Link, Button, useColorModeValue } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Section from '../components/section';
import Paragraph from '../components/paragraph';
import { BioSection, BioYear } from '../components/bio';

const Index = () => {

  return (
    <Container>
      <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} p={3} mb={6} align="center">
        Hello, I&apos;m a full-stack developer based in KOREA!
      </Box>

      <Box display={{ md:'flex' }}>
        <Box flexGrow={1}>
          <Heading as="h2" variant="page-title">
            Lim Gwanwoo(임관우)
          </Heading>
          <p>Developer / Photographer / Writer</p>
        </Box>
        <Box 
          flexShrink={1} 
          mt={{ base: 4, md: 0 }} 
          ml={{ md: 6 }} 
          align="center"
        >
          <Image 
            borderColor="whiteAlpha.800" 
            borderWidth={2} 
            borderStyle="solid" 
            maxWidth="100px" 
            display="inline-block" 
            borderRadius="full" 
            // src="/images/takuya.jpg" 
            alt="Profile Image" 
          />
        </Box>
      </Box>

      <Section delay={0.1}>
        <Heading as="h3" variant="section-title">
          Work
        </Heading>
        {/* TODO ::::: */}
        <Paragraph>
          Gwanwoo is a a full-stack developer based in Seoul with a
          passion for building digital services/stuff he wants. He has a knack
          for all things launching products, from planning and build all the
          way to solving real-life problems with code. When not online, he loves
          hanging out with his camera. 
          {/* TODO ::::  */}
          Currently, he is living off of his own
          product called{' '}
          <NextLink href="/works/inkdrop">
            <Link>Inkdrop</Link>
          </NextLink>
          .
        </Paragraph>
        <Box align="center" my={4}>
          <NextLink href="/works">
            <Button rightIcon={<ChevronRightIcon />} colorScheme="teal">
              My portfolio
            </Button>
          </NextLink>
        </Box>
      </Section>

      <Section delay={0.5}>
        <Heading as="h3" variant="section-title">
          Bio
        </Heading>
        <BioSection>
          <BioYear>1986</BioYear>
          Born in Gwang-ju, Korea.
        </BioSection>
        <BioSection>
          <BioYear>2012</BioYear>
          Acquired a Bachelor&apos;s degree of Jounalism.
        </BioSection>
        <BioSection>
          <BioYear>2019</BioYear>
          Completed Web Developer Curriculum 
        </BioSection>
      </Section>

      <Section delay={0.9}>
        <Heading as="h3" variant="section-title">
          I ♥
        </Heading>
        <Paragraph>
          Movie, Music, {' '}
          <Link href="https://brunch.co.kr/@zanki99" target="_blank">
            Photography And Writing
          </Link>
          , Sing a song as a Vocal in a Band, Playing Computer Game
        </Paragraph>
      </Section>
    </Container>
  )
}

export default Index;