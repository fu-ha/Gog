import React from "react"
import { AppProps } from "next/app"
import 'styles/globals.css'
import { RecoilRoot } from "recoil"
import { SWRConfig } from "swr"
import axios from "axios"
import { ThemeProvider } from 'next-themes'

function App({Component, pageProps}: AppProps){
  
  return(
    <React.StrictMode>
      <SWRConfig value={{
        fetcher: (url: string) => 
          axios.get(url).then((res) => res.data)
        }}>
          <RecoilRoot>
            <ThemeProvider attribute="class">
              <Component {...pageProps} />
            </ThemeProvider>
          </RecoilRoot>
      </SWRConfig>
    </React.StrictMode>
  )  
}
export default App
