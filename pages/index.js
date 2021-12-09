import NextLink from 'next/link';
import { 
  Container, 
  Box, 
  Heading, 
  Image, 
  Link, 
  Button, 
  Icon,
  List,
  ListItem,
  // SimpleGrid,
  useColorModeValue } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';
import Layout from '../components/layout/article';
import Section from '../components/section';
import Paragraph from '../components/paragraph';
import { BioSection, BioYear } from '../components/bio';
// import { GridItem } from '../components/grid-item';
import { IoLogoInstagram, IoLogoGithub } from 'react-icons/io5';

const Index = () => {

  return (
    <Layout>
      <Container>
        <Box borderRadius="lg" bg={useColorModeValue('whiteAlpha.500', 'whiteAlpha.200')} p={3} mb={6} align="center">
          웹 풀스택 개발자 임관우입니다.<br />
          Hello, I&apos;m a full-stack developer based in KOREA!<br />
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
              src="/images/gwanwoo_lim.jpeg" 
              alt="Profile Image" 
            />
          </Box>
        </Box>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title">
            Work
          </Heading>
          <Paragraph>
            사회에 도움이 되는 개발자가 되려 합니다. 이웃, 사회의 일에 민감하게 반응합니다. 주변의
            문제를 코딩으로 해결해보고자 합니다. 현재는 제로웨이스트 쇼핑몰 {' '}
            <NextLink href="/works/usle">
              <Link>우슬레</Link>
            </NextLink>
            에 집중하고 있습니다.
          </Paragraph>
        </Section>
        <Section delay={0.1}>
          <Paragraph>
            Gwanwoo is a full-stack developer based in Seoul with a
            passion for building digital services/stuff he wants. He has a knack
            for all things launching products, from planning and build all the
            way to solving real-life problems with code. 
            Currently, he is living off of his own
            product called{' '}
            <NextLink href="/works/usle">
              <Link>USLE</Link>
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
      
        <Section delay={0.3}>
          <Heading as="h3" variant="section-title">
            Bio
          </Heading>
          <BioSection>
            <BioYear>1986</BioYear>
            광주에서 태어났습니다.<br/>
            Born in Gwang-ju, Korea.<br/>
          </BioSection>
          <BioSection>
            <BioYear>2012</BioYear>
            한양대학교에서 문학사(신문방송학전공)를 취득했습니다.<br/>
            Acquired a Bachelor&apos;s degree of Jounalism.<br/>
          </BioSection>
          <BioSection>
            <BioYear>2019</BioYear>
            코리아IT 아카데미에서 웹개발, DBMS과정을 수료했습니다.<br/>
            Completed Web Developer Curriculum.<br/>
          </BioSection>
        </Section>


        <Section delay={0.5}>
          <Heading as="h3" variant="section-title">
            I ♥
          </Heading>
          <Paragraph>
            영화와 음악을 좋아합니다. 사진과 글쓰기를 좋아합니다. 밴드활동을 하고 있습니다.
            컴퓨터 게임으로 스트레스를 해소합니다.
          </Paragraph>
        </Section>
        <Section delay={0.5}>
          <Paragraph>
            Movie, Music, {' '}
            <Link href="https://brunch.co.kr/@zanki99" target="_blank">
              Photography And Writing
            </Link>
            , Sing a song as a Vocal in a Band, Playing Computer Game
          </Paragraph>
        </Section>

        <Section delay={0.7}>
          <Heading as="h3" variant="section-title">
            On the web
          </Heading>
          <List>
            <ListItem>
              <Link href="https://github.com/johnlim0218" target="_blank">
                <Button 
                  variant="ghost" 
                  colorScheme="teal" 
                  leftIcon={<Icon as={IoLogoGithub}/>}
                >
                  @johnlim0218
                </Button>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="https://cafe.naver.com/hoodcoat" target="_blank">
                <Button 
                  variant="ghost" 
                  colorScheme="teal" 
                  leftIcon={<Image src="/images/naver_cafe.svg" alt="image" />}
                >
                  cafe.naver.com/hoodcoat
                </Button>
              </Link>
            </ListItem>

            <ListItem>
              <Link href="https://instagram.com/gwan_woo_lim" target="_blank">
                <Button
                  variant="ghost"
                  colorScheme="teal"
                  leftIcon={<Icon as={IoLogoInstagram}/>}
                >
                  @gwan_woo_lim
                </Button>
              </Link>
            </ListItem>
          </List>
        </Section>
      </Container>
    </Layout>
  )
}

export default Index;