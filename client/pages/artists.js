import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useRouterScroll } from "@moxy/next-router-scroll";
import apiUrl from "../lib/api";
import * as Style from "../styles/CommonStyle";

export default function Artists({ artistsList }) {
  const { updateScroll = () => {} } = useRouterScroll() || {};
  useEffect(() => {
    updateScroll();
  }, []);
  const observerOption = {
    root: null,
    rootMargin: "0px 0px 30px 0px",
    threshold: 0.2,
  };

  useEffect(() => {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.src = entry.target.dataset.src;
          observer.unobserve(entry.target);
        }
      });
    }, observerOption);
    const lazyImgs = document.querySelectorAll(".lazy-img");
    lazyImgs.forEach((el) => {
      io.observe(el);
    });
  });

  return (
    <Style.Container>
      <Style.SectionContainer>
        <Style.GridRow>
          <Style.Title>Painter Information</Style.Title>
        </Style.GridRow>
        <Style.IntroWrapper>
          <Style.Markdown>
            <Style.HeaderIntro>
              유명 화가의 출생-사망, 국적, 장르, 대표 작품 정보를 열람 할 수
              있습니다.
            </Style.HeaderIntro>
          </Style.Markdown>
        </Style.IntroWrapper>
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.Hr />
      </Style.SectionContainer>
      <Style.SectionContainer>
        <Style.MainGridRow>
          {artistsList.map((artistInfo) => (
            <Link
              href={`/artists/${artistInfo.id}`}
              key={`${artistInfo.name}-${artistInfo.id}`}
            >
              <Style.ImageContainer>
                <Style.ImageWrapper>
                  <Style.ImageCover>
                    <Style.Images
                      src="/images/gray.png"
                      data-src={`${apiUrl}${artistInfo.profile}`}
                      alt={artistInfo.name}
                      className="lazy-img"
                      width="100"
                      height="100"
                    />
                  </Style.ImageCover>
                  <Style.NameBox>
                    <Style.Name>{artistInfo.name}</Style.Name>
                  </Style.NameBox>
                </Style.ImageWrapper>
              </Style.ImageContainer>
            </Link>
          ))}
        </Style.MainGridRow>
      </Style.SectionContainer>
    </Style.Container>
  );
}

export async function getStaticProps() {
  const response = await axios.get("/api/artist");
  const { data } = response;

  return {
    props: {
      artistsList: data,
    },
  };
}

Artists.propTypes = {
  artistsList: PropTypes.arrayOf(PropTypes.object).isRequired,
};
