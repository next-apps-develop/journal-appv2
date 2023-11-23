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
  fetchCategories: (session: any) => Promise<void>
  chooseCategory: (category: Category) => void
}

export const useCategoryStore = create<State>((set, get) => {
  return {
    categories: [],
    categorySelected: {},
    newCategoryState: { name: '', color: 'aaa' },
    setNewCategory: (category) => {
      // TODO Consultar anidamiento
      set({ newCategoryState: { ...category } })
    },
    isNextStepEnable: false,
    createCategory: async (category: Category, session) => {
      await journalAPI.post(`/category`, category, {
        headers: {
          Authorization: session?.user.token || ''
        }
      })
    },
    fetchCategories: async (session) => {
      const res = await journalAPI.get(`/category`, {
        headers: {
          Authorization: session?.user.token || ''
        }
      })

      if (res.data && res.data.categories) {
        set({
          categories: res.data.categories
        })
      }
    },

    chooseCategory: (category: Category) => {
      set({
        categorySelected: Object.keys(category).length > 0 ? category : {}
      })
    }
  }
})
