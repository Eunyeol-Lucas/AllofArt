import Link from "next/link";
import styled from "styled-components";
import getRandomColor from "../../../lib/getRandomColor";
import { Button } from "@material-ui/core";
import { useEffect } from "react";
export default function Options({ container, previous }) {

  return (
    <Explain>
      <ClickOptions>§MENU§</ClickOptions>
      <div>
        <Link href="/analysis">
          <ExplainTitle color={getRandomColor}>내 그림 화풍 분석</ExplainTitle>
        </Link>
        <Link href="/transfer">
          <ExplainTitle color={getRandomColor}>
            다른 그림의 화풍 적용
          </ExplainTitle>
        </Link>
        <Link href="/artists">
          <ExplainTitle color={getRandomColor}>
            All Of Art의 화가 소개
          </ExplainTitle>
        </Link>
        <Link href="/gallery">
          <ExplainTitle color={getRandomColor}>갤러리 구경하기</ExplainTitle>
        </Link>
      </div>
      <PreviousButton
        onClick={() => {
          container.current.scrollTo({
            left: container.current.scrollWidth / previous,
            behavior: "smooth",
          });
        }}
      >
        Previous
      </PreviousButton>
    </Explain>
  );
}

const Explain = styled.div`
  width: 50vh;
  margin-left: 20vh;
  max-height: 60vh;
  letter-spacing: 0.7vh;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 3vh;

  @media only screen and (min-width: 45rem) {
    margin-right: 20vh;
    overflow-x: hidden;
  }
`;

const ExplainTitle = styled.div`
  width: 100%;
  margin: 2vh auto;
  padding-top: 1.5vh;
  padding-bottom: 1.5vh;
  background-color: black;
  color: white;
  text-align: center;
  font-size: 3vh;
  border-radius: 2vh;
  :hover {
    cursor: pointer;
    color: ${(props) => props.color};
    transform: scale(1.1);
    transition: transform 0.3s linear;
    font-weight: bold;
  }
  @media only screen and (max-width: 45rem) {
    width: 70%;
  }
`;

const ClickOptions = styled.strong`
  display: block;
  font-size: 6vh;
  width: 100%;
  text-align: center;
  text-shadow: 4px 4px 0px orange, 8px 8px 0px green;
`;

const PreviousButton = styled(Button)`
  display: none;
  background: black;
  border-radius: 50px;
  border: 3px solid black;
  width: 10vh;
  height: 5vh;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  margin-left: 10vh;
  span {
    font-size: 1.5vh;
    font-weight: 800;
  }
  :hover {
    background: rgba(0, 0, 0, 0.8);
    border: 3px solid transparent;
    transform: scale(1.1);
  }

  @media (max-width: 45rem) {
    display: block;
  }
`;
