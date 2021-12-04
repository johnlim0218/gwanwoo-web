import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react';
import Section from '../components/section';
import { WorkGridItem } from '../components/grid-item';

import thumbInkdrop from '../public/images/works/inkdrop_eyecatch.png';
import thumbModeTokyo from '../public/images/works/modetokyo_eyecatch.png';

const Works = () => {
  return (
    <Container>
      <Heading as="h3" fontSize={20} mb={4}>
        Works
      </Heading> 
      <SimpleGrid columns={[ 1, 1, 2 ]} gap={6}>
        <Section delay={0.1}>
          {/* TODO ::::: */}
          <WorkGridItem id="USLE" title="USLE" thumbnail={thumbInkdrop}>
            A Markdown note-taking app with 100+ plugins, cross-platform and
            encrypted data sync support
          </WorkGridItem>
        </Section>
      </SimpleGrid>

      <Section delay={0.2}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Collaborations
        </Heading>
      </Section>

      <SimpleGrid columns={[ 1, 1, 2 ]} gap={6}>
        <Section delay={0.3}>
          {/* TODO ::::: */}
          <WorkGridItem id="test" title="test" thumbnail={thumbModeTokyo}>
          A VR Creative tools for fashion brands
          </WorkGridItem>
        </Section>
      </SimpleGrid>


      <Section delay={0.5}>
        <Divider my={6} />

        <Heading as="h3" fontSize={20} mb={4}>
          Etude
        </Heading>
      </Section>

      <SimpleGrid columns={[ 1, 1, 2 ]} gap={6}>
        <Section delay={0.3}>
          {/* TODO ::::: */}
          <WorkGridItem id="test" title="test" thumbnail={thumbModeTokyo}>
          A VR Creative tools for fashion brands
          </WorkGridItem>
        </Section>
      </SimpleGrid>
      
    </Container>
  )
}

export default Works;
