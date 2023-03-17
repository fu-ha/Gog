import { useCallback, useMemo, useEffect, useState } from "react"
import { useRecoilValue } from "recoil"
import { FlashMessageAtom } from "../atom/FlashMessageAtom"
import { useFlashMessage } from "../hooks/useFlashMessage"
import { MdDone } from "react-icons/md"
import SideBar  from "../components/SideBar"
import axios from "axios"
import Cookies from "js-cookie"

type LayoutProps = {
  //id: number,
  children: React.ReactNode
}

type ProfData = {
  login_user: {
    id: number
  }
}

const Layout = ({ children }: LayoutProps) => {
  
  //const [FlashAtom, setFlashAtom] = useRecoilState(FlashMessageAtom)
  const FlashAtom = useRecoilValue(FlashMessageAtom)
  const { FlashMessage } = useFlashMessage()
  
  const FlashClose = useCallback(() => {
    FlashMessage({ type: "HIDDEN", message: "" });
  }, [])
  
  const Alert = useMemo(() => {
    return(
      <>
        {FlashAtom.show  && (
          <div className="flex md:mt-3 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-900" role="alert">
            <div className="flex items-center justify-center w-12 bg-emerald-500">
              <MdDone />
            </div>
            <div className="px-4 py-2 -mx-3">
              <div className="mx-3 z-40">
                {FlashAtom.message}
              </div>
            </div>
          </div>
        )}
      </>
    )
  }, [FlashClose, FlashAtom])
  
  useEffect(function () {
    if (FlashAtom.show) { 
      setTimeout(FlashClose, 10000)
    }
  }, [FlashAtom])
/*  
  const prof_url = process.env.NEXT_PUBLIC_BASE_URL + "users"
  const [prof, setProf] = useState<ProfData>()
  
  useEffect(() => {
    axios(prof_url, {
      headers: {
        "access-token": Cookies.get("access-token") || "",
        "client": Cookies.get("client") || "",
        "uid": Cookies.get("uid") || "",
      }
    })
      .then((res) => {
        setProf(res.data)
      })
  }, [])
*/
  return (
    <>
      <div className="flex flex-row justify-center w-full bg-white dark:bg-gray-900 dark:border-gray-600">
        <div className="flex max-w-screen-xl  mt-14 md:mt-0 w-full">
          <SideBar />
          <div className="flex flex-col flex-1 overflow-auto  bg-bgPrimary dark:bg-dark-800">
            <div className="flex-1 relative flex overflow-auto no-scrollbar" >
              <main className="flex-1 relative focus:outline-none bg-bgPrimary dark:bg-dark-900">
                <div className="relative">
                  <div className="absolute right-0">
                    {Alert}
                  </div>
                  <div>
                    { children }
                  </div>
                </div>
              </main>
            </div>
          </div>
        </div>
      </div>
    </>  
  )
}

export default Layout