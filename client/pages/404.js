import { useRouter } from "next/router";
import styled from "styled-components";
import { Button } from "@material-ui/core";

export default function Error404() {
  const router = useRouter();
  const goLink = () => {
    router.push("/");
  };

  return (
    <Container>
      <img src="/images/404error.png" alt="404error" width="300px" />
      <h1>페이지를 찾을 수 없습니다.</h1>
      <p>입력하신 주소를 다시 한번 확인해주세요.</p>
      <MainButton variant="contained" onClick={goLink}>
        <strong>메인 페이지로 가기</strong>
      </MainButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-top: 20vh;
`;

const MainButton = styled(Button)`
  margin: 3%;
  background: #fa9c30;
  border-radius: 50px;
  color: #fff;
  &:hover {
    background: #e36b20;
  }
`;
