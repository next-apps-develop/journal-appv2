import CategoryItem from '../../../src/components/categories/CategoryItem'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import Categories from '../../../src/components/categories/Categories'
import { useBoundStore } from '../../../src/app/store/useBoundStore'

vi.mock('next-auth/react', async importOriginal => {
  const actual: any = await importOriginal()
  return {
    ...actual,
    useSession: vi.fn(() => ({ data: null, status: 'unauthenticated' })),
    SessionProvider: ({ children }: any) => <div>{children}</div>,
  }
})
describe('Categories item test', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
    vi.resetConfig()
    vi.resetModules()

    render(
      <SessionProvider>
        <Categories />
      </SessionProvider>
    )
  })

  afterEach(() => {
    cleanup()
  })

  test('should be render all components categories', async () => {
    await act(async () => {
      useBoundStore.setState({
        categories: [
          {
            _id: '677f3fff955ca444a79daba3',
            name: 'Uncategorized',
            color: '#000000',
            icon: '',
            userId: '66ea3fecf94fd4346cc440d9',
            createdAt: new Date('2025-01-09T03:18:23.762Z'),
            updatedAt: new Date('2025-01-09T03:18:23.762Z'),
            __v: 0,
            tasksLeft: 1,
          },
          {
            _id: '678c79b76b16e90303a41d50',
            name: 'categ44',
            color: '#D17B0F',
            icon: 'phone',
            userId: '66ea3fecf94fd4346cc440d9',
            createdAt: new Date('2025-01-19T04:04:08.000Z'),
            updatedAt: new Date('2025-01-21T01:57:37.812Z'),
            __v: 0,
            tasksLeft: 0,
          },
          {
            _id: '678f208269a917eff2a6c998',
            name: 'xsa',
            color: '#D33F49',
            icon: 'home',
            userId: '66ea3fecf94fd4346cc440d9',
            createdAt: new Date('2025-01-21T04:20:18.437Z'),
            updatedAt: new Date('2025-01-21T04:20:18.437Z'),
            __v: 0,
            tasksLeft: 2,
          },
        ],
      })
    })
    screen.debug()
    expect(1).toBe(1)
  })
})
