import { useState } from "react"
import { MdClear } from "react-icons/md"

import Layout from "components/Layout"
//import PostCard from "components/Post/PostCard"

const Index = () => {
  const [openModal, setOpenModal] = useState(false)
  
  const handleModalOpen = () => {
    setOpenModal(true)
  }
  
  const handleModalClose = () => {
    setOpenModal(false)
  }
  
  return(
    <>
      <Layout>
        <div className="absolute inset-0 px-4 py-6 sm:px-6 lg:px-10">
          <div className="space-y-5 divide-y divide-gray-200 dark:divide-dark-700">
            <button 
              type="button" 
              className="w-full px-12 py-3 text-sm font-medium text-green-700 border border-green-600 rounded hover:bg-green-700 hover:text-white active:bg-green-800 focus:outline-none focus:ring"
              onClick={handleModalOpen}
            >
              新規投稿
            </button>
            
          </div>            
        </div>
      </Layout>
    
      <div>
        { openModal ? (
          <div className="fixed z-20 inset-0"> 
            <div className="flex items-center justify-center min-h-full max-h-full  text-center p-4">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            　   <div aria-hidden="true" className="absolute inset-0 bg-gray-700 dark:bg-dark-800 opacity-75">
            　   </div>
              </div>
              <div className="w-screen-95 sm:w-full sm:max-w-2xl rounded-lg bd-white dark:bg-dark-900 inline-block align-middle text-left shadow-xl transform transform-all sm:align-middle">
                <form className="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                  <div>
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
export default Index