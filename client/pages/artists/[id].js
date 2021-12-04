import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ArrowDownward } from "@material-ui/icons";
import { createMedia } from "@artsy/fresnel";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
    xl: 1192,
  },
});
function Artist() {
  // TODO: default {}로 수정 예정
  const [artistInfo, setArtistInfo] = useState({
    image: "/images/picture1.jpeg",
    name: "Amedeo Modigliani",
    years: "2002 - 2021",
    genre: "Expressionism",
    nationality: "Italian",
    desc: "Amedeo Clemente Modigliani (Italian pronunciation: [amedo modiani]; 12 July 1884  24 January 1920) was an Italian Jewish painter and sculptor who worked mainly in France. He is known for portraits and nudes in a modern style characterized by elongation of faces, necks, and figures that were not received well during his lifetime but later found acceptance. Modigliani spent his youth in Italy, where he studied the art of antiquity and the Renaissance. In 1906 he moved to Paris, where he came into contact with such artists as Pablo Picasso and Constantin Brâncui. By 1912 Modigliani was exhibiting highly stylized sculptures with Cubists of the Section d'Or group at the Salon d'Automne.",
    paintings: [
      "/images/picture1.jpeg",
      "/images/picture2.jpeg",
      "/images/picture3.png",
    ],
  });
  const [progressValue, setProgressValue] = useState("0.33");
  const [currTab, setCurrTab] = useState("About");

  const aboutRef = useRef();
  const lifeRef = useRef();
  const paintingsRef = useRef();

  const router = useRouter();
  const params = router.query.id;
  // TODO: console.log 삭제
  console.log(router.query);

  const handleClickTab = (e) => {
    setCurrTab(e.target.textContent);
    console.log(currTab);

  };

  const content = (
    <>
      <Media greaterThanOrEqual="md">
        <div>
          {currTab === "About" && (
            <AboutContainer ref={aboutRef}>
              <p>Years: {artistInfo.years}</p>
              <p>Genre: {artistInfo.genre}</p>
              <p>Nationality: {artistInfo.nationality}</p>
            </AboutContainer>
          )}
          {currTab === "Life" && (
            <LifeContainer ref={lifeRef}>
              <p>{artistInfo.desc}</p>
            </LifeContainer>
          )}
          {currTab === "Paintings" && (
            <ImagesWrapper ref={paintingsRef}>
              <PaintingImage src={artistInfo.paintings[0]} />
              <PaintingImage src={artistInfo.paintings[1]} />
              <PaintingImage src={artistInfo.paintings[2]} />
            </ImagesWrapper>
          )}
        </div>
      </Media>
      <Media lessThan="md">
        <div>
          <AboutContainer>
            <p>Years: {artistInfo.years}</p>
            <p>Genre: {artistInfo.genre}</p>
            <p>Nationality: {artistInfo.nationality}</p>
          </AboutContainer>
          <LifeContainer>
            <p>{artistInfo.desc}</p>
          </LifeContainer>
          <ImagesWrapper>
            <PaintingImage src={artistInfo.paintings[0]} />
            <PaintingImage src={artistInfo.paintings[1]} />
            <PaintingImage src={artistInfo.paintings[2]} />
          </ImagesWrapper>
        </div>
      </Media>
    </>
  );
  const fetch = async () => {
    try {
      const response = await axios.get(`api/artists/${params}`);
      // TODO: console.log 삭제
      console.log(response.data);
      setArtistInfo(response.data);
    } catch (e) {
      console.log(e.response);
    }
  };
  const navList = ["About", "Life", "Paintings"];

  return (
    <Container>
      {artistInfo && (
        <InfoWrapper>
          <GridRow>
            <ImageWrapper>
              <TeaserImage>
                <Image src={artistInfo.image} alt="artistImage" />
              </TeaserImage>
            </ImageWrapper>
            <ArtistInfo>
              <H1>{artistInfo.name}</H1>
              <GridContainer>
                <NavItems>
                  {navList.map((nav, idx) => (
                    <NavItem key={idx}>
                      <Alink href="#" onClick={handleClickTab}>
                        {nav}
                        <ArrowWrapper>
                          <ArrowDownward />
                        </ArrowWrapper>
                      </Alink>
                    </NavItem>
                  ))}
                </NavItems>
                <Progress value={progressValue}></Progress>
              </GridContainer>
              {content}
            </ArtistInfo>
          </GridRow>
        </InfoWrapper>
      )}
    </Container>
  );
}

export default function ResponsiveFresnelComponent() {
  return (
    <MediaContextProvider>
      <Artist />
    </MediaContextProvider>
  );
}

const Container = styled.main`
  padding: 10rem 0;
  height: 400px;
`;

const InfoWrapper = styled.section`
  padding-bottom: 3.75rem;
  margin: 0 calc(8% - 20px) 0px;
`;

const GridRow = styled.div`
  display: grid;
  align-content: flex-start;
  align-items: flex-start;
  grid-template-columns: repeat(24, 1fr);
`;

const TeaserImage = styled.figure`
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
`;

const ImageWrapper = styled.div`
  grid-column: 1 / span 10;
  overflow: hidden;
  height: 100%;
  :hover {
    cursor: pointer;
    ${TeaserImage} {
      transform: scale(1.1);
    }
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  padding: 0;
`;

const ArtistInfo = styled.article`
  grid-column: 12 / span 23;
`;

const H1 = styled.h1`
  grid-column: 1 / span 16;
  font-size: 5vw;
  line-height: 1.05;
  @media only screen and (max-width: 45rem) {
    font-size: 3rem;
  }
`;

const GridContainer = styled.div`
  width: 100%;
  margin-bottom: 3vw;
  display: block;
  transition: background-color 0.6s linear, opacity 0.2s linear;
  position: sticky;
  top: 0;
  padding: 0;
  @media only screen and (min-width: 64em) {
    font-weight: 500;
    font-size: 1rem;
  }
`;

const NavItems = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  @media only screen and (max-width: 45rem) {
    display: none;
  }
`;

const Progress = styled.progress`
  display: block;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 3px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  ::-webkit-progress-bar {
    background-color: grey;
    width: 100%;
  }
  ::-webkit-progress-value {
    background-color: rgba(0, 0, 0, 1);
    -webkit-transition: width 1s ease;
    -moz-transition: width 1s ease;
    -o-transition: width 1s ease;
    transition: width 1s ease;
  }
`;

const ArrowWrapper = styled.div`
  line-height: 0;
  margin-left: 0.5rem;
  z-index: -1;
`;

const NavItem = styled.li`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  :hover {
    ${ArrowWrapper} {
      animation: bounce;
      animation-duration: 500ms;
      animation-iteration-count: infinite;
    }
    @keyframes bounce {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(5px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;

const Alink = styled.div`
  flex: 1 1 auto;
  padding: 1rem 0;
  margin: -1rem 0;
  display: inline-flex;
  align-items: center;
  font-weight: 700;
  color: #000;
  text-decoration: none;
  :hover {
    cursor: pointer;
  }
`;

const ImagesWrapper = styled.figure`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 1em;
`;

const PaintingImage = styled.img`
  width: 100%;
`;

const AboutContainer = styled.div`
  font-size: 3vw;
`;
const LifeContainer = styled.div`
  font-size: 1.25vw;
`;
