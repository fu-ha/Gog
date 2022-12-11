import useFetch from "hooks/useFetch"
import { useRecoilValue } from "recoil"
import { FeedReloadSelector } from "atom/FeedContentAtom"

const sample = () => {
  
  const url = process.env.NEXT_PUBLIC_BASE_URL + "posts"
  //const { reloadFetch } = useFetch(url)
  const { reloadFetching } = useRecoilValue(FeedReloadSelector)
  
  const onClick = () => {
    //reloadFetch()
    //useFetch(url)
    reloadFetching()
  }
  
  return(
    <button
      className="bg-white"
      onClick={onClick}
    >
      fetch
    </button>  
  )
}

export default sample