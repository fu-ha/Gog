import { useState } from 'react'
import {MdKeyboardArrowDown} from "react-icons/md"

interface appProps {
  name: string
}

const ABC = [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  { id: 3, name: "c" },
]

const apple = (props: appProps) => {
  const [alf, setAlf] = useState()
  const [name, setName] = useState()
  const [select, setSelect] = useState("")
  const [open, setOpen] = useState()
  const [btn, setBtn] = useState()
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
  }
  
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = e.target.value
    setSelect(selectValue)
    console.log(selectValue)
  }
  
  //const handleButton = (e: React.ChangeEvent<HTMLButtonElement>) => {
  const handleButton = (e: React.ChangeEvent<HTMLLIElement>) => {
    const btnValue = e.target.value
    setBtn(btnValue)
    console.log(btnValue)
  }
  
  const handleLI = () => {
    
  }

  return (
    <>
      <input value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e)
        console.log(e.target)
        handleChange(e)
        setName(e.target.value)
      }}/>
      <select value={select} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleSelect(e)}>
        <option value=""></option>
        <option value="1">a</option>
        <option value="2">b</option>
        <option value="3">c</option>
      </select>
      <div className="relative inline-block ml-5">
        <button onClick={() => setOpen(!open)} className="relative flex z-10 block p-2 text-gray-700 bg-white border border-transparent rounded-md dark:text-white focus:border-blue-500 focus:ring-opacity-40 dark:focus:ring-opacity-40 focus:ring-blue-300 dark:focus:ring-blue-400 focus:ring dark:bg-gray-800 focus:outline-none">
          {/*<input value={btn} className="dark:bg-gray-800" onChange={(e) => setBtn(e.target.value)} />*/}
          <span onChange={handleButton}>value: {btn}</span>
          <MdKeyboardArrowDown className="mt-1 items-center" />
        </button>
        {open &&
          <ul className="absolute right-0 z-20 w-48 py-2 mt-2 bg-white rounded-md shadow-xl dark:bg-gray-800">
            <li
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              //onChange={(e: React.ChangeEvent<HTMLLIElement>) => handleButton(e)}
              value="x"
              id="x"
              onClick={handleLI}
            >
              x
            </li>
             <li
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              //onChange={(e: React.ChangeEvent<HTMLLIElement>) => handleButton(e)}
              onChange={(e) => {console.log(e.target)}}
              value="y"
            >
              y
            </li>
             <li
              className="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              //onChange={(e: React.ChangeEvent<HTMLLIElement>) => handleButton(e)}
              onChange={(e) => {console.log(e.target)}}
              value="z"
            >
              z
            </li>
          </ul>
        }
      </div>
    </>
  );
}

export default apple