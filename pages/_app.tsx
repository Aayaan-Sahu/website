import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

import { MountedContext } from "../src/MountedContext";
import { useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
          integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
          crossOrigin="anonymous"
        />
      </Head>
      <MountedContext.Provider value={{ mounted, setMounted }}>
        <Component {...pageProps} />
      </MountedContext.Provider>
    </ThemeProvider>
  );
}

export default MyApp;
