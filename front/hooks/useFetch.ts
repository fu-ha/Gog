import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil"
import { FeedContentAtom, MicropostType } from "atom/FeedContentAtom"
import axios from "axios"
import Cookies from "js-cookie"

function useFetch() {
  const url = process.env.NEXT_PUBLIC_BASE_URL + "posts"
  const [FeedContent, setFeedContent] = useRecoilState(FeedContentAtom)
  
  async function fetchContent() {
    const response = await axios.get(url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || ""
      }
    })
    const json = response.data
    return json
  }
  
  //const reloadFetching = () => {
    //const result = fetchContent()
    //setFeedContent()
  //}
  
  return { fetchContent }
  
  //const [data, setData] = useState()
  //const reloadFetch = () => {
    /*
    useEffect(() => {
      const handleFetch = async () => {
        const response = await axios(url, {
          headers: {
            "access-token": Cookies.get("access-token") || "",
            "client": Cookies.get("client") || "",
            "uid": Cookies.get("uid") || "",
          }
        })
          // .then((res) => {
          //   setData(res.data)
          // })
        const json = await response.data
        return json
      }
      handleFetch()
    }, []) 
    */
  //}
  
  //return { reloadFetch }
}

export default useFetch