import { Container, Heading, SimpleGrid, Divider } from '@chakra-ui/react';
import Layout from '../components/layout/article';
import Section from '../components/section';
import { WorkGridItem } from '../components/grid-item';

import thumbUsle from '../public/images/works/thumbs/usle_thumb.jpg';
import thumbPrintingCider from '../public/images/works/thumbs/printing_cider_thumb.jpg';
import thumbRWS from '../public/images/works/thumbs/rws_thumb.jpg';
import thumbDanmoon from '../public/images/works/thumbs/danmoon_thumb.jpg';
import thumbBluemarble from '../public/images/works/thumbs/bluemarble_thumb.jpg';
import thumbMatcha from '../public/images/works/thumbs/matcha_thumb.jpg';

const Works = () => {
  return (
    <Layout>
      <Container>
        <Heading as="h3" fontSize={20} mb={4}>
          Works
        </Heading> 
        <SimpleGrid columns={[ 1, 1, 2 ]} gap={6}>
          <Section>
            <WorkGridItem id="usle" title="우슬레" thumbnail={thumbUsle}>
              제로웨이스트 쇼핑몰 우슬레의 웹페이지입니다. 우슬레의 웹페이지에는 B2C, B2B 페이지가 있습니다.
            </WorkGridItem>
          </Section>
          <Section>
            <WorkGridItem id="printingcider" title="프린팅사이다" thumbnail={thumbPrintingCider}>
              인쇄 플랫폼에 크라우드 펀딩을 접목시킨 서비스입니다.
            </WorkGridItem>
          </Section>
          <Section delay={0.3}>
            <WorkGridItem id="rws" title="RWS" thumbnail={thumbRWS}>
              미국의 수학능력시험인 SAT를 준비하는 학생들을 위한 학습 웹서비스입니다.
            </WorkGridItem>
          </Section>
        </SimpleGrid>

        {/* <Section delay={0.2}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4}>
            Collaborations
          </Heading>
        </Section>

        <SimpleGrid columns={[ 1, 1, 2 ]} gap={6}>
          <Section delay={0.3}>
            <WorkGridItem id="test" title="test" thumbnail={thumbModeTokyo}>
            A VR Creative tools for fashion brands
            </WorkGridItem>
          </Section>
        </SimpleGrid> */}


        <Section delay={0.5}>
          <Divider my={6} />

          <Heading as="h3" fontSize={20} mb={4}>
            Etude
          </Heading>
        </Section>

        <SimpleGrid columns={[ 1, 1, 2 ]} gap={6}>
          <Section delay={0.5}>
            <WorkGridItem id="danmoon" title="단문" thumbnail={thumbDanmoon}>
              하루 중 정해진 시간에 글감을 사용자에게 보내, 글쓰기에 대한 부담을 덜어주고자 기획한 서비스입니다.
            </WorkGridItem>
          </Section>
          <Section delay={0.5}>
            <WorkGridItem id="bluemarble" title="게임 블루마블" thumbnail={thumbBluemarble}>
              Java로 제작된 보드게임 블루마블입니다.
            </WorkGridItem>
          </Section>

          <Section delay={0.7}>
            <WorkGridItem id="matcha" title="MATCHA" thumbnail={thumbMatcha}>
              영화진흥위원회 공공데이터를 활용한 영화 정보 검색 서비스입니다.
            </WorkGridItem>
          </Section>
        </SimpleGrid>
        
      </Container>
    </Layout>
  )
}

export default Works;
