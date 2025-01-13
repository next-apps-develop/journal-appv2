import { Category } from '../interfaces/types'
import { journalAPI } from '../utils/axiosConfig'
export interface StateCategory {
  categories: Category[]
  categorySelected: Category
  newCategoryState: Category
  setNewCategory: (category: Category) => void
  isNextStepEnable: boolean
  createCategory: (category: Category, session: any) => Promise<void>
  fetchCategories: (session: any) => Promise<void>
  chooseCategory: (category: Category) => Promise<void>
  deleteCategory: (session: any, id: number) => void
}

export const useCategoryStore = (
  set: (state: Partial<StateCategory>) => void,
  get: () => StateCategory
) => {
  return {
    categories: [],
    categorySelected: {},
    newCategoryState: { name: '', color: 'aaa' },
    setNewCategory: (category: Category) => {
      // TODO Consultar anidamiento
      set({ newCategoryState: { ...category } })
    },
    isNextStepEnable: false,
    createCategory: async (category: Category, session: any) => {
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
    fetchCategories: async (session: any) => {
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

    chooseCategory: async (category: Category) => {
      set({
        categorySelected: Object.keys(category).length > 0 ? category : {},
      })
    },
    deleteCategory: async (session: any, id: any) => {
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
}
