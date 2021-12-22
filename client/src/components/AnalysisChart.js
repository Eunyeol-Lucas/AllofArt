import styled from "styled-components";
import PropTypes from "prop-types";

export default function AnalysisChart({ styleResult }) {
  return (
    <Container>
      {styleResult && (
        <>
          {styleResult.map((sort, idx) => (
            <Circular
              size={sort[1]}
              idx={idx}
              key={sort[0]}
              length={styleResult.length}
              colors={["#FFD005", "#B39102", "#FFD51F", "#383BB3", "#5C5FFF"]}
            >
              <p>{sort[0]}</p>
              <p>{sort[1]} %</p>
            </Circular>
          ))}
        </>
      )}
    </Container>
  );
}

AnalysisChart.propTypes = {
  styleResult: PropTypes.arrayOf(PropTypes.array).isRequired,
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Circular = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 50%;
  background: ${(props) => props.colors[props.idx]};
  animation: bounceInUp;
  animation-duration: ${(props) => 5 - props.idx}s;
  transition: all 0.5s;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: ${(props) => (props.size < 20 ? 4 : props.size / 7)}vw;
  height: ${(props) => (props.size < 20 ? 4 : props.size / 7)}vw;
  font-size: ${(props) => props.size / 5}px;
  font-weight: 800;
  color: #fff;
  :hover {
    cursor: pointer;
    transform: scale(${(props) => (props.size < 20 ? 1.3 : 1.1)});
    -webkit-transform: scale(${(props) => (props.size < 20 ? 1.3 : 1.1)});
    -moz-transform: scale(${(props) => (props.size < 20 ? 1.3 : 1.1)});
    -ms-transform: scale(${(props) => (props.size < 20 ? 1.3 : 1.1)});
    -o-transform: scale(${(props) => (props.size < 20 ? 1.3 : 1.1)});
  }
  @media only screen and (max-width: 45rem) {
    width: ${(props) => (props.size < 30 ? 10 : props.size / 3)}vw;
    height: ${(props) => (props.size < 30 ? 10 : props.size / 3)}vw;
    font-size: ${(props) => props.size / 7}px;
  }
`;
