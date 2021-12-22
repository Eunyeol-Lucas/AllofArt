import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { Button } from "@material-ui/core";
import * as Style from "../../styles/CommonStyle";
import apiUrl from "../../lib/api";

export default function AnalysisArtistInfo({
  desc,
  artistName,
  artistImages,
  artistId,
}) {
  return (
    <Container>
      <GridRow>
        <DescContainer>
          <NameButtonContainer>
            <ArtistName>{artistName}</ArtistName>
            <MainButton type="button">
              <Link href={`/artists/${artistId}`} passHref>
                {`${artistName} 더 알아보기`}
              </Link>
            </MainButton>
          </NameButtonContainer>
          <p>{desc}</p>
        </DescContainer>
      </GridRow>
      <GridRow>
        <ImagesContainer>
          {artistImages.map((image) => (
            <Style.ImageContainer key={image}>
              <Style.ImageWrapper>
                <Style.ImageCover>
                  <Style.Images large src={`${apiUrl}${image}`} alt="#" />
                </Style.ImageCover>
              </Style.ImageWrapper>
            </Style.ImageContainer>
          ))}
        </ImagesContainer>
      </GridRow>
    </Container>
  );
}

AnalysisArtistInfo.propTypes = {
  desc: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  artistImages: PropTypes.arrayOf(PropTypes.string).isRequired,
  artistId: PropTypes.number.isRequired,
};

const Container = styled.article`
  padding: 2rem 0 0 0;
  margin: 0 calc(8% - 20px) 0px;
  width: 100%;
  height: 100%;
  @media only screen and (max-width: 45rem) {
    padding-top: 1.5rem;
  }
`;

const GridRow = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: repeat(23, 1fr);
  margin-bottom: 2rem;
`;

const DescContainer = styled.div`
  grid-column: 2 / span 21;
  > p {
    font-size: 1rem;
    font-weight: 700;
  }
`;

const ImagesContainer = styled.figure`
  grid-column: 2 / span 21;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 2vw;
`;

const ArtistName = styled.h2`
  font-size: 2rem;
  margin-right: 2rem;
`;

const MainButton = styled(Button)`
  background: #fa9c30;
  border-radius: 50px;
  color: #fff;
  &:hover {
    background: #e36b20;
  }
  a {
    color: #000;
    text-decoration: none;
  }
`;

const NameButtonContainer = styled.div`
  display: flex;
  align-items: center;
  align-text: center;
  @media only screen and (max-width: 45rem) {
    flex-direction: column;
    align-items: start;
  }
`;
