import Layout from "components/Layout"
import RoomsCmp from "components/DM/RoomsCmp"

const Rooms = () => {
  
  return(
    <Layout>
      <div className="rounded-sm white dark:bg-gray-900">
        <div className="relative min-h-screen  md:border-l-2 md:dark:border-gray-700 lg:grid lg:grid-cols-12 md:bg-gray-100 md:dark:bg-gray-800">
          <div className="flex flex-col col-span-4 h-full px-2 md:px-2 py-3 md:py-3 md:bg-gray-100 md:dark:bg-gray-800">
            <h1 className="md:hidden flex m-3 font-bold text-gray-800 dark:text-gray-400">メッセージ</h1>
            <RoomsCmp />
          </div>
          <div className="hidden md:col-span-8 lg:items-center lg:justify-center lg:flex bg-white dark:bg-gray-900">
            <div className="flex ">
              チャットするユーザーを選択
            </div>
          </div>
        </div> 
      </div>
    </Layout>
  )
}

export default Rooms