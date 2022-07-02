import { AppProps } from "next/app"
//import Head from "next/head"
import 'styles/globals.css'
import { RecoilRoot } from "recoil";
import { SWRConfig } from "swr";
import React from "react";
import { ThemeProvider } from 'next-themes'
//import Header from "components/Header"
//import SideBar from "components/SideBar"
//import Layout from "components/Layout"
import axios from "axios"
//import client from "modules/client"
//import { Auth } from "modules/Auth"

function App({Component, pageProps}: AppProps){
    
    return(
        <React.StrictMode>
            <SWRConfig value={{
                fetcher: (url: string) => axios(url)
                  .then(res => {
                    console.log(res.data)
                    localStorage.getItem("access-token");
                    localStorage.getItem("client");
                    localStorage.getItem("uid");
                })
                /*fetcher: (url) => fetch(url, {
                  method: "GET",
                  headers: {
                    Authorization: `Bearer ${Auth.getToken()}`,
                    "Content-Type": "application/json",
                  },
                }).then((res) => res.json()),*/
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
