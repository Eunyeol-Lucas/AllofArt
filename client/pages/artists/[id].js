import axios from "axios";
import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";
import apiUrl from "../../lib/api";
import * as Style from "../../styles/CommonStyle";

export default function Artist({
  descDetail,
  descSimple,
  genre,
  images,
  nation,
  year,
  name,
}) {
  const router = useRouter();
  const observerOption = {
    root: null,
    rootMargin: "0px 0px 30px 0px",
    threshold: 0,
  };

  useEffect(() => {
    if (window !== undefined) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    }, observerOption);
    const lazyImgs = document.querySelectorAll(".lazy-img");
    lazyImgs.forEach((el) => {
      io.observe(el);
    });
  });
  return (
    <Style.Container>
      {router.isFallback ? (
        <Style.SectionContainer>
          <LoadingWrapper>
            <CircularProgress />
          </LoadingWrapper>
        </Style.SectionContainer>
      ) : (
        <>
          <Style.SectionContainer>
            <Style.GridRow>
              <Style.Title>{name}</Style.Title>
            </Style.GridRow>
            <Style.IntroWrapper>
              <Style.Markdown>
                <Style.HeaderIntro>{descSimple}</Style.HeaderIntro>
              </Style.Markdown>
            </Style.IntroWrapper>
          </Style.SectionContainer>
          <Style.SectionContainer>
            <Style.Hr />
          </Style.SectionContainer>
          <Style.SectionContainer>
            <Style.GridRow information>
              <ImageContainer>
                <ImageWrapper>
                  <ImageCover>
                    <ArtistImage
                      data-src={`${apiUrl}${images[0]}`}
                      alt={name}
                      className="lazy-img"
                    />
                  </ImageCover>
                </ImageWrapper>
              </ImageContainer>
              <PrivateInfo>
                <div>
                  <p>출생 - 사망 : {year}</p>
                  <p>장르 : {genre}</p>
                  <p>국적 : {nation}</p>
                </div>
                <div>
                  <p>{descDetail}</p>
                </div>
              </PrivateInfo>
            </Style.GridRow>
          </Style.SectionContainer>
          <TitleWrapper TitleWrapper>
            <h2>{name}의 작품들</h2>
          </TitleWrapper>
          <Style.SectionContainer under>
            <ImagesContainer>
              {images.slice(1, 7).map((image) => (
                <ImageWrapper piece key={image}>
                  <ImageCover>
                    <img
                      src="/images/gray.png"
                      data-src={`${apiUrl}${image}`}
                      alt="artist masterpiece"
                      className="lazy-img"
                    />
                  </ImageCover>
                </ImageWrapper>
              ))}
            </ImagesContainer>
          </Style.SectionContainer>
        </>
      )}
    </Style.Container>
  );
}

Artist.propTypes = {
  descDetail: PropTypes.string.isRequired,
  descSimple: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  nation: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export async function getStaticPaths() {
  const response = await axios.get("/api/artist");
  const { data } = response;
  return {
    paths: data.slice(0, 2).map((item) => ({
      params: {
        id: item.id.toString(),
      },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const response = await axios.get(`/api/artist/detail/${params.id}`);
  const { data } = response;

  return {
    props: {
      descDetail: data.desc_detail,
      descSimple: data.desc_simple,
      genre: data.genre,
      images: data.images,
      nation: data.nation,
      year: data.year,
      name: data.name,
    },
  };
}

const LoadingWrapper = styled.div`
  display: flex;
  padding-top: 20vh;
  justify-content: center;
`;

const TitleWrapper = styled.div`
  margin: 0 calc(8% - 20px) 1.5rem;
`;

const ImageContainer = styled.figure`
  margin-bottom: 1.5rem;
  grid-column: 1 / span 7;
  overflow: hidden;
  width: 100%;
  height: 100%;
  > div {
    width: 100%;
    height: 100%;
    :hover {
      cursor: pointer;
    }
  }
`;

const ImageCover = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
`;

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  height: ${(props) => (props.piece ? "20vw" : "100%")};
  :hover {
    cursor: pointer;
    ${ImageCover} {
      transform: scale(1.1);
    }
  }
  @media only screen and (max-width: 45rem) {
    height: ${(props) => (props.piece ? "42vw" : "200px")};
  }
`;

const ArtistImage = styled.img`
  position: relative;
  top: 160;
  left: 150;
  object-fit: cover;
  width: 100%;
  height: 30vw;
  @media only screen and (max-width: 45rem) {
    height: 90vw;
  }
`;

const PrivateInfo = styled.div`
  grid-column: 9 / span 15;
  font-size: 1rem;
  font-weight: 700;
  > div {
    margin-bottom: 1.5rem;
  }
`;

const ImagesContainer = styled.div`
  margin: 2rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3vw;
  @media only screen and (max-width: 45rem) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
