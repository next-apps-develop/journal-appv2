import CategoryItem from '../../../src/components/categories/CategoryItem'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { useBoundStore } from '../../../src/app/store/useBoundStore'
import axios from 'axios'
import { journalAPI } from '../../../src/app/utils/axiosConfig'

vi.mock('next-auth/react', async importOriginal => {
  const actual: any = await importOriginal()
  return {
    ...actual,
    useSession: vi.fn(() => ({ data: null, status: 'unauthenticated' })),
    SessionProvider: ({ children }: any) => <div>{children}</div>,
  }
})
describe('Category item test', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
    vi.resetConfig()
    vi.resetModules()

    render(
      <SessionProvider>
        <CategoryItem
          category={{
            _id: '678c79b76b16e90303a41d50',
            name: 'categ44',
            color: '#D17B0F',
            icon: 'phone',
            userId: '66ea3fecf94fd4346cc440d9',
            createdAt: new Date('2025-01-19T04:04:08.000Z'),
            updatedAt: new Date('2025-01-21T01:57:37.812Z'),
            __v: 0,
            tasksLeft: 1,
          }}
          op={{ current: { toggle: vi.fn() } }}
        />
      </SessionProvider>
    )
  })

  afterEach(() => {
    cleanup()
  })

  test('should be render all components', async () => {
    const categoryName = screen.getByTestId('category-name')
    const categoryTasksLeft = screen.getByTestId('category-tasks-left')

    await waitFor(() => {
      expect(categoryName).toBeDefined()
      expect(categoryTasksLeft).toBeDefined()
    })
  })

  test('should be hide option dots by default', async () => {
    const dotsOption = screen.queryByTestId('dots-option')

    await waitFor(() => {
      expect(dotsOption).toBeNull()
    })
  })

  test('should be show option dots when categorySelected are iqual to category', async () => {
    await act(async () => {
      useBoundStore.setState({
        categorySelected: {
          _id: '678c79b76b16e90303a41d50',
          name: 'categ44',
          color: '#D17B0F',
          icon: 'phone',
          userId: '66ea3fecf94fd4346cc440d9',
          createdAt: new Date('2025-01-19T04:04:08.000Z'),
          updatedAt: new Date('2025-01-21T01:57:37.812Z'),
          __v: 0,
          tasksLeft: 1,
        },
      })
    })
    const dotsOption = screen.getByTestId('dots-option')

    waitFor(() => {
      expect(dotsOption).toBeDefined()
    })
  })

  test('should be show option_dots on click category', async () => {
    vi.spyOn(journalAPI, 'post').mockImplementation(() => {
      return Promise.resolve({
        data: {
          msg: 'ok',
          tasks: [
            {
              _id: '678c79b86b16e90303a41d52',
              title: 'tas',
              description: '',
              userId: '66ea3fecf94fd4346cc440d9',
              categoryId: '678c79b76b16e90303a41d50',
              status: true,
              createdAt: '2025-01-19T04:04:08.106Z',
              updatedAt: '2025-01-23T21:54:49.685Z',
              __v: 0,
            },
            {
              _id: '678f1fc969a917eff2a6c951',
              title: 'ss',
              description: '',
              userId: '66ea3fecf94fd4346cc440d9',
              categoryId: '678c79b76b16e90303a41d50',
              status: true,
              createdAt: '2025-01-21T04:17:13.266Z',
              updatedAt: '2025-01-22T00:38:54.171Z',
              __v: 0,
            },
          ],
        },
      })
    })

    await act(async () => {
      useBoundStore.setState({
        categorySelected: {
          _id: '678c79b76b16e90303a41d51',
          name: 'categ45',
          color: '#D17B0F',
          icon: 'phone',
          userId: '66ea3fecf94fd4346cc440d9',
          createdAt: new Date('2025-01-19T04:04:08.000Z'),
          updatedAt: new Date('2025-01-21T01:57:37.812Z'),
          __v: 0,
          tasksLeft: 1,
        },
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

    const categoryItem = screen.getByTestId('category-item')
    fireEvent.click(categoryItem)
    const dotsOption = screen.getByTestId('dots-option')

    waitFor(() => {
      screen.debug()
      expect(dotsOption).toBeDefined()
    })
  })
})
