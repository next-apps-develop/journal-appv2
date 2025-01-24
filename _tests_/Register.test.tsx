import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { JSDOM } from 'jsdom'
import userEvent from '@testing-library/user-event'
import RegisterComponent from '../src/components/register/Register'

vi.mock('next-auth/react', async importOriginal => {
  const actual: any = await importOriginal()
  return {
    ...actual,
    useSession: vi.fn(() => ({ data: null, status: 'unauthenticated' })),
    SessionProvider: ({ children }: any) => <div>{children}</div>,
  }
})
vi.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
    }
  },
}))
describe('Login Tests', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
    vi.resetConfig()
    vi.resetModules()

    render(
      <SessionProvider>
        <RegisterComponent />
      </SessionProvider>
    )
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
    vi.resetConfig()
    vi.resetModules()
    // cleanup()
  })

  test('FormLogin should be have all elements', () => {
    const inputName = screen.getByPlaceholderText('Name')
    const inputEmail = screen.getByPlaceholderText('Email')
    const inputPassword = screen.getByPlaceholderText('Password')
    const inputConfirmPassword = screen.getByPlaceholderText('Confirm password')
    const btnSubmit = screen.getByRole('button', { name: 'Register' })
    expect(inputName).toBeDefined()

    expect(inputEmail).toBeDefined()
    expect(inputPassword).toBeDefined()
    expect(btnSubmit).toBeDefined()
    expect(inputConfirmPassword).toBeDefined()
    // screen.debug()
  })

  // test('FormLogin must be show errors', async () => {
  //   const inputEmail = screen.getByPlaceholderText('Email')
  //   const inputPassword = screen.getByPlaceholderText('Password')
  //   const btnSubmit = screen.getByRole('button', { name: 'Log In' })
  //   fireEvent.change(inputEmail, { target: { value: '' } })
  //   fireEvent.change(inputPassword, { target: { value: '' } })

  //   await userEvent.pointer({
  //     keys: '[MouseLeft]',
  //     target: btnSubmit,
  //     coords: { x: 75, y: 42 },
  //   })

  //   await waitFor(() => {
  //     expect(screen.getByText('Email is required')).toBeDefined()
  //     expect(screen.getByText('Password is required')).toBeDefined()
  //   })
  // })
})
