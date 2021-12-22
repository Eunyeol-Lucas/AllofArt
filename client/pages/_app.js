import "../styles/globals.css";
import { useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";
import { RouterScrollProvider } from "@moxy/next-router-scroll";
import styled from "styled-components";
import theme from "../theme";
import Footer from "../src/components/layout/Footer";
import "animate.css";
import Navigation from "../src/components/layout/Navigation";
import { ImgProvider } from "../store/reducer";
import TopButton from "../src/components/TopButton";
axios.defaults.baseURL =
  "http://elice-kdt-2nd-team1.koreacentral.cloudapp.azure.com/";

export default function MyApp(props) {
  const { Component, pageProps } = props;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>ALLofART</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ImgProvider>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <RouterScrollProvider>
            <CssBaseline />
            <Navigation />
            <ButtonPosition>
              <TopButton />
            </ButtonPosition>
            <Component {...pageProps} />

            <Footer />
            <style jsx global>
              {`
                html,
                body {
                  background: #f7c73b !important;
                  padding: 0 !important;
                  margin: 0 !important;
                }
              `}
            </style>
          </RouterScrollProvider>
        </ThemeProvider>
      </ImgProvider>
    </>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

const ButtonPosition = styled.div`
  z-index: 5;
  position: absolute;
  bottom: 100px;
  right: 5vw;
  @media only screen and (max-width: 45rem) {
    right: 12vw;
  }
`;
