import Card from "../src/components/cardbox/Card";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { mainPageImg } from "../data/mainPageImg";
import styles from "../styles/main.module.css";
import Options from "../src/components/main/Options";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "@material-ui/core";
export default function Home() {
  const [background, setBackGround] = useState("#f7c73b");
  const container = useRef();

  useEffect(() => {
    const changeColor = () => {
      if (
        container.current.scrollLeft >= 0 &&
        container.current.scrollLeft < 450
      ) {
        setBackGround("#f7c73b");
      }
      if (
        container.current.scrollLeft >= 450 &&
        container.current.scrollLeft < 880
      ) {
        setBackGround("#57679c");
      }

      if (
        container.current.scrollLeft >= 1200 &&
        container.current.scrollLeft < 1500
      ) {
        setBackGround("#bc9473");
      }
      if (
        container.current.scrollLeft >= 1500 &&
        container.current.scrollLeft < 1900
      ) {
        setBackGround("#4a6396");
      }
      if (container.current.scrollLeft >= 1900) {
        setBackGround("#f7c73b");
      }
    };
    if (typeof document.body != undefined) {
      document.body.addEventListener("wheel", changeColor);
      return () => {
        document.body.removeEventListener("wheel", changeColor);
      };
    }
  }, []);
  useEffect(() => {
    if (container.current) {
      let flag = false;
      let counter = [];

      const handleWheel = (e) => {
        counter.push(e.deltaY);
        if (flag === true) return;
        flag = true;
        if (e.deltaY > 0) {
          if (counter.length < 20)
            container.current.scrollTo({
              left: container.current.scrollLeft + 200 - 100 / counter.length,
              behavior: "smooth",
            });
          else if (counter.length >= 20 && counter.length < 40)
            container.current.scrollTo({
              left: container.current.scrollLeft + 100 - 50 / counter.length,
              behavior: "smooth",
            });
          else if (counter.length >= 40)
            container.current.scrollTo({
              left: container.current.scrollLeft + 50 - 25 / counter.length,
              behavior: "smooth",
            });
        } else {
          if (counter.length < 10)
            container.current.scrollTo({
              left: container.current.scrollLeft - 200 + 100 / counter.length,
              behavior: "smooth",
            });
          else {
            flag = false;
            counter = [];
          }
        }
        setTimeout(() => {
          flag = false;
        }, 100);
        setTimeout(() => {
          counter = [];
        }, 2000);
      };

      if (typeof document.body != "undefined") {
        document.body.addEventListener("wheel", handleWheel, false);

        return () => {
          document.body.removeEventListener("wheel", handleWheel, false);
        };
      }
    }
  }, []);

  return (
    <div className={styles.box} ref={container}>
      <Wrapper>
        <Explain>
          <ExplainTitle> All Of Art에서</ExplainTitle>
          <ExplainTitle> 그림에 대한</ExplainTitle>
          <ExplainTitle>흥미를 느껴보고</ExplainTitle>
          <ExplainTitle>아티스트가 </ExplainTitle>
          <ExplainTitle>되어보세요!</ExplainTitle>
          <AnimationWrapper>
            <Animation
              src="https://assets3.lottiefiles.com/packages/lf20_ibe9c8we.json"
              background="transparent"
              speed="2"
              loop
              controls
              autoplay
            />
            <Description2>스크롤을 내리며 카드를 클릭해보세요👆🂠</Description2>
          </AnimationWrapper>
          <Description3>카드를 클릭해보세요👆🂠</Description3>
          <NextButton
            onClick={() => {
              container.current.scrollTo({
                left: container.current.scrollWidth / 4.48,
                behavior: "smooth",
              });
            }}
          >
            Next
          </NextButton>
        </Explain>

        <Card
          frontImg={mainPageImg[0]}
          backImg={mainPageImg[1]}
          explain="이미지에 화풍을 적용해 보세요"
          container={container}
          next={2.72}
          previous={0}
        />
        <Card
          frontImg={mainPageImg[2]}
          backImg={mainPageImg[3]}
          explain="화풍을 적용한 나의 그림을 AllofArt의 갤러리에 올려보세요!"
          container={container}
          next={1.95}
          previous={4.48}
        />
        <Card
          frontImg={mainPageImg[4]}
          backImg={mainPageImg[5]}
          explain="자신의 그림이 어떤 화가의 화풍과 닮았는지 확인해보세요!"
          container={container}
          next={1.52}
          previous={2.72}
        />
        <Card
          frontImg={mainPageImg[6]}
          backImg={mainPageImg[7]}
          explain="ALLofART의 화가들에 대해 알아보세요!"
          container={container}
          next={1}
          previous={1.95}
        />
        <Options previous={1.52} container={container} />
      </Wrapper>

      <style jsx global>
        {`
          html,
          body {
            background: ${background} !important;
            padding: 0 !important;
            transition: all 0.7s ease-in-out;
            overflow: hidden;
            height: 100%;
          }
        `}
      </style>
    </div>
  );
}

const Wrapper = styled.div`
  width: (6 * 45) vh;
  height: 100vh;
  display: flex;
  padding-top: 15vh;
`;

const ExplainTitle = styled.div`
  font-size: 5vh;
  transform: rotate3d(1, -1, 1, 10deg);
  &:nth-child(1) {
  }
  &:nth-child(2) {
    font-size: 6vh;
  }
  &:nth-child(3) {
  }
  &:nth-child(4) {
    margin-top: 2vh;
  }
  &:nth-child(5) {
    font-size: 6vh;
  }
`;
const Animation = styled(Player)`
  width: 5vh;
  @media only screen and (max-width: 45rem) {
    width: 3vh;
  }
`;
const Explain = styled.div`
  width: 75vh;
  padding-left: 5vh;
  padding-right: 15vh;
  max-height: 60vh;
  letter-spacing: 0.8vh;
  text-align: left;
  line-height: 7vh;
  font-weight: bolder;
  text-shadow: 6px 4px 0px orange, 8px 8px 0px green;
`;

const AnimationWrapper = styled.div`
  margin-top: 5vh;
  @media only screen and (max-width: 45rem) {
    display: none;
  }
`;

const Description2 = styled.div`
  font-size: 1.5vh;
  text-shadow: none;
  text-align: center;
  transform: none;
`;
const Description3 = styled(Description2)`
  font-size: 1.5vh;
  text-shadow: none;
  text-align: center;
  transform: none;
  display: none;
  @media only screen and (max-width: 45rem) {
    display: block;
  }
`;

const NextButton = styled(Button)`
  background: black;
  border-radius: 50px;
  border: 3px solid black;
  width: 10vh;
  height: 5vh;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: none;

  :hover {
    background: rgba(0, 0, 0, 0.8);
    border: 3px solid transparent;
    transform: scale(1.1);
  }

  span {
    font-size: 1.5vh;
    font-weight: 800;
  }
  @media only screen and (max-width: 45rem) {
    display: block;
    margin-top: 10vh;
  }
`;
