import { useCallback, useMemo, useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import { FlashMessageAtom } from "atom/FlashMessageAtom"
import { useFlashMessage } from "hooks/useFlashMessage"
import { MdDone } from "react-icons/md"
import SideBar  from "components/SideBar"
//import { Auth } from "modules/Auth"

type LayoutProps = {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  
  const [FlashAtom, setFlashAtom] = useRecoilState(FlashMessageAtom)
  const { FlashMessage } = useFlashMessage()
  
  const FlashClose = useCallback(() => {
    FlashMessage({ type: "HIDDEN", message: "" });
  }, [])
  
  const Alert = useMemo(() => {
    return(
      <>
        {FlashAtom.show  && (
          <div className="flex float-right md:mt-3 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800" role="alert">
            <div className="flex items-center justify-center w-12 bg-emerald-500">
              <MdDone />
            </div>
            <div className="px-4 py-2 -mx-3">
              <div className="mx-3">
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
      setTimeout(FlashClose, 5000)
    }
  }, [FlashAtom.show])

  return (
    <>
      <div className="flex flex-row justify-center w-full dark:bg-gray-900 dark:border-gray-600">
        <div className="flex overflow-auto max-w-screen-xl w-full">
          <SideBar />
          <div className="flex flex-col w-0 flex-1 overflow-auto relative bg-bgPrimary dark:bg-dark-800">
            <div className="flex-1 relative flex overflow-auto no-scrollbar" >
              <main className="flex-1 relative focus:outline-none bg-bgPrimary dark:bg-dark-900">
                {Alert}
                { children }
              </main>
            </div>
          </div>
        </div>
      </div>
    </>  
  )
}

export default Layout