import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import Layout from "../layout/Layout";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "next/router";
import nProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "../redux/store";

Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const LayoutUsed = Component.name === "AdminPage" ? React.Fragment : Layout;

  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <LayoutUsed>
          <div className="pt-[88px]">
            <ToastContainer />
            <Component {...pageProps} />
          </div>
        </LayoutUsed>
      </Provider>
    </SessionProvider>
  );
}