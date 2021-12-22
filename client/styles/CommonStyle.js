import styled from "styled-components";

export const Container = styled.main`
  padding: 7rem 0 0 0;
  min-height: 83vh;
`;

export const SectionContainer = styled.section`
  padding-bottom: ${(props) => (props.under ? 0 : 2)}rem;
  margin: 0 calc(8% - 20px) 0px;
  @media only screen and (max-width: 45rem) {
    padding-bottom: 1.5rem;
  }
`;
export const Title = styled.h1`
  grid-column: ${(props) => (props.Long ? "1/span 19" : "1/span 16")};
  font-size: 5rem;
  line-height: 1.05;
  @media only screen and (max-width: 45rem) {
    font-size: 3rem;
  }
`;

export const HeaderIntro = styled.h2`
  font-size: 1.2rem;
  @media only screen and (max-width: 45rem) {
    font-size: 1rem;
  }
`;

export const GridRow = styled.div`
  display: grid;
  align-content: flex-start;
  align-items: flex-start;
  grid-template-columns: repeat(23, 1fr);
  @media only screen and (max-width: 45rem) {
    display: ${(props) => props.information && "flex"};
    flex-direction: column;
  }
`;

export const IntroWrapper = styled.div`
  display: grid;
  align-content: flex-start;
  align-items: flex-start;
  grid-template-columns: repeat(11, 1fr);
  @media only screen and (max-width: 64rem) {
    /* grid-template-columns: ${(props) => props.rows && 0}; */
    grid-template-rows: ${(props) => props.rows && "repeat(2, 1fr)"};
  }
`;

export const MainGridRow = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  @media only screen and (max-width: 64rem) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media only screen and (max-width: 45rem) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Markdown = styled.div`
  grid-column: 1 / span 7;
  padding-top: 1.25rem;
`;

export const Hr = styled.hr`
  background: #000;
  height: 3px;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 0;
`;

export const ImageContainer = styled.article`
  position: relative;
  height: 100%;
`;
export const NameBox = styled.div`
  bottom: 0;
  position: absolute;
  width: 100%;
  display: block;
  background-color: #061c25;
  padding: 6% 8%;
  transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`;

export const Name = styled.span`
  display: inline-block;
  color: white;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  font-size: 0.815rem;
  font-weight: 800;
  line-height: 0.8;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  transition: transform 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
`;

export const ImageCover = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
`;

export const ImageWrapper = styled.div`
  overflow: hidden;
  width: 100%;
  height: 100%;
  :hover {
    cursor: pointer;
    ${ImageCover} {
      transform: scale(1.1);
    }
    ${NameBox} {
      background-color: #00667f;
    }
    ${Name} {
      padding-left: 10%;
    }
  }
`;

export const Images = styled.img`
  width: 100%;
  height: ${(props) => (props.large ? "100%" : "20vw")};
  object-fit: ${(props) => (props.large ? "contain" : "cover")};
  position: relative;
  margin: 0;
  padding: 0;
  @media only screen and (max-width: 64rem) {
    height: ${(props) => (props.large ? "100%" : "25vw")};
  }
  @media only screen and (max-width: 45rem) {
    height: 42vw;
  }
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const SubmitBtn = styled.button`
  background: black;
  border-radius: 50px;
  border: 3px solid black;
  width: 8rem;
  height: 2.8rem;
  color: white;
  text-align: center;
  cursor: pointer;

  span {
    font-size: 1.5rem;
    font-family: "Noto Sans", sans-serif;
    line-height: 1.4rem;
  }
`;
