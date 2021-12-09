import { Container, Badge, Link, List, ListItem, Heading } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import P from '../../components/paragraph';
import Layout from '../../components/layout/article';
import Section from '../../components/section';

const Work = () => {
  return (
    <Layout title="PrintingCider">      
      <Container>
        <Title>
          우슬레 <Badge>2019-2021</Badge>
        </Title>

        <List ml={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href='https://usle.kr/' target="_blank">
              https://usle.kr/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>React, Next.js, TypeScript, NestJS, MySQL, AWS</span>
          </ListItem>
        </List>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title" mt={8}>
            Overall
          </Heading>
          <P>제로웨이스트 쇼핑몰 우슬레의 웹페이지입니다. 우슬레의 웹페이지에는 B2C, B2B 페이지가 있습니다. B2C 페이지는 결제 기능을 포함한 일반 쇼핑몰 입니다. B2B 페이지에서는 사용자가 제로웨이스트 키트 품목을 커스터마이징 할 수 있습니다. 커스터마이징 한 제로웨이스트 키트로 사용자는 견적서를 받아볼 수 있습니다.</P>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title"  mt={8}>
            What I did
          </Heading>
          <P>쇼핑몰 기획 및 설계, 구현</P>
          <P>쇼핑몰 첫번째 버전(2019-2020)의 프론트엔드와 백엔드를 구현</P>
          <P>쇼핑몰 두번째 버전(현재)의 프론트엔드와 백엔드를 구현</P>
          <P>쇼핑몰 어드민 프론트엔드, 백엔드 구현</P>
        </Section>
      
        <WorkImage src="/images/works/usle/usle_1.png" alt="usle_1" />
        <WorkImage src="/images/works/usle/usle_2.png" alt="usle_2" />
        <WorkImage src="/images/works/usle/usle_3.png" alt="usle_3" />
        <WorkImage src="/images/works/usle/usle_4.png" alt="usle_4" />
      </Container>
    </Layout>
  )
}

export default Work;