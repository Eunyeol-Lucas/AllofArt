import { useRef, useState } from "react";
import styled, { css } from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import Profile from "../src/components/cardbox/Profile";
import { members } from "../data/aboutPageData";

export default function About() {
  const container = useRef();

  const [isFirstPage, setIsFirstPage] = useState(true);

  const onClickPrevBtn = () => {
    setIsFirstPage(true);
    container.current.style.transform = "none";
  };

  const onClickNextBtn = () => {
    setIsFirstPage(false);
    container.current.style.transform = `translateX(-100vw)`;
  };

  return (
    <Wrapper>
      <Container ref={container}>
        <PageWrapper>
          {members.slice(0, 4).map(({ Img, name, role, introduce, colors }) => (
            <Profile
              Img={Img}
              name={name}
              role={role}
              introduce={introduce}
              key={name}
              colors={colors}
            />
          ))}
        </PageWrapper>
        <PageWrapper>
          {members.slice(4).map(({ Img, name, role, introduce, colors }) => (
            <Profile
              Img={Img}
              name={name}
              role={role}
              introduce={introduce}
              key={name}
              colors={colors}
            />
          ))}
        </PageWrapper>
      </Container>

      <BtnContainer isFirstPage={isFirstPage}>
        {!isFirstPage && (
          <PreviousButton onClick={onClickPrevBtn}>
            <Animation
              autoplay
              loop
              src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
            />
          </PreviousButton>
        )}
        <Circle color={isFirstPage} />
        <Circle color={!isFirstPage} />
        {isFirstPage && (
          <NextButton onClick={onClickNextBtn}>
            <Animation
              autoplay
              loop
              src="https://assets4.lottiefiles.com/private_files/lf30_vejj8cpm.json"
            />
          </NextButton>
        )}
      </BtnContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 18vh;
`;

const Container = styled.div`
  display: flex;
  overflow-x: hidden;
  width: 200vw;
  transition: all 0.5s ease-in-out;
`;

const PageWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  font-size: 16px;
  width: 100vw;
  height: 100%;

  @media only screen and (max-width: 45rem) {
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.isFirstPage
      ? css`
          margin-left: 6vw;
          @media only screen and (max-width: 45rem) {
            margin-left: 14vw;
          }
        `
      : css`
          margin-right: 5vw;
          @media only screen and (max-width: 45rem) {
            margin-right: 10vw;
          }
        `}
`;

const Circle = styled.span`
  background: ${(props) => (props.color ? "gray" : "transparent")};
  width: 30px;
  height: 30px;
  border: solid 3px black;
  border-radius: 50px;
  transition: all 0.5s ease-in-out;
  margin-right: 1vw;

  @media only screen and (max-width: 45rem) {
    width: 20px;
    height: 20px;
  }
`;

const PreviousButton = styled.div`
  transform: rotate(90deg);
`;

const NextButton = styled(PreviousButton)`
  transform: rotate(-90deg);
`;

const Animation = styled(Player)`
  height: 100px;
  width: 100px;

  @media only screen and (max-width: 45rem) {
    width: 80px;
    height: 80px;
  }
`;
