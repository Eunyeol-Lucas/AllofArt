import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import TotalAnalysisData from "../../src/components/TotalAnalysisData";
import * as Style from "../../styles/CommonStyle";

export default function Analysis() {
  const [analysisInfo, setAnalysisInfo] = useState({
    artistName: "",
    artistId: 0,
    userPainting: "",
    styleResult: [],
    desc: "",
    artistImages: [],
  });

  const {
    artistName,
    artistId,
    artistImages,
    userPainting,
    styleResult,
    desc,
  } = analysisInfo;
  const router = useRouter();
  const params = router.query.id;

  const getAnalysisData = useCallback(async () => {
    try {
      const response = await axios.get(`api/style/${params}`);
      const sortable = [];
      const paintResult = response.data.style_result;
      Object.keys(paintResult).forEach((key) => {
        if (paintResult[key]) {
          sortable.push([key, paintResult[key]]);
        }
      });
      setAnalysisInfo((prevState) => ({
        ...prevState,
        userPainting: response.data.image_url,
        artistName: response.data.artist_name,
        artistImages: response.data.artist_images,
        artistId: response.data.artist_id,
        desc: response.data.artist_bio,
        styleResult: sortable,
      }));
    } catch (e) {
      console.log(e.response);
    }
  }, [params]);

  useEffect(() => {
    getAnalysisData();
  }, [params]);

  return (
    <Style.Container>
      {!styleResult[0] ? (
        <Style.SectionContainer>
          <LoadingWrapper>
            <Animation
              src="https://assets3.lottiefiles.com/private_files/lf30_exa5jczj.json"
              background="transparent"
              speed="1"
              loop
              controls
              autoplay
            />
          </LoadingWrapper>
        </Style.SectionContainer>
      ) : (
        <Style.SectionContainer>
          {styleResult[0] && (
            <TotalAnalysisData
              userPainting={userPainting}
              styleResult={styleResult}
              artistName={artistName}
              artistId={artistId}
              artistImages={artistImages}
              desc={desc}
            />
          )}
        </Style.SectionContainer>
      )}
    </Style.Container>
  );
}

const LoadingWrapper = styled.div`
  display: flex;
  padding-top: 40vh;
  justify-content: center;
`;

const Animation = styled(Player)`
  width: 200px;
  height: 200px;
`;
