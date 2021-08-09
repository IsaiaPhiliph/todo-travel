import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IKContext } from "../context/context";
import { useReducer } from "react";
import { IKReducer } from "../context/reducer";
import { initialIKState } from "../context/state";
import useGetAuthState from "../hooks/useGetAuthState";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(IKReducer, initialIKState);
  useGetAuthState({ dispatch });
  return (
    <IKContext.Provider value={{ state, dispatch }}>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </IKContext.Provider>
  );
}
export default MyApp;
