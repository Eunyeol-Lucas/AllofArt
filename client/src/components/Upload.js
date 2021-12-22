import React, { useRef, useCallback } from "react";
import Dropzone from "react-dropzone";
import { Backup } from "@material-ui/icons";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";

export default function Upload({
  file,
  setFile,
  previewSrc,
  setPreviewSrc,
  isPreviewAvailable,
  setIsPreviewAvailable,
  setErrorMsg,
  setOpen,
}) {
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const onDrop = useCallback((files) => {
    if (!files[0]) {
      setErrorMsg("Image type should be one of JPEG, JPG and PNG.");
      setOpen(true);
    } else {
      const [uploadedFile] = files;
      setFile(uploadedFile);
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewSrc(fileReader.result);
      };
      fileReader.readAsDataURL(uploadedFile);
      setIsPreviewAvailable(
        uploadedFile.name.match(/\.(jpeg|JPEG|jpg|JPG|png|PNG)$/),
      );
      dropRef.current.style.border = "2px dashed #e9ebeb";
      dropRef.current.style.borderRadius = "20px";
    }
  }, []);

  const updateBorder = useCallback((dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
      dropRef.current.style.borderRadius = "20px";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
      dropRef.current.style.borderRadius = "20px";
    }
  }, []);
  return (
    <Container>
      <ImageContainer>
        <Dropzone
          onDrop={onDrop}
          onDragEnter={() => updateBorder("over")}
          onDragLeave={() => updateBorder("leave")}
          accept=".jpg, .jpeg, .png"
        >
          {({ getRootProps, getInputProps }) => (
            <UploadContainer
              {...getRootProps({ className: "drop-zone" })}
              ref={dropRef}
              Upload
            >
              <input {...getInputProps()} />

              <Text active={file}>
                <Backup />
                <p>
                  <strong>Drop or Select your file here</strong>
                </p>
                <p>
                  <strong>to upload</strong>
                </p>
              </Text>
            </UploadContainer>
          )}
        </Dropzone>
      </ImageContainer>
      {previewSrc && isPreviewAvailable && (
        <UploadContainer className="image-preview" Image>
          <Img className="preview-image" src={previewSrc} alt="Preview" />
        </UploadContainer>
      )}
    </Container>
  );
}

Upload.propTypes = {
  file: PropTypes.oneOfType([PropTypes.object, PropTypes.any]).isRequired,
  setFile: PropTypes.func.isRequired,
  previewSrc: PropTypes.string.isRequired,
  setPreviewSrc: PropTypes.func.isRequired,
  isPreviewAvailable: PropTypes.oneOfType([PropTypes.array, PropTypes.bool])
    .isRequired,
  setIsPreviewAvailable: PropTypes.func.isRequired,
  setErrorMsg: PropTypes.func.isRequired,
  setOpen: PropTypes.func.isRequired,
};

const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 20px;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  opacity: 1;
  position: relative;
`;

const UploadContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.Upload &&
    css`
      z-index: 2;
      transition: all 1s;
      :hover {
        cursor: pointer;
        background: #d3d3d3;
        border-radius: 20px;
        opacity: 0.7;
      }
    `}

  ${(props) =>
    props.Image &&
    css`
      position: absolute;
      z-index: 1;
    `}
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: visible;
  font-size: 1rem;
  ${(props) =>
    props.active &&
    css`
      color: transparent;
      transition: all 1s;
      :hover {
        visibility: visible;
        color: #000;
      }
    `}
  @media only screen and (max-width: 45rem) {
    font-size: 0.5rem;
  }
`;

const Img = styled.img`
  max-width: 100%;
  max-height: 100%;
`;
