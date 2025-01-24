import CategoryItem from '@/components/categories/CategoryItem'
import CreateTaskInput from '../../../src/components/tasks/CreateTaskInput'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

describe('Category item test', () => {
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
    // render(<CategoryItem category={} />)

    // const svgElement = screen.getByTestId('icon-plus-disable')

    // await waitFor(() => {
    //   expect(svgElement).toBeDefined()
    // })
    
  })
})
