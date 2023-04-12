import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'
import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import { initTestHelpers } from 'next-page-tester'

initTestHelpers()

describe("LoginForm", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  
    // it("ログイン成功", () => {
  it("ログイン成功", async () => {
    const { page } = await getPage({
      route: '/auth',
    })
    render(page)
    
    userEvent.type(screen.getByPlaceholderText('email@example.com'), 'email@example.com')
    userEvent.type(screen.getByPlaceholderText('password'), 'passwd')
    userEvent.click(screen.getByText('ログイン'))
  })
  
  it("ログイン失敗", async () => {
    // const server = setupServer(
    //   rest.get(`${process.env.NEXT_PUBLIC_RESTAPI_URL}/auth`, (req, res, ctx) => {
    //     return res(ctx.status(200))
    //   })  
    // )
  // 　server.use(
      rest.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}/auth/sign_in`,
        (req, res, ctx) => {
          return res(ctx.status(400))
        }
      )
    // )
    
    const { page } = await getPage({
      route: '/auth',
    })  
    render(page)
    
    userEvent.type(screen.getByPlaceholderText('email@example.com'), 'email')
    userEvent.type(screen.getByPlaceholderText('password'), 'passwd')
    userEvent.click(screen.getByText('ログイン'))
    expect(await screen.findByText('ログイン')).toBeInTheDocument()
  })
})
