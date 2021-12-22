import styled from "styled-components";
import ReactCompareImage from "react-compare-image";

export default function TransferResult({ before, after, onClick }) {
  return (
    <div>
      <ResultTitle>Result</ResultTitle>
      <ResultContainer>
        <CompareContainer>
          <ReactCompareImage leftImage={before} rightImage={after} />
        </CompareContainer>
        <ResultDesc>
          <p>변환된 결과가 만족스러우신가요?</p>
          <p>갤러리에 등록해 자랑해보세요.</p>
          <p>클릭 한 번이면 자동으로 등록됩니다.</p>
          <button onClick={onClick}>
            <span>갤러리에 등록하기</span>
          </button>
        </ResultDesc>
      </ResultContainer>
    </div>
  );
}

const ResultTitle = styled.h1`
  padding: 0 7vw;
  margin-bottom: 4vh;
  font-weight: medium;
  font-size: 2.6rem;
  @media only screen and (max-width: 45rem) {
    font-size: 2rem;
  }
`;

const ResultContainer = styled.section`
  display: flex;
  justify-content: space-evenly;

  @media only screen and (max-width: 45rem) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const CompareContainer = styled.div`
  width: 25vw;
  height: auto;
  @media only screen and (max-width: 45rem) {
    width: 60vw;
  }
`;

const ResultDesc = styled.p`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  p {
    font-weight: semi-bold;
    font-size: 1.6rem;
    margin-bottom: 1vh;
  }

  button {
    margin-top: 2vh;
    background: black;
    border-radius: 50px;
    border: 3px solid black;
    width: 16rem;
    height: 2.8rem;
    color: white;
    text-align: center;
    cursor: pointer;

    span {
      font-weight: 500;
      font-size: 1.5rem;
    }
  }

  @media only screen and (max-width: 45rem) {
    width: 80vw;
    align-items: center;
    margin-top: 2vh;

    p {
      font-size: 1.1rem;
      line-height: 1rem;
      font-weight: 500;
    }

    button {
      width: 9.2rem;
      height: 2.4rem;

      span {
        font-size: 1rem;
      }
    }
  }
`;
