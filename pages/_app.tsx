import { CssBaseline, ThemeProvider } from "@material-ui/core"
import { AppProps } from "next/dist/next-server/lib/router/router"
import Head from "next/head"
import theme from "client/theme"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title> Los Guindales - Documentos </title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
