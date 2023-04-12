import { useState,  useEffect } from "react"
import Link from "next/link"
//import { useRouter } from "next/router"
import { useForm } from "react-hook-form"
import Layout from "../../components/Layout"
import axios from "axios"
import Cookies from "js-cookie"
import { MdSearch } from "react-icons/md"

type UserSearchType = {
  id: number,
  name: string,
  image?:{
    url: string,
  } 
}

const Search = () => {
  const [word,setWord] = useState<string>("")
  const onChangeWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value)
  }
  
  //const search_url = process.env.NEXT_PUBLIC_BASE_URL + `search`
  const { register, handleSubmit, formState: { errors }, reset } = useForm<UserSearchType>()
  const [searchUser, setSearchUser] = useState<UserSearchType[]>()
  
  const params = { name: word }
  const query_params = new URLSearchParams(params)
  
  // const onSubmit = () => {
  //   axios(`${process.env.NEXT_PUBLIC_BASE_URL + 'search'}?` + query_params, {
  //     headers: {
  //       "access-token": Cookies.get("access-token") || "",
  //       "client": Cookies.get("client") || "",
  //       "uid": Cookies.get("uid") || ""
  //     }
  //   })
  //     .then((res) => {
  //       reset({ name: ''})
  //       setSearchUser(res.data)
  //     })
  // }
  
  const onKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      e.preventDefault()
      axios(`${process.env.NEXT_PUBLIC_BASE_URL + 'search'}?` + query_params, {
        headers: {
          "access-token": Cookies.get("access-token") || "",
          "client": Cookies.get("client") || "",
          "uid": Cookies.get("uid") || ""
        }
      })
        .then((res) => {
          setSearchUser(res.data)
        })
    }
  }
  
  return(
    <Layout>
      <div className="flex justify-center py-7">
        <div className="w-3/4">
          <div className="py-2">
            <div className="pb-3">
              <label>
                キーワード
              </label>
            </div>
            {//<form onSubmit={handleSubmit(onSubmit)} className="relative">
              // <div className="absolute flex items-center inset-y-0 pl-3">
              //   <MdSearch className="h-5 w-5 text-gray-400" />
              // </div>
              // <input 
              //   className="w-4/5 border-2 border-gray-200 dark:border-gray-600 rounded-lg pl-10 pr-5 py-2 dark:bg-gray-800"  
              //   placeholder="キーワード検索"
              //   {...register("name", { required: true })}
              //   type="search"
              //   value={word}
              //   onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeWord(e)}
              // />
            //</form> 
            }
            <div className="relative">
              <div className="absolute flex items-center inset-y-0 pl-3">
                <MdSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                className="w-4/5 border-2 border-gray-200 dark:border-gray-600 rounded-lg pl-10 pr-5 py-2 dark:bg-gray-800"  
                placeholder="キーワード検索"
                type="search"
                value={word}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeWord(e)}
                onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => onKeyEnter(e)}  
              />
            </div>
          </div>
          <div className="pt-5">
            <p className="mb-3">検索結果: {}</p>
            <div>
              {searchUser && searchUser.map((data) => (
                <div className="h-14 md:h-16 w-4/5 flex rounded-lg mb-3 md:mb-5 dark:bg-gray-700">
                  <div className="flex items-center">
                    <div className="pl-4">
                      {data.image?.url ? (
                        <img
                          className="object-cover h-12 w-12 rounded-full"
                          src={data.image?.url}
                          alt="avatar"
                        />
                      ): (
                        <img
                          className="object-cover h-12 w-12 rounded-full"
                          src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                          alt="avatar"
                        />
                      )}
                    </div>
                  </div>
                  <Link href={`/users/${data.id}`}>
                  <div className="flex items-center pl-5">
                    <p className="text-lg">{data.name}</p>
                  </div>
                  </Link>
                </div>
              ))}  
            </div>
          </div>
        </div>
      </div>  
    </Layout>  
  )
}

export default Search