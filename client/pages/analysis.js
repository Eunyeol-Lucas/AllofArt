import axios from "axios";
import { Button, Typography, Modal, Box } from "@material-ui/core";
import { Send, Replay } from "@material-ui/icons";
import { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import { Player } from "@lottiefiles/react-lottie-player";
import Upload from "../src/components/Upload";
import KakaoButton from "../src/components/KakaoButton";
import TotalAnalysisData from "../src/components/TotalAnalysisData";
import * as Style from "../styles/CommonStyle";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20rem",
  bgcolor: "background.paper",
  border: "none",
  borderRadius: 20,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  outline: "none",
};

export default function analysis() {
  const [file, setFile] = useState(""); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const [errorMsg, setErrorMsg] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisInfo, setAnalysisInfo] = useState({
    artistName: "",
    artistId: 0,
    userPainting: "",
    styleResult: [],
    paintingId: 0,
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
    paintingId,
  } = analysisInfo;

  useEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY);
    }
  }, []);
  const handleClose = useCallback(() => setOpen(false), []);

  const onSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          setErrorMsg([]);
          setIsLoading(true);
          const response = await axios.post(`api/style`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
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
            paintingId: response.data.painting_id,
          }));
          setIsLoading(false);
        } else {
          setErrorMsg(["당신이 그린", "그림 이미지를 첨부해주세요.🎨"]);
          setOpen(true);
        }
      } catch (e) {
        setErrorMsg([
          "서버와 연결할 수 없습니다.",
          "잠시후 다시 시도해주세요.",
        ]);
        setOpen(true);
      }
    },
    [file],
  );

  const onRetry = useCallback(() => {
    setFile("");
    setAnalysisInfo({
      artistName: "",
      artistId: 0,
      userPainting: "",
      styleResult: [],
      paintingId: 0,
      desc: "",
      artistImages: [],
    });
    setPreviewSrc("");
    setIsPreviewAvailable([]);
  }, []);

  return (
    <Style.Container>
      <div>
        {errorMsg[0] && (
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {errorMsg.map((msg) => (
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2, border: "none" }}
                  key={msg}
                >
                  <strong> {msg} </strong>
                  <br />
                </Typography>
              ))}
            </Box>
          </Modal>
        )}
      </div>
      <Style.SectionContainer>
        <Style.GridRow>
          <Style.Title Long>Look for the painter style</Style.Title>
        </Style.GridRow>
        <Style.IntroWrapper>
          <Style.Markdown>
            <Style.HeaderIntro>
              그림을 업로드하고, 어떤 유명 화가의 화풍과 유사한지 확인해보세요.
            </Style.HeaderIntro>
          </Style.Markdown>
        </Style.IntroWrapper>
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.Hr />
      </Style.SectionContainer>
      {isLoading ? (
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
      ) : !artistName ? (
        <Style.SectionContainer under>
          <UploadContainer>
            <UploadWrapper>
              <Upload
                file={file}
                setFile={setFile}
                previewSrc={previewSrc}
                setPreviewSrc={setPreviewSrc}
                isPreviewAvailable={isPreviewAvailable}
                setIsPreviewAvailable={setIsPreviewAvailable}
                errorMsg={errorMsg}
                setErrorMsg={setErrorMsg}
                setOpen={setOpen}
              />
            </UploadWrapper>
          </UploadContainer>
          {/* </Style.GridRow> */}
          <Style.BtnContainer>
            <SubmitBtn
              size="large"
              endIcon={<Send />}
              type="submit"
              onClick={onSubmit}
            >
              Analyze
            </SubmitBtn>
          </Style.BtnContainer>
        </Style.SectionContainer>
      ) : (
        <Style.SectionContainer>
          <TotalAnalysisData
            userPainting={userPainting}
            styleResult={styleResult}
            artistName={artistName}
            artistId={artistId}
            artistImages={artistImages}
            desc={desc}
          />
          <BtnsContainer>
            <Style.BtnContainer>
              <SubmitBtn endIcon={<Replay />} onClick={onRetry}>
                RETRY
              </SubmitBtn>
            </Style.BtnContainer>
            <KakaoButton params={paintingId} />
          </BtnsContainer>
        </Style.SectionContainer>
      )}
    </Style.Container>
  );
}

const SubmitBtn = styled(Button)`
  background: #000;
  border-radius: 50px;
  border: 3px solid black;
  width: 8rem;
  height: 2.8rem;
  color: white;
  text-align: center;
  cursor: pointer;
  :hover {
    background: rgba(0, 0, 0, 0.8);
  }
  span {
    font-size: 1rem;
    font-family: "Noto Sans", sans-serif;
    line-height: 1.4rem;
    font-weight: 800;
  }
`;

const UploadContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 30rem;
  height: 25rem;
  align-items: center;
  margin-bottom: 1rem;
  @media only screen and (max-width: 45rem) {
    width: 30vh;
    height: 30vh;
  }
`;

const LoadingWrapper = styled.div`
  display: flex;
  padding-top: 13vh;
  justify-content: center;
`;

const BtnsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

const Animation = styled(Player)`
  width: 200px;
  height: 200px;
`;
