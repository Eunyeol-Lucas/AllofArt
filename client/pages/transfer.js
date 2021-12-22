import { useState, useCallback, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import {
  Typography,
  Modal,
  Box,
  CircularProgress,
  Button,
  Snackbar,
} from "@material-ui/core";
import { ArrowForwardIos, Close } from "@material-ui/icons";
import { Player } from "@lottiefiles/react-lottie-player";
import { inputErrorMsgs } from "../src/constants/Msgs";
import { apiUrl } from "../lib/api";
import Upload from "../src/components/Upload";
import TabPanel from "../src/components/TabPanel";
import TabMenu from "../src/components/TabMenu";
import TransferResult from "../src/components/TransferResult";
import * as Style from "../styles/CommonStyle";

const BASE_URL = "http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com";

export default function Transfer() {
  const randomDefaultImg = "/images/random_default.jpg";
  // for content img
  const [contentImg, setContentImg] = useState(undefined);
  const [contentPreview, setContentPreview] = useState("");
  const [isContentPreview, setIsContentPreview] = useState(false);
  // for style img
  const [styleImg, setStyleImg] = useState(undefined);
  const [stylePreview, setStylePreview] = useState("");
  const [isStylePreview, setIsStylePreview] = useState(false);
  // for random imgs
  const [randomContent, setRandomContent] = useState(randomDefaultImg);
  const [randomStyle, setRandomStyle] = useState(randomDefaultImg);
  // for api
  const [isRandomContent, setIsRandomContent] = useState(false);
  const [isRandomStyle, setIsRandomStyle] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(undefined);
  const [paintingId, setPaintingId] = useState(undefined);
  // for tab
  const [contentTab, setContentTab] = useState(0);
  const [styleTab, setStyleTab] = useState(0);
  // 결과 알림창
  const [openAlert, setOpenAlert] = useState(false);
  // 모달
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setIsRandomStyle(styleTab === 1);
    setIsRandomContent(contentTab === 1);
  }, [contentTab, styleTab]);

  const onClickContentTab = (e, newValue) => {
    setContentTab(newValue);
  };

  const onClickStyleTab = (e, newValue) => {
    setStyleTab(newValue);
  };

  const handleCloseModal = () => setOpen(false);

  const handleCloseAlert = () => setOpenAlert(false);

  const onChangeContent = async () => {
    try {
      await axios.get("/api/transfer/content").then((res) => {
        const img_url = `${BASE_URL}${res.data}`;
        setRandomContent(img_url);
      });
    } catch {
      setErrorMsg("뭔가 잘못됐습니다.");
      setOpen(true);
    }
  };

  const onChangeStyle = async () => {
    try {
      await axios.get("/api/transfer/style").then((res) => {
        const img_url = `${BASE_URL}${res.data}`;
        setRandomStyle(img_url);
      });
    } catch {
      setErrorMsg("뭔가 잘못됐습니다.");
      setOpen(true);
    }
  };

  const isValidUserInput = () => {
    if (contentTab === 1 && randomContent === randomDefaultImg) {
      setErrorMsg(inputErrorMsgs.CHOOSE_CONTENT);
      setOpen(true);
      return false;
    }

    if (contentTab === 0 && contentImg === undefined) {
      setErrorMsg(inputErrorMsgs.UPLOAD_CONTENT);
      setOpen(true);
      return false;
    }

    if (styleTab === 1 && randomStyle === randomDefaultImg) {
      setErrorMsg(inputErrorMsgs.CHOOSE_STYLE);
      setOpen(true);
      return false;
    }

    if (styleTab === 0 && styleImg === undefined) {
      setErrorMsg(inputErrorMsgs.UPLOAD_STYLE);
      setOpen(true);
      return false;
    }

    return true;
  };

  const onSubmitStylize = useCallback(async (e) => {
    e.preventDefault();

    if (!isValidUserInput()) {
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content_file", contentImg || new File([], "default"));
      formData.append("style_file", styleImg || new File([], "default"));
      formData.append("random_content_name", randomContent);
      formData.append("random_style_name", randomStyle);
      formData.append("is_random_content", isRandomContent);
      formData.append("is_random_style", isRandomStyle);

      setErrorMsg("");
      setIsLoading(true);
      setIsResultReady(false);

      const response = await axios.post("/api/transfer", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setIsLoading(false);
      setIsResultReady(true);
      setPaintingId(response.data.painting_id);
      setResult(`${BASE_URL}${response.data.transfer_image_path}`);
    } catch {
      setErrorMsg("뭔가 잘못됐습니다.");
      setOpen(true);
    }
  });

  const onClickEnroll = useCallback(async () => {
    try {
      await axios.put(`/api/transfer/create?painting_id=${Number(paintingId)}`);
      setOpenAlert(true);
    } catch {
      setErrorMsg("뭔가 잘못됐습니다.");
      setOpen(true);
    }
  });

  const alertAction = <Button endIcon={<Close />} onClick={handleCloseAlert} />;

  return (
    <ResultSection>
      <Style.SectionContainer>
        <Style.GridRow>
          <Style.Title>Style Transfer</Style.Title>
        </Style.GridRow>
        <Style.IntroWrapper>
          <Style.Markdown>
            <Style.HeaderIntro>
              스타일 이미지의 특성을 분석하고 이를 사용자 사진에 적용하여 새로운
              예술 작품을 만듭니다.
            </Style.HeaderIntro>
          </Style.Markdown>
        </Style.IntroWrapper>
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.Hr />
      </Style.SectionContainer>
      <UploadWrapper>
        {errorMsg && (
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, border: "none" }}
              >
                <strong> {errorMsg} </strong>
              </Typography>
            </Box>
          </Modal>
        )}
        <div>
          <UploadTitle>Photo</UploadTitle>
          <Box>
            <Box>
              <TabMenu value={contentTab} onChange={onClickContentTab} />
            </Box>
            <TabPanel value={contentTab} index={0}>
              <UploadContainer>
                <Upload
                  file={contentImg}
                  setFile={setContentImg}
                  previewSrc={contentPreview}
                  setPreviewSrc={setContentPreview}
                  isPreviewAvailable={isContentPreview}
                  setIsPreviewAvailable={setIsContentPreview}
                  errorMsg={errorMsg}
                  setErrorMsg={setErrorMsg}
                  setOpen={setOpen}
                />
              </UploadContainer>
            </TabPanel>
            <TabPanel value={contentTab} index={1}>
              <RandomContainer>
                <img src={randomContent} />
                <button onClick={onChangeContent}>
                  <RandomIcon
                    autoplay
                    loop
                    src="https://assets4.lottiefiles.com/packages/lf20_3Pg4c8.json"
                  />
                </button>
              </RandomContainer>
            </TabPanel>
          </Box>
        </div>
        <div>
          <UploadTitle>Style</UploadTitle>
          <Box>
            <Box>
              <TabMenu value={styleTab} onChange={onClickStyleTab} />
            </Box>
            <TabPanel value={styleTab} index={0}>
              <UploadContainer>
                <Upload
                  file={styleImg}
                  setFile={setStyleImg}
                  previewSrc={stylePreview}
                  setPreviewSrc={setStylePreview}
                  isPreviewAvailable={isStylePreview}
                  setIsPreviewAvailable={setIsStylePreview}
                  errorMsg={errorMsg}
                  setErrorMsg={setErrorMsg}
                  setOpen={setOpen}
                />
              </UploadContainer>
            </TabPanel>
            <TabPanel value={styleTab} index={1}>
              <RandomContainer>
                <img src={randomStyle} />
                <button onClick={onChangeStyle}>
                  <RandomIcon
                    autoplay
                    loop
                    src="https://assets4.lottiefiles.com/packages/lf20_3Pg4c8.json"
                  />
                </button>
              </RandomContainer>
            </TabPanel>
          </Box>
        </div>
      </UploadWrapper>
      <BtnContainer>
        {isLoading ? (
          <LoadingContainer>
            <CircularProgress />
          </LoadingContainer>
        ) : (
          <ResultBtn endIcon={<ArrowForwardIos />} onClick={onSubmitStylize}>
            STYLIZE
          </ResultBtn>
        )}
      </BtnContainer>

      {!isLoading && isResultReady && (
        <>
          <Divider />
          <TransferResult
            before={isRandomContent ? randomContent : contentPreview}
            after={result}
            onClick={onClickEnroll}
          />
          <Snackbar
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleCloseModal}
            message="등록이 완료되었습니다."
            action={alertAction}
          />
        </>
      )}
    </ResultSection>
  );
}

const ResultSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 7rem 0 0 0;
  transition: background-color 0.6s linear;
`;

const SlideFade = keyframes`
  0% { opacity: 0; transform: translateY(2.5rem) } to { opacity: 1; transform: translateY(0) }
`;

const TitleContainer = styled.header`
  padding: 0 7vw;
  padding-bottom: 2rem;

  animation: ${SlideFade} 0.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;

  h1 {
    font-size: 5rem;
    font-weight: 800;
    @media only screen and (max-width: 45rem) {
      font-size: 2.8rem;
    }
  }

  h3 {
    font-size: 1.2rem;
    @media only screen and (max-width: 45rem) {
      font-size: 0.7rem;
    }
  }
`;

const Divider = styled.hr`
  border: 0;
  border-top: 3px solid black;
  width: 86%;

  animation: ${SlideFade} 1s cubic-bezier(0.23, 1, 0.32, 1) forwards;
`;

const UploadWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  animation: ${SlideFade} 1.5s cubic-bezier(0.23, 1, 0.32, 1) forwards;

  & > div:first-child {
    margin-right: 10em;
  }

  @media only screen and (max-width: 45rem) {
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > div:first-child {
      margin-right: 0;
      margin-bottom: 2rem;
    }
  }
`;

const UploadContainer = styled.div`
  margin-top: 2vh;
  width: 25vw;
  height: 25vw;

  @media only screen and (max-width: 45rem) {
    width: 70vw;
    height: 35vh;
  }
`;

const UploadTitle = styled.h3`
  font-size: 2rem;
  text-align: center;
  font-weight: medium;
`;

const RandomContainer = styled.div`
  width: 25vw;
  height: 25vw;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2vh;
  border-radius: 20px;

  background: white;
  opacity: 1;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  button {
    position: relative;
    transform: translate(30%, 120%);
    border: 0;
    outline: 0;
    background-color: transparent;
    cursor: pointer;
  }

  & > div:first-child {
    margin-right: 0;
  }

  @media only screen and (max-width: 45rem) {
    width: 70vw;
    height: 35vh;
    margin-bottom: 0;

    button {
      position: relative;
      transform: translate(35%, 80%);
    }
  }
`;

const RandomIcon = styled(Player)`
  width: 25%;
  height: 25%;
`;

const BtnContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 5vh 0;

  animation: ${SlideFade} 2s cubic-bezier(0.23, 1, 0.32, 1) forwards;
`;

const ResultBtn = styled(Button)`
  background: black;
  border-radius: 50px;
  border: 3px solid black;
  width: 8rem;
  height: 2.8rem;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  :hover {
    background: rgba(0, 0, 0, 0.8);
    border: 3px solid transparent;
    transform: scale(1.1);
  }

  span {
    font-size: 1rem;
    line-height: 1.4rem;
    font-weight: 800;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-bottom: 1.6vh;
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: 20,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  outline: "none",
};
