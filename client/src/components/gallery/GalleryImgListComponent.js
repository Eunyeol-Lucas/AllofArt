import React, { useState, useRef } from "react";
import styled from "styled-components";
import GalleryImgBox from "./GalleryImgBox";
import { useEffect, useCallback } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import apiUrl from "../../../lib/api";
import { useImgState, useImgDispatch } from "../../../store/reducer";

export default function GalleryImgListComponent() {
  const dispatch = useImgDispatch();
  const state = useImgState();
  const observerRef = useRef();
  const options = {
    root: null,
    rootMargin: "10px",
    threshold: 0,
  };

  const observer = (node) => {
    if (state.isLoading) return;
    if (observerRef.current) observerRef.current.disconnect();
    let timer = null;
    observerRef.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && state.hasMore) {
        dispatch({ type: "IS_LOADING", payload: true });
        if (!timer) {
          timer = setTimeout(function () {
            timer = null;
            dispatch({ type: "PAGE" });
          }, 1500);
        }
      }
    }, options);

    node && observerRef.current.observe(node);
  };

  const saveFile = async (result_img_id) => {
    const data = await axios.get(`/api/gallery/download/${result_img_id}`);
    if (confirm("Do you want to download the photo?") == true) {
      saveAs(`${apiUrl}:5000${data.data.image_url}`, `${result_img_id}.jpg`);
    }
  };

  return (
    <Wrapper>
      <Boxes>
        {state.images &&
          state.images.map(
            (
              {
                content_img_url,
                result_img_url,
                style_img_url,
                download,
                result_img_id,
              },
              index,
            ) => (
              <GalleryImgBox
                result_img_id={result_img_id}
                result_img_url={result_img_url}
                content_img_url={content_img_url}
                style_img_url={style_img_url}
                download={download}
                saveFile={saveFile}
                num={index + 1}
                key={result_img_id}
              />
            ),
          )}
      </Boxes>

      <div ref={observer} />
    </Wrapper>
  );
}

const Boxes = styled.div`
  background-color: transparent;
  margin: 0 10vh;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  row-gap: 7ch;
  column-gap: 7ch;
  justify-items: center;
  @media only screen and (max-width: 90rem) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media only screen and (max-width: 45rem) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const Wrapper = styled.div`
  position: relative;
`;
