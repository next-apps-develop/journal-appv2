import { create } from 'zustand'
import { Category } from '../interfaces/types'
import { journalAPI } from '../utils/axiosConfig'
interface State {
  categories: Category[]
  categorySelected: Category
  newCategoryState: Category
  setNewCategory: (category: Category) => void
  isNextStepEnable: boolean
  createCategory: (category: Category, session: any) => Promise<void>
}

export const useCategoryStore = create<State>((set, get) => {
  return {
    categories: [],
    categorySelected: {},
    newCategoryState: { name: '', color: 'aaa' },
    setNewCategory: (category) => {
      // TODO Consultar anidamiento
      const { newCategoryState } = get()
      set({ newCategoryState: { ...category } })
      //   set({ isNextStepEnable: category.name !== '' })
    },
    isNextStepEnable: false,
    createCategory: async (category: Category, session) => {
      console.log(category)

      const res = await journalAPI.post(`/category`, category, {
        headers: {
          Authorization: session?.user.token || ''
        }
      })
    }
  }
})
