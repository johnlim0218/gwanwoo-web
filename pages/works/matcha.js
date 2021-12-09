import { Container, Badge, List, ListItem, Heading } from '@chakra-ui/react';
import { Title, WorkImage, Meta } from '../../components/work';
import P from '../../components/paragraph';
import Layout from '../../components/layout/article';
import Section from '../../components/section';

const Work = () => {
  return (
    <Layout title="MATCHA">      
      <Container>
        <Title>
          MATCHA <Badge>2019</Badge>
        </Title>

        <List ml={4}>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Java, JSP, Javascript, Jquery, MariaDB, Tomcat</span>
          </ListItem>
        </List>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title" mt={8}>
            Overall
          </Heading>
          <P>영화진흥위원회 공공데이터를 활용한 영화 정보 검색 서비스입니다.</P>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title"  mt={8}>
            What I did
          </Heading>
          <P>서비스 기획 및 설계, 구현</P>
          <P>서비스 메인페이지, 영화 상세정보 페이지 구현(프론트엔드, 백엔드)</P>
          <P>공공데이터 API를 활용한 영화 검색 엔진 구현 </P>
          <P>이미지 크롤링 기능 구현</P>
          <P>보고싶어요 및 평점, 코멘트 기능 구현</P>
          <P>검색 속도 최적화</P>
        </Section>
      
        <WorkImage src="/images/works/matcha/matcha_1.png" alt="matcha_1" />
        <WorkImage src="/images/works/matcha/matcha_2.png" alt="matcha_2" />
        <WorkImage src="/images/works/matcha/matcha_3.png" alt="matcha_3" />
        <WorkImage src="/images/works/matcha/matcha_4.png" alt="matcha_4" />
        <WorkImage src="/images/works/matcha/matcha_5.png" alt="matcha_5" />
        <WorkImage src="/images/works/matcha/matcha_6.png" alt="matcha_6" />
        <WorkImage src="/images/works/matcha/matcha_7.png" alt="matcha_7" />
        <WorkImage src="/images/works/matcha/matcha_8.png" alt="matcha_8" />
        <WorkImage src="/images/works/matcha/matcha_9.png" alt="matcha_9" />
        <WorkImage src="/images/works/matcha/matcha_10.png" alt="matcha_10" />
      </Container>
    </Layout>
  )
}

export default Work;