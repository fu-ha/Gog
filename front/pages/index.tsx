import Header from "components/Header"
//import SideBar from "components/SideBar"
//import Layout from "components/Layout"
//import useSWR from "swr"

const Index = () => {
  //const { data, error } = useSWR('http://localhost:8080/api/v1/users')
  
  //if (error) return <div>failed to load</div>
  //if (!data) return <div>loading...</div>
  //<div>hello {data.name}!</div>
  return(
    <div className="bh-bgPrimary dark:bg-dark-900 min-h-screen flex flex-col">
      <div className="flex flex-col bg-bgPrimary dark:bg-dark-900 relative items-center grow">
        <header className="bg-white dark:bg-dark-800 shadow sm:sticky sm:top-0 z-30 overscroll-none w-full flex-shrink-0">
          <Header />
        </header>
        <div className="grow relative flex max-w-screen-lg w-full">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 flex flex-col items-center justify-center lg:flex-none my-12 sm:my-12 mx-6 w-full">
              <div className="bg-white dark:bg-dark-800 px-10 pt-10 pb-10 rounded-xl shadow-lg md:w-1/2">
                <div>
                  <div>
                    <h1 className="inline-flex justify-center font-bold text-xl text-center text-gray-900 dark:text-gray-300 w-full">
                      Gogをはじめる
                    </h1>
                    <div>
                      <div>
                        <a href="#" className="flex items-center justify-center mt-4 text-gray-900 transition-colors duration-200 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-500 dark:hover:bg-gray-600">
                          <div className="px-4 py-2">
                            <svg className="w-6 h-6" viewBox="0 0 40 40">
                              <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107"/>
                              <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00"/>
                              <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50"/>
                              <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2"/>
                            </svg>
                          </div>
                          <span className="w-5/6 px-4 py-3 font-bold text-center">Googleでサインイン</span>
                        </a>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mt-4">
                          <span className="w-2/5 border-b dark:border-gray-400 lg:w-2/5"></span>
                            <p className="text-xs text-center text-gray-900 uppercase dark:text-gray-400 hover:underline">または</p>
                          <span className="w-2/5 border-b dark:border-gray-400 lg:w-2/5"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <form className="space-y-5">
                    <div>
                      <div className="flex space-y-1.5 items-center">
                        <div className="flex">
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300  ">メールアドレス</label>
                        </div>
                      </div>
                      <div className="mt-1">
                        <input type="email" className="focus:ring-violet-500 focus:border-violet-500 mt-1 block w-full border border-gray-300 dark:border-dark-700 dark:bg-dark-700 dark:text-gray-100 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1.5 items-center">
                          <div className="flex">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300  ">パスワード</label>
                          </div>
                        </div>
                        <div className="text-sm">
                          <p className="font-medium text-violet-600 hover:text-violet-500 cursor-pointer" aria-hidden="true">パスワードを忘れた方</p>
                        </div>
                      </div>
                      <div className="mt-1">
                        <input type="password" className="focus:ring-violet-500 focus:border-violet-500 mt-1 block w-full border border-gray-300 dark:border-dark-700 dark:bg-dark-700 dark:text-gray-100 rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm" />
                      </div>
                    </div>
                    <div>
                      <button 
                        type="submit" 
                        className=" w-full p-2 text-base border-transparent text-white bg-green-800 hover:bg-green-700  inline-flex items-center justify-center border rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        ログイン
                      </button>
                    </div>
                    <div className="w-full border-t border-gray-300 dark:border-dark-700 "></div>
                    <div>
                      <button 
                        type="submit" 
                        className=" w-full p-2 text-base border-transparent text-white bg-violet-600 hover:bg-violet-700  inline-flex items-center justify-center border rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                      >
                        新規登録
                      </button>
                    </div>
                    <div className="w-full border-t border-gray-300 dark:border-dark-700 "></div>
                    <div>
                      <button 
                        type="submit" 
                        className=" w-full p-2 text-base border-transparent text-white bg-blue-600 hover:bg-blue-700  inline-flex items-center justify-center border rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        ゲストログイン
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Index