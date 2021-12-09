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
          Printing Cider(크라우드 인쇄) <Badge>2020-2021</Badge>
        </Title>

        <List ml={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href='https://printingcider.io/' target="_blank">
              https://printingcider.io/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Web</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>React, Next.js, TypeScript, NodeJS, Graphql, MySQL, GCP</span>
          </ListItem>
        </List>

        <Section delay={0.1}>
          <Heading as="h3" variant="section-title" mt={8}>
            Overall
          </Heading>
          <P>인쇄 플랫폼에 크라우드 펀딩을 접목시킨 서비스입니다. 인쇄 용지의 구역을 나누어 인쇄에 참여할 고객을 모으고 제한된 인원수의 참여자가 모이면 인쇄를 시작합니다.</P>
        </Section>

        <Section delay={0.3}>
          <Heading as="h3" variant="section-title"  mt={8}>
            What I did
          </Heading>
          <P>크라우드 인쇄, 인쇄 단가 DB설계</P>
          <P>크라우드 인쇄 고객, 슈퍼 어드민, 파트너 어드민 프론트엔드 구현</P>
          <P>크라우드 인쇄 고객, 슈퍼 어드민, 파트너 어드민 백엔드 구현</P>
        </Section>
      
        <WorkImage src="/images/works/printing_cider/printing_cider_1.png" alt="printing_cider_1" />
        <WorkImage src="/images/works/printing_cider/printing_cider_2.png" alt="printing_cider_2" />
        <WorkImage src="/images/works/printing_cider/printing_cider_3.png" alt="printing_cider_3" />
        <WorkImage src="/images/works/printing_cider/printing_cider_4.png" alt="printing_cider_4" />
        <WorkImage src="/images/works/printing_cider/printing_cider_5.png" alt="printing_cider_5" />
        <WorkImage src="/images/works/printing_cider/printing_cider_7.png" alt="printing_cider_7" />
        <WorkImage src="/images/works/printing_cider/printing_cider_8.png" alt="printing_cider_8" />
      </Container>
    </Layout>
  )
}

export default Work;