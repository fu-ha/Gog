import { useState } from "react"
import { MdKeyboardArrowDown } from "react-icons/md"

const SelectMicropostTag = () => {
  
  const [openTag, setOpenTag] = useState(false)
  
  return(
    <div className="relative inline-block ml-3 md:ml-5 my-3 md:my-5">
      <button onClick={() => setOpenTag(!openTag)} className="relative flex z-10 block p-2 text-gray-700 border border-transparent rounded-md dark:text-white bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
        <span className="text-sm font-medium">タグ付けされたページを選択</span>
        <MdKeyboardArrowDown className="ml-2 mt-1 items-center" />
      </button>
      
      {openTag &&
        <div className="absolute right-0 z-20 w-48 mt-2 bg-white rounded-md shadow-xl bg-gray-100 dark:bg-gray-800">
          <a href="/sort/apex" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">APEX Legends</a>
          <a href="/sort/spl_3" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">スプラトゥーン３</a>
          <a href="/sort/sb_sp" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">スマブラSP</a>
          <a href="/sort/ftn" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">フォートナイト</a>
          <a href="/sort/cod" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">COD</a>
          <a href="/sort/cod_mobile" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">CoD:Mobile</a>
          <a href="/sort/knv_out" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">荒野行動</a>
          <a href="/sort/pubg" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">PUBG</a>
          <a href="/sort/pubg_mobile" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">PUBG:Mobile</a>
          <a href="/sort/genshin" className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform  bg-gray-100 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white">原神</a>
        </div>
      }
    </div>
  )
}

export default SelectMicropostTag