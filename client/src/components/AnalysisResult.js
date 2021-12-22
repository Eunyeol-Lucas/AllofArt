import { useState } from "react";
import CountUp from "react-countup";
import styled from "styled-components";
import PropTypes from "prop-types";

export default function AnalysisResult({ styleResult }) {
  const [result, setResult] = useState(false);
  if (styleResult) {
    setTimeout(() => {
      setResult(true);
    }, 3000);
  }
  return (
    <Container>
      {styleResult && (
        <>
          <div>
            <strong>
              <Percent>
                {styleResult[0][0]}&nbsp;
                <PercentResult
                  start={0.0}
                  end={styleResult[0][1]}
                  duration={2.5}
                  decimals={1}
                  decimal="."
                />
                &nbsp;%
              </Percent>
            </strong>
          </div>
          <CommentWrapper>
            {result && (
              <h3>
                당신의 그림은 화가 {styleResult[0][0]}의 화풍과 가장 유사합니다.
                아래 그래프를 통해 유사도 측정 결과를 확인해보세요.
              </h3>
            )}
          </CommentWrapper>
        </>
      )}
    </Container>
  );
}

AnalysisResult.propTypes = {
  styleResult: PropTypes.arrayOf(PropTypes.array).isRequired,
};

const Container = styled.article`
  display: flex;
  margin: 1rem;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const Percent = styled.p`
  font-size: 4rem;
  @media only screen and (max-width: 45rem) {
    font-size: 2rem;
  }
`;

const PercentResult = styled(CountUp)`
  font-size: 5rem;
  @media only screen and (max-width: 45rem) {
    font-size: 3rem;
  }
`;

const CommentWrapper = styled.div`
  min-height: 30px;
`;
