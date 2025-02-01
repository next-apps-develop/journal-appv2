import { SessionProvider } from 'next-auth/react'
import ModalTask from '../../../src//components/tasks/ModalTask'
import CreateTaskInput from '../../../src/components/tasks/CreateTaskInput'
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { useBoundStore } from '../../../src/app/store/useBoundStore'

vi.mock('next-auth/react', async importOriginal => {
  const actual: any = await importOriginal()
  return {
    ...actual,
    useSession: vi.fn(() => ({ data: null, status: 'unauthenticated' })),
    SessionProvider: ({ children }: any) => <div>{children}</div>,
  }
})

describe('ModalTask test', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
    vi.resetConfig()
    vi.resetModules()

    render(
      <SessionProvider>
        <ModalTask setshowModalTask={vi.fn()} showModalTask={true} />)
      </SessionProvider>
    )
  })

  afterEach(() => {
    cleanup()
  })

  test('should be render component', async () => {
    await act(async () => {
      useBoundStore.setState({
        taskSelected: {
          _id: '679e93e2c5c49f0409e27ee1',
          title: 'ss',
          description: '',
          userId: '66ea3fecf94fd4346cc440d9',
          categoryId: '678c79b76b16e90303a41d50',
          status: false,
          createdAt: new Date('2025-02-01T21:36:34.321Z'),
          updatedAt: new Date('2025-02-01T23:05:25.042Z'),
          //@ts-ignore
          __v: 0,
        },
      })
    })
    const header = screen.queryByText(/edit task/i)
    const inputTitle = screen.getByTestId('input-title-task')
    const inputDesc = screen.getByTestId('input-description-task')

    screen.debug()
    expect(header).not.toBeNull()
    expect(inputTitle).toBeDefined()
    expect(inputDesc).toBeDefined()
  })
})
