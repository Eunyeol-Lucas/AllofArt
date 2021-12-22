# All of art

남녀노소 모두에게 **미술에 대한 흥미**를 불러 일으키고, **학습 동기 유발**을 위한 서비스

## Repository

- [Sever_Repository](https://github.com/ALLofArt/server)
- [Client_Repository](https://github.com/ALLofArt/client)

## 1. 프로젝트 소개

### 프로젝트 개요

프로게이머 페이커 선수, 가수 BTS, 드라마 오징어 게임까지.<br>
게임, 대중음악, 영상 컨텐츠 부분에서 우리나라는 지속적인 성장을 이루며 K-Culture를 전세계에 알려왔습니다.<br>
어떻게 이렇게 작은 나라에서 게임을 잘 하는 사람, 노래를 잘 부르는 사람이 꾸준히 나올까요?<br>
아마 세 가지 모두 우리나라에서 아주 활발한 문화이기 때문일 것 입니다.<br>
저희 All of art는 한국의 미술도 이와 같이 발전할 수 있도록 미술 문화를 활성화시켜 성장에 일조하는 서비스가 되기를 희망합니다.<br>

### 기술 스택 및 라이브러리

#### 프론트엔드

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=material-ui&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

#### 백엔드

![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Azure](https://img.shields.io/badge/azure-%230072C6.svg?style=for-the-badge&logo=azure-devops&logoColor=white)

#### AI

![TensorFlow](https://img.shields.io/badge/TensorFlow-%23FF6F00.svg?style=for-the-badge&logo=TensorFlow&logoColor=white)
![Keras](https://img.shields.io/badge/Keras-%23D00000.svg?style=for-the-badge&logo=Keras&logoColor=white)

## 2. 프로젝트 기능 설명

1. 화풍 분석 : 사용자의 그림이 어떤 유명 화가의 작품과 유사한지 알려주고, 해당 화가의 정보를 제공합니다.
2. 화풍 전이 : 한 이미지의 스타일 요소를 분석 & 적용하여 새로운 이미지를 만들어 냅니다.
3. 갤러리 : 화풍 전이에서 게시한 이미지들을 다운로드 또는 최근 게시글 순서로 열람할 수 있습니다.
4. 화가 정보 : 50명의 유명 화가와 상세 정보를 열람할 수 있습니다.

## 3. 프로젝트 구성도

### Architecture

![image](https://user-images.githubusercontent.com/76929823/146011731-0ce333ca-a203-4e3c-81bc-948988e88ba6.png)

### ERD

![image](https://user-images.githubusercontent.com/76929823/146351874-3799ad06-6d6a-4eeb-b0a8-88b0d6842167.png)

### API

[API 명세](http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com:5000/docs#/)

### 와이어 프레임

[와이어프레임 - Figma 이동](https://www.figma.com/file/VJbmREbSnjNw92ftBBNQQ7/All-of-Art-%EC%99%80%EC%9D%B4%EC%96%B4%ED%94%84%EB%A0%88%EC%9E%84?node-id=0%3A1)

## 4. 프로젝트 팀원 역할 분담

| 이름     | 역할                 | 담당 부분                                                                                                                |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 임희지   | 팀장 / 프론트엔드/AI | 웹 디자인 / 화풍 전환 페이지 구현 / 화풍 전환 딥러닝 모델 조사 및 테스트                                                 |
| 김기원   | 백엔드               | API, DB 설계 / DB 구축 / ORM Model 구현                                                                                  |
| 남궁은선 | 프론트엔드           | 웹 디자인 / 네비게이션 바, 푸터 구현 / 메인 페이지, 페인팅 뷰 페이지 어바웃 페이지 구현/ 레이아웃, 전반적인 스타일 설정  |
| 남은열   | 프론트엔드           | 와이어프레임 작성 / 웹 디자인 / 프론트 개발 환경 구축 / 화풍 분석 페이지 구현 / 화가 정보 페이지 구현 / 404 페이지 구현  |
| 서명현   | 기획 / PM            | 웹 디자인 / 기획 총괄 / 와이어프레임 작성 및 관리 / 이슈, 리스크, 타임라인 관리 / QA                                     |
| 송성곤   | 백엔드 / AI          | API, DB 설계 / 화풍 분석, 화풍 전환 API 구현 / 화풍 분석 모델 조사 및 테스트 / Docker를 이용한 GPU 환경 구축 / 서버 배포 |

## 5. FAQ (갱신 예정)
