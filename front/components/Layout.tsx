import React from "react"

interface LayoutProps {
  children: React.ReactNode
}

// 全てのページで共通となるレイアウト
const Layout = ({ children }: LayoutProps) => {

  return (
    <>
      <div className="none dark:bg-gray-700">
        {children}
      </div>
    </>  
  )
}

export default Layout