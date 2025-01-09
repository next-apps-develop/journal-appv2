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
  deleteCategory: (session: any, id: number) => void
}

export const useCategoryStore = create<State>((set, get) => {
  return {
    categories: [],
    categorySelected: {},
    newCategoryState: { name: '', color: 'aaa' },
    setNewCategory: category => {
      // TODO Consultar anidamiento
      set({ newCategoryState: { ...category } })
    },
    isNextStepEnable: false,
    createCategory: async (category: Category, session) => {
      const res = await journalAPI.post(`/category`, category, {
        headers: {
          Authorization: session?.user.token || '',
        },
      })
      const { categories } = get()

      if (res.data) {
        set({
          categories: [...categories, res.data.category],
        })
      }
    },
    fetchCategories: async session => {
      const res = await journalAPI.get(`/category`, {
        headers: {
          Authorization: session?.user.token || '',
        },
      })

      if (res.data && res.data.categories) {
        set({
          categories: res.data.categories,
        })
      }
    },

    chooseCategory: (category: Category) => {
      set({
        categorySelected: Object.keys(category).length > 0 ? category : {},
      })
    },
    deleteCategory: async (session, id: any) => {
      const res = await journalAPI.delete(`/category/${id}`, {
        headers: {
          Authorization: session?.user.token || '',
        },
      })

      if (res.data) {
        const { categories } = get()
        set({
          categories: categories.filter(category => category._id !== id),
        })
      }
    },
  }
})
