import styles from "./Card.module.css";
import styled from "styled-components";
import { useState } from "react";
import { Button } from "@material-ui/core";

export default function Card({
  frontImg,
  backImg,
  explain,
  container,
  next,
  previous,
}) {
  const [isRotated, setIsRotated] = useState(false);
  const [clicked, setClicked] = useState(false);
  const onRotate = () => setIsRotated((rotated) => !rotated);

  // Converts integer to hex

  return (
    <Wrapper>
      <div className={styles.wrapper}>
        <div
          className={`${styles.card} ${isRotated && styles.rotated}`}
          onClick={onRotate}
        >
          <CardImg
            className={styles.front}
            Img={frontImg}
            onClick={() => setClicked(!clicked)}
          ></CardImg>

          {isRotated && <CardExplain>{explain}</CardExplain>}

          <CardImg className={styles.back} Img={backImg} />
        </div>
      </div>
      <ButtonWrapper>
        <PreviousButton
          onClick={() => {
            container.current.scrollTo({
              left: previous ? container.current.scrollWidth / previous : 0,
              behavior: "smooth",
            });
          }}
        >
          Previous
        </PreviousButton>
        <NextButton
          onClick={() => {
            container.current.scrollTo({
              left: container.current.scrollWidth / next,
              behavior: "smooth",
            });
          }}
        >
          NEXT
        </NextButton>
      </ButtonWrapper>
    </Wrapper>
  );
}

const CardImg = styled.div`
  background-image: url(${(props) => props.Img});
  background-color: white;
  background-size: 100% 100%;
  image-rendering: auto;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;
`;

const CardExplain = styled.strong`
  width: 40vh;
  font-size: 2vh;
  font-weight: bold;
  text-align: center;
  position: absolute;
  margin-top: 45vh;

  background-color: black;
  padding: 10px;
  border-radius: 10px;
  z-index: 2;
  color: white;
  opacity: 0.8;
  transition: background-color 5s linear;
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
  z-index: 2;
  margin-top: 60vh;
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
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviousButton = styled(NextButton)``;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 1vh;
`;
