import React, { useEffect } from "react"
import { AppProps } from "next/app"
import { useRouter } from "next/router"
import 'styles/globals.css'
import { RecoilRoot } from "recoil"
import { SWRConfig } from "swr"
import axios from "axios"
import Cookies from "js-cookie"
import { ThemeProvider } from 'next-themes'

function App ({Component, pageProps}: AppProps) {
  const router = useRouter()
  
  useEffect(() => {
    if (!Cookies.get("access-token") && !Cookies.get("client") && !Cookies.get("uid")) {
      router.push("/auth")
    }
  }, [])
  
  return(
    <React.StrictMode>
      <SWRConfig value={{
        fetcher: (url: string) => 
          axios.get(url,{
            headers: {
              "access-token": Cookies.get("access-token") || "",            
              "client": Cookies.get("client") || "",
              "uid": Cookies.get("uid") || ""
            }
          }).then((res) => res.data)
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