import CreateTaskInput from '../../../src/components/tasks/CreateTaskInput'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

describe('Create Task test', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
    vi.resetConfig()
    vi.resetModules()
  })

  afterEach(() => {
    vi.resetAllMocks()
    vi.clearAllMocks()
    vi.resetConfig()
    vi.resetModules()
    cleanup()
  })

  test('should be disable icon when text title task is void', async () => {
    render(<CreateTaskInput handleChangeTitle={vi.fn()} handleClickAdd={vi.fn()} titleTask="" />)

    const svgElement = screen.getByTestId('icon-plus-disable')

    await waitFor(() => {
      expect(svgElement).toBeDefined()
    })
  })

  test('should be render component', async () => {
    render(<CreateTaskInput handleChangeTitle={vi.fn()} handleClickAdd={vi.fn()} titleTask="ss" />)

    const inputEmail = screen.getByPlaceholderText('Add new task')
    fireEvent.change(inputEmail, { target: { value: 'sss' } })

    const svgElement = screen.getByTestId('icon-plus-enable')
    await waitFor(() => {
      expect(svgElement).toBeDefined()
    })
  })

  test('should be call handleChangeTitle', async () => {
    const handleChangeTitleMock = vi.fn()
    render(
      <CreateTaskInput
        handleChangeTitle={handleChangeTitleMock}
        handleClickAdd={vi.fn()}
        titleTask="sss"
      />
    )

    const inputEmail = screen.getByPlaceholderText('Add new task')
    fireEvent.change(inputEmail, { target: { value: 'saa' } })

    await waitFor(() => {
      expect(handleChangeTitleMock).toHaveBeenCalled()
    })
  })

  test('should be call handleClickAdd', async () => {
    const handleClickAddMock = vi.fn()
    render(
      <CreateTaskInput
        handleChangeTitle={vi.fn()}
        handleClickAdd={handleClickAddMock}
        titleTask="sss"
      />
    )

    const plusIcon = screen.getByTestId('icon-plus-enable')
    fireEvent.click(plusIcon)

    await waitFor(() => {
      expect(handleClickAddMock).toHaveBeenCalled()
    })
  })
})
