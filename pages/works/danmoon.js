import { Container, Badge, List, ListItem, Heading } from '@chakra-ui/react';
import { Title, WorkImage, Meta } from '../../components/work';
import P from '../../components/paragraph';
import Layout from '../../components/layout/article';
import Section from '../../components/section';

const Work = () => {
  return (
    <Layout title="SAT-NATION">      
      <Container>
        <Title>
          단문 <Badge>2019</Badge>
        </Title>

        <List ml={4}>
          {/* <ListItem>
            <Meta>Website</Meta>
            <Link href='https://sat-nation.com/'>
              https://sat-nation.com/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem> */}
          <ListItem>
            <Meta>Platform</Meta>
            <span>Android</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>Java, Android Studio, Spring Framework, MySQL, SQLite</span>
          </ListItem>
        </List>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title" mt={8}>
            Overall
          </Heading>
          <P>사용자에게 단어 등 글감을 주고 작문을 유도하는 서비스입니다. 사용자는 글감을 받을 시간을 정할 수 있습니다. 사용자가 작성한 글은 다른 사용자와 공유 할 수 있으며 사용자는 다른 사용자가 작성한 글을 열람할 수 있습니다.</P>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title"  mt={8}>
            What I did
          </Heading>
          <P>서비스 기획 및 설계, 구현</P>
          <P>안드로이드 어플리케이션 개발</P>
          <P>MVC패턴을 사용한 백엔드 구현</P>
        </Section>
      
        <WorkImage src="/images/works/danmoon/danmoon_1.png" alt="danmoon_1" />
        <WorkImage src="/images/works/danmoon/danmoon_2.png" alt="danmoon_2" />
        <WorkImage src="/images/works/danmoon/danmoon_3.png" alt="danmoon_3" />
        <WorkImage src="/images/works/danmoon/danmoon_4.png" alt="danmoon_4" />
      </Container>
    </Layout>
  )
}

export default Work;