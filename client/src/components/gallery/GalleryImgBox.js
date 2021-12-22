import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import apiUrl from "../../../lib/api";
import { Button } from "@material-ui/core";

export default function GalleryImgBox({
  result_img_url,
  result_img_id,
  content_img_url,
  style_img_url,
  download,
  saveFile,
}) {
  const [hover, setHover] = useState(false);

  return (
    <ImageCard
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
    >
      <BoxWrapper>
        <Result src={`${apiUrl}${result_img_url}`} hover={hover} />
        <StyleResultWrapper hover={hover}>
          <Content src={`${apiUrl}${content_img_url}`} />
          <Style src={`${apiUrl}${style_img_url}`} />
        </StyleResultWrapper>
        <ButtonWrapper>
          <DownloadButton hover={hover} onClick={() => saveFile(result_img_id)}>
            <span>다운로드</span>
          </DownloadButton>
          <a href={`${apiUrl}${result_img_url}`} target="_blank">
            <BigImgLink hover={hover}>
              <span>결과 이미지 크게 보기</span>
            </BigImgLink>
          </a>
        </ButtonWrapper>
      </BoxWrapper>
      <DownloadWrapper>
        <DownloadImg src="/gallery/download.png" />
        <Download>{download}</Download>
      </DownloadWrapper>
    </ImageCard>
  );
}

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1vw;
  border: solid 3vh blue;
  border-image: url("/gallery/frame.jpg") 100;
  border-image-outset: 15px;
  background-color: white;
  height: 44vh;
  width: 30vh;
`;

const Content = styled.img`
  height: 12.5vh;
  width: 12.5vh;
  border-radius: 2vh;
  border: 1px solid white;
`;

const StyleResultWrapper = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top: 1vw;
  opacity: ${(props) => (props.hover ? "0.5" : "1")};
  @media only screen and (max-width: 45rem) {
    opacity: 1;
  }
`;

const Style = styled.img`
  height: 12.5vh;
  width: 12.5vh;
  border-radius: 2vh;
  border: 1px solid white;
`;

const Result = styled.img`
  position: relative;
  height: 25vh;
  width: 25vh;
  opacity: ${(props) => (props.hover ? "0.7" : "1")};
  border-radius: 2vh;
  @media only screen and (max-width: 45rem) {
    opacity: 1;
  }
`;

const Download = styled.div`
  display: inline-block;
  font-size: 2vh;
`;
const ImageCard = styled.div`
  width: 30vh;
`;
const DownloadWrapper = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 30px;
  @media only screen and (max-width: 45rem) {
    margin-top: 10vh;
  }
`;

const DownloadImg = styled.img`
  margin-top: 0.5vh;
  height: 2vh;
`;

const DownloadButton = styled(Button)`
  margin: 1vh 0;
  position: relative;
  background: black;
  border-radius: 2.5vh;
  width: 17vh;
  height: 5vh;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: ${(props) => (props.hover ? "block" : "none")};

  :hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }
  span {
    font-size: 1.5vh;
    line-height: 1.5vh;
    font-weight: 800;
  }
  @media only screen and (max-width: 45rem) {
    display: block;
    :hover {
      transform: scale(1);
      background: rgba(0, 0, 0, 1);
    }
  }
`;

const BigImgLink = styled(DownloadButton)``;

const ButtonWrapper = styled.div`
  margin-top: 10vh;
  position: absolute;
  a {
    text-decoration-line: none;
  }
  @media only screen and (max-width: 45rem) {
    margin-top: 44vh;
    display: block;
  }
`;
