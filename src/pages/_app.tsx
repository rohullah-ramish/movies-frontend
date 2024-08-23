import type { AppProps } from "next/app";
import { wrapper } from "@/store";

import "@/styles/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token) router.push('/')
  },[])
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
