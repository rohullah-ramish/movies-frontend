import type { AppProps } from "next/app";
import { wrapper } from "@/store";

import "@/styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
