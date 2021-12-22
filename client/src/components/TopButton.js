import { useEffect, useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { KeyboardArrowUp } from "@material-ui/icons";
import throttle from "../../lib/throttle";

const useScrollToggle = () => {
  const [scrollFlag, setScrollFlag] = useState(false);

  const updateScroll = () => {
    const { scrollY } = window;
    if (scrollY > 10) {
      setScrollFlag(true);
    } else {
      setScrollFlag(false);
    }
  };

  const handleScroll = throttle(updateScroll, 10);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollFlag;
};

const TopButton = () => {
  const scrollFlag = useScrollToggle(false);

  const moveToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    scrollFlag && (
      <ButtonContainer>
        <ButtonCover type="button" onClick={moveToTop}>
          <KeyboardArrowUp />
        </ButtonCover>
      </ButtonContainer>
    )
  );
};

export default TopButton;

const ButtonCover = styled(Button)`
  position: fixed;
  background: #000;
  padding: 0;
  border-radius: 50px;
  border: 3px solid black;
  min-width: 20px;
  width: 2.5rem;
  height: 2.5rem;
  color: white;
  text-align: center;
  font-size: 300px;
  cursor: pointer;
  :hover {
    background: rgba(0, 0, 0, 0.8);
  }
  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const ButtonContainer = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  :hover {
    ${ButtonCover} {
      visibility: visible;
      animation: bounce;
      animation-duration: 500ms;
      animation-iteration-count: infinite;
    }
    @keyframes bounce {
      0% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(5px);
      }
      100% {
        transform: translateY(0);
      }
    }
  }
`;
