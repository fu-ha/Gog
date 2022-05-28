import { useState, useEffect } from "react"
import { MdHome } from "react-icons/md"
import { MdPerson } from "react-icons/md"
import { MdOutlineChat } from "react-icons/md"
import { useTheme } from 'next-themes';
import { MdLightMode } from "react-icons/md"
import { MdModeNight } from "react-icons/md"
import { MdClear } from "react-icons/md"
//import SideBar from "components/SideBar"

const Main = () => {
  const { theme, setTheme } = useTheme();

  const handleSetTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  const [openModal, setOpenModal] = useState(false)
  
  const handleModalOpen = () => {
    setOpenModal(true)
  }
  
  const handleModalClose = () => {
    setOpenModal(false)
  }
  
  return(
    <>
    <div className="flex flex-row justify-center w-full dark:bg-gray-800 dark:border-gray-600">
      <div className="flex overflow-auto max-w-screen-xl w-full">
        
        <div className="invisible md:visible flex-col md:flex md:flex-shrink-0 justfy-between w-0 md:w-1/3 h-screen md:px-4 md:py-8">
          <div className="flex flex-col overflow-y-auto">    
            <div className="flex-shrink-0 px-3 flex justify-between items-center flex-row">
              <a className="text-3xl text-gray-600 dark:text-gray-400" href="/main">Gog</a>
              <button 
                className="block p-1 bg-white dark:bg-gray-800 rounded-full focus:ring-green-500" 
                onClick={handleSetTheme}
              >
                {theme === 'light' ? <MdLightMode className="w-5 h-5 text-gray-700" /> : <MdModeNight className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
            <div className="relative mt-6">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </span>
              <input type="text" className="w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring" placeholder="Search"/>
            </div>
            <div className="flex flex-col justify-between flex-1 mt-6">
              <nav>
                <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="/main=">
                    <MdHome className="w-5 h-5" />
                    <span className="mx-4 font-medium">ホーム</span>
                </a>
                <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <MdPerson className="w-5 h-5" />
                    <span className="mx-4 font-medium">プロフィール</span>
                </a>
                <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <MdOutlineChat className="w-5 h-5" />
                    <span className="mx-4 font-medium">DM</span>
                </a>
                <a className="flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-200 transform rounded-md dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-gray-200 hover:text-gray-700" href="#">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <span className="mx-4 font-medium">Settings</span>
                </a>
                <hr className="my-6 border-gray-200 dark:border-gray-600" />
              </nav>
            </div>
          </div>    
        </div> 
        
        <div className="flex flex-col w-0 flex-1 overflow-auto relative bg-bgPrimary dark:bg-dark-900">
          <div className="flex-1 relative flex overflow-auto no-scrollbar" >
            <main className="flex-1 relative focus:outline-none bg-bgPrimary dark:bg-dark-900">
              <div className="absolute inset-0 px-4 py-6 sm:px-6 lg:px-10">
                <div className="space-y-5 divide-y divide-gray-200 dark:divide-dark-700">
                  <button 
                    type="button" 
                    className="w-full px-12 py-3 text-sm font-medium text-green-700 border border-green-700 rounded hover:bg-green-800 hover:text-white active:bg-green-800 focus:outline-none focus:ring"
                    onClick={handleModalOpen}
                  >
                    新規投稿
                  </button>
       
                </div>            
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
    
    <div>
      { openModal ? (
        <div className="fixed z-20 inset-0"> 
          <div className="flex items-center justify-center min-h-full max-h-full  text-center p-4">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            　   <div aria-hidden="true" className="absolute inset-0 bg-gray-200 dark:bg-dark-800 opacity-50">
            　   </div>
            </div>
            <div className="w-screen-95 sm:w-full sm:max-w-2xl rounded-lg bd-white dark:bg-dark-900 inline-block align-middle text-left shadow-xl transform transform-all sm:align-middle">
              <form className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <div className=" ">
                  <div className="flex">
                    <button
                      type="button"
                      className="bg-white dark:bg-gray-800"
                      onClick={handleModalClose}
                    >
                      <MdClear />
                    </button>
                  </div>
                  <div className="w-full mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Message</label>
                    <textarea className="block w-full h-40 px-4 py-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"></textarea>
                  </div>
                  <div className="flex justify-center mt-6">
                    <button className="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Send Message</button>
                  </div>
                </div>
              </form>
            </div> 
          </div>
        </div> 
      ) : null }
    </div>
  </>  
  )
}
export default Main