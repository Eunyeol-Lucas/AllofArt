import styled from "styled-components";
import { createMedia } from "@artsy/fresnel";
import { DesktopNavigation, MobileNavigation } from "../Navbars";

const { MediaContextProvider, Media } = createMedia({
  breakpoints: {
    sm: 0,
    md: 720,
    lg: 1024,
    xl: 1192,
  },
});

function Navigation() {
  const content = (
    <>
      <Media greaterThanOrEqual="md">
        <DesktopNavigation />
      </Media>
      <Media lessThan="md">
        <MobileNavigation />
      </Media>
    </>
  );

  return <MainNavigation>{content}</MainNavigation>;
}

export default function ResponsiveFresnelComponent() {
  return (
    <MediaContextProvider>
      <Navigation />
    </MediaContextProvider>
  );
}

const MainNavigation = styled.nav`
  z-index: 4;
  width: 100vw;
  position: absolute;
  a {
    color: #000;
    text-decoration: none;
  }
  @media only screen and (min-width: 45rem) {
    min-height: 6.875rem;
  }
`;
