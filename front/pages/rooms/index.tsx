import Layout from "components/Layout"
import RoomsCmp from "components/DM/RoomsCmp"

const Rooms = () => {
  
  return(
    <Layout>
      <div className="rounded-sm white dark:bg-gray-900">
        <div className="flex h-screen border-l-2 dark:border-gray-700 lg:grid lg:grid-cols-12">
          <div className="flex flex-col hidden md:inline-block col-span-4 md:px-2 md:py-3 bg-gray-100 dark:bg-gray-800">
            <RoomsCmp />
          </div>
          <div className="md:flex items-center justify-center col-span-8 white dark:bg-gray-900">
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