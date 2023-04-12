import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import { getPage } from 'next-page-tester'
// import { rest } from 'msw'
// import { setupServer } from 'msw/node'
import Search from "@/pages/search/index"
import { initTestHelpers } from 'next-page-tester'

initTestHelpers()

describe('Search', () => {
  
  // const searchUser = [{ id: 1, name: "name" }, { id: 2, name: "test"}]
  
  beforeEach(async () => {
    // await waitFor(() => render(<Search />))
  })
  
  it('検索成功', async () => {
    // const { page } = await getPage({
    //   route: '/search'
    // })
    // render(page)
    
    // const searchInput = screen.getByRole("searchbox") as HTMLInputElement
    // userEvent.type(searchInput, "name")
    
    // expect(screen.getByText('name'))
    // expect(searchInput.value).toBe("name")
    // const searchUserInfo = searchUser.map((user) => `id: ${user.id}, name:${user.name}`)
    // expect(searchUserInfo).toBe("name")
  })
  
  it('検索失敗', async () => {
    // const { page } = await getPage({
    //   route: '/search'
    // })
    // render(page)
    
    // const searchInput = screen.getByRole("searchbox") as HTMLInputElement
    // userEvent.type(searchInput, "name")
  })
})