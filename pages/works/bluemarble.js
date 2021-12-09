import { Container, Badge, List, ListItem, Heading } from '@chakra-ui/react';
import { Title, WorkImage, Meta } from '../../components/work';
import P from '../../components/paragraph';
import Layout from '../../components/layout/article';
import Section from '../../components/section';

const Work = () => {
  return (
    <Layout title="PrintingCider">      
      <Container>
        <Title>
          블루마블 <Badge>2019</Badge>
        </Title>

        <List ml={4}>
          {/* <ListItem>
            <Meta>Website</Meta>
            <Link href='https://bluemarble.kr/' target="_blank">
              https://bluemarble.kr/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem> */}
          <ListItem>
            <Meta>Platform</Meta>
            <span>Windows</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Java, Java Swing</span>
          </ListItem>
        </List>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title" mt={8}>
            Overall
          </Heading>
          <P>Java와 Java의 GUI Tookit인 Java Swing으로 구현된 보드게임 블루마블입니다. 로컬로 최대 4인 플레이가 가능합니다. 블루마블의 모든 종류의 이벤트를 구현했습니다.</P>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title"  mt={8}>
            What I did
          </Heading>
          <P>게임 기획 및 설계, 구현</P>
          <P>그래픽 디자인</P>
          <P>쓰레드를 사용한 말의 실시간 이동</P>
          <P>황금열쇠, 우주여행, 무인도, 사회복지기금 등 게임 내 이벤트 구현</P>
          <P>재산 현황을 감지한 게임 종료</P>
        </Section>
      
        <WorkImage src="/images/works/bluemarble/bluemarble_1.png" alt="bluemarble_1" />
        <WorkImage src="/images/works/bluemarble/bluemarble_2.png" alt="bluemarble_2" />
        <WorkImage src="/images/works/bluemarble/bluemarble_3.png" alt="bluemarble_3" />
        <WorkImage src="/images/works/bluemarble/bluemarble_4.png" alt="bluemarble_4" />
        <WorkImage src="/images/works/bluemarble/bluemarble_5.png" alt="bluemarble_5" />
        <WorkImage src="/images/works/bluemarble/bluemarble_6.png" alt="bluemarble_6" />
        <WorkImage src="/images/works/bluemarble/bluemarble_7.png" alt="bluemarble_7" />
        <WorkImage src="/images/works/bluemarble/bluemarble_8.png" alt="bluemarble_8" />
      </Container>
    </Layout>
  )
}

export default Work;