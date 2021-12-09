import { Container, Badge, Link, List, ListItem, Heading } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import P from '../../components/paragraph';
import Layout from '../../components/layout/article';
import Section from '../../components/section';

const Work = () => {
  return (
    <Layout title="SAT-NATION">      
      <Container>
        <Title>
          SAT-NATION <Badge>2020</Badge>
        </Title>

        <List ml={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href='https://sat-nation.com/'>
              https://sat-nation.com/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>React, Next.js, TypeScript, NodeJS, Graphql, MongoDB, GCP</span>
          </ListItem>
        </List>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title" mt={8}>
            Overall
          </Heading>
          <P>미국의 수학능력시험인 SAT를 준비하는 학생들을 위한 학습 웹서비스입니다.</P>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title"  mt={8}>
            What I did
          </Heading>
          <P>SAT 테스트 기능 관련 백엔드, 프론트엔드 구현</P>
          <P>학습 코스 및 테스트 입력 어드민 구현</P>
          <P>정기결제 기능 구현</P>
        </Section>
      
        <WorkImage src="/images/works/rws/rws_1.png" alt="rws_1" />
        <WorkImage src="/images/works/rws/rws_3.png" alt="rws_3" />
        <WorkImage src="/images/works/rws/rws_4.png" alt="rws_4" />
        <WorkImage src="/images/works/rws/rws_6.png" alt="rws_6" />
        <WorkImage src="/images/works/rws/rws_7.png" alt="rws_7" />
        <WorkImage src="/images/works/rws/rws_9.png" alt="rws_9" />
      </Container>
    </Layout>
  )
}

export default Work;