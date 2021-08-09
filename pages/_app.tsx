import "../styles/globals.css";
import type { AppProps } from "next/app";
import { IKContext } from "../context/context";
import { useReducer } from "react";
import { IKReducer } from "../context/reducer";
import { initialIKState } from "../context/state";
import useGetAuthState from "../hooks/useGetAuthState";

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(IKReducer, initialIKState);
  useGetAuthState({ dispatch });
  return (
    <IKContext.Provider value={{ state, dispatch }}>
      <Component {...pageProps} />
    </IKContext.Provider>
  );
}
export default MyApp;
