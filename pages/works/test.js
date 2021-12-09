import { Container, Badge, Link, List, ListItem } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { Title, WorkImage, Meta } from '../../components/work';
import P from '../../components/paragraph';
import Layout from '../../components/layout/article';

const Work = () => {
  return (
    <Layout title="TEST">      
      <Container>
        <Title>
          TEST <Badge>2020</Badge>
        </Title>
        <P>
          A Markdown note-taking app with 100+ plugins, cross-platform and encrypted data sync support. The life-time revenus is more.
        </P>
        <List ml={4} my={4}>
          <ListItem>
            <Meta>Website</Meta>
            <Link href='https://www.inkdrop.app/' target="_blank">
              https://www.inkdrop.app/ <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
          <ListItem>
            <Meta>Platform</Meta>
            <span>Windows/macOs/Linux/iOS/Android</span>
          </ListItem>
          <ListItem>
            <Meta>Stack</Meta>
            <span>NodeJS, Electron, React Native</span>
          </ListItem>
          <ListItem>
            <Meta>Blogpost</Meta>
            <Link href="https://blog.inkdrop.app/how-ive-attracted-the-first-500-paid-users-for-my-saas-that-costs-5-mo-7a5b94b8e820">
              How I’ve Attracted The First 500 Paid Users For My SaaS That Costs
              $5/mo <ExternalLinkIcon mx="2px" />
            </Link>
          </ListItem>
        </List>

        <WorkImage src="/images/works/printing_cider/printing_cider_1.png" alt="printing_cider_1" />
        <WorkImage src="/images/works/printing_cider/printing_cider_2.png" alt="printing_cider_2" />
        <WorkImage src="/images/works/printing_cider/printing_cider_3.png" alt="printing_cider_3" />
        <WorkImage src="/images/works/printing_cider/printing_cider_4.png" alt="printing_cider_4" />
        <WorkImage src="/images/works/printing_cider/printing_cider_5.png" alt="printing_cider_5" />
        <WorkImage src="/images/works/printing_cider/printing_cider_6.png" alt="printing_cider_6" />
        <WorkImage src="/images/works/printing_cider/printing_cider_7.png" alt="printing_cider_7" />
        <WorkImage src="/images/works/printing_cider/printing_cider_8.png" alt="printing_cider_8" />
      </Container>
    </Layout>
  )
}

export default Work;