// https://testing-library.com/docs/react-testing-library/setup/#using-without-jest 
import React, { ReactElement } from "react"
import { RecoilRoot } from "recoil"
import { render, RenderOptions } from "@testing-library/react"

const providers = ({ children }: {children: React.ReactNode}) => {
  return(
    <RecoilRoot>
      { children }
    </RecoilRoot>  
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>,) =>
  render(ui, { wrapper: providers, ...options })

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render }