import { render, screen } from '@testing-library/react'
import Auth from "@/pages/auth"
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'
import { rest } from 'msw'
import { initTestHelpers } from 'next-page-tester'
import SignupModal from "@/components/Auth/SignupModal"
import LoginForm from "@/components/Auth/LoginForm"

initTestHelpers()

describe("auth", () => {
  beforeEach(async () => {
    const { page } = await getPage({
      route: '/auth',
    })
    render(page)
    
  })
  
  it("ゲストログイン成功", async () => {
    rest.post(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/auth/guest_sign_in`,
      (req, res, ctx) => {
        return res(ctx.status(200))
      }
    )
    userEvent.click(screen.getByText('ゲストログイン'))
  })
  
  it("ゲストログイン失敗", async () => {
    rest.post(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}/auth/guest_sign_in`,
      (req, res, ctx) => {
        return res(ctx.status(400))
      }
    )
    userEvent.click(screen.getByText('ゲストログイン'))
  })
})