import styled from "styled-components";
import { useEffect } from "react";
import GalleryImgListComponent from "../src/components/gallery/GalleryImgListComponent";
import axios from "axios";
import { useImgState, useImgDispatch } from "../store/reducer";
import * as Style from "../styles/CommonStyle";
import { Player } from "@lottiefiles/react-lottie-player";
import GalleryFilter from "../src/components/gallery/GalleryFilter";

export default function Gallery() {
  const dispatch = useImgDispatch();
  const state = useImgState();
  useEffect(() => {
    state.page === 1 && dispatch({ type: "HAS_MORE", payload: true });
    sendQuery();
  }, [state.page, state.duration, state.sortBy]);

  const sendQuery = async () => {
    const URL = `/api/gallery?duration=${state.duration}&sort_by=${state.sortBy}&page=${state.page}`;

    try {
      dispatch({ type: "IS_LOADING", payload: true });
      if (!state.hasMore) return;
      await axios
        .get(URL, {
          timeout: 5000,
        })
        .then((response) => {
          if (response.data === "no content") {
            dispatch({ type: "HAS_MORE", payload: false });
          } else {
            dispatch({
              type: "HAS_MORE",
              payload: response.data.length > 0,
            });
            dispatch({ type: "IS_LOADING", payload: false });
            dispatch({
              type: "SET_IMAGES",
              payload: response.data,
            });
          }
        });
    } catch (e) {
      sendQuery();
    }
  };
  return (
    <Style.Container>
      <Style.SectionContainer>
        <Style.GridRow>
          <Style.Title>Gallery</Style.Title>
        </Style.GridRow>
        <Style.IntroWrapper rows>
          <Style.Markdown>
            <Style.HeaderIntro>
              Let's See Others' Artworks and Download What you want!
            </Style.HeaderIntro>
          </Style.Markdown>
          <Audio>
            <audio controls src="/music/bgm.mp3" style={{ width: 270 }}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </Audio>
        </Style.IntroWrapper>
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.Hr />
      </Style.SectionContainer>

      <GalleryFilter />

      <GalleryImgListComponent />
      {state.hasMore && state.isLoading && (
        <Animation
          src="https://assets2.lottiefiles.com/packages/lf20_oeeo5l2t.json"
          background="transparent"
          speed="1"
          loop
          controls
          autoplay
        />
      )}

      <style jsx global>
        {`
          body::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </Style.Container>
  );
}
const Audio = styled.div`
  grid-column: 9 / span 2;
  justify-items: end;
  @media only screen and (max-width: 45rem) {
    grid-column: 1 / span 7;
    grid-row: 2;
    margin-top: 0.5rem;
  }
`;

const Animation = styled(Player)`
  width: 30vh;
  height: 30vh;
`;
