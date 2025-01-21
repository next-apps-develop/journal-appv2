import { ICategoryFront } from '../interfaces/IFront'
import { journalAPI } from '../utils/axiosConfig'
export interface StateCategory {
  categories: ICategoryFront[]
  categorySelected: ICategoryFront
  newCategoryState: ICategoryFront
  setNewCategory: (category: ICategoryFront) => void
  isNextStepEnable: boolean
  createCategory: (category: ICategoryFront, session: any) => Promise<void>
  fetchCategories: (session: any) => Promise<void>
  chooseCategory: (category: ICategoryFront) => Promise<void>
  deleteCategory: (session: any, id: number) => void
  updateCategory: (session: any, id: string, category: ICategoryFront) => void
}

export const useCategoryStore = (
  set: (state: Partial<StateCategory>) => void,
  get: () => StateCategory
) => {
  return {
    categories: [],
    categorySelected: null,
    newCategoryState: { name: '', color: 'aaa' },
    setNewCategory: (category: ICategoryFront) => {
      // TODO Consultar anidamiento
      set({ newCategoryState: { ...category } })
    },
    isNextStepEnable: false,
    createCategory: async (category: ICategoryFront, session: any) => {
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

    chooseCategory: async (category: ICategoryFront) => {
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
    updateCategory: async (session: any, id: string, category: ICategoryFront) => {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const { createdAt, tasksLeft, updatedAt, __v, _id, ...categoryAux } = category
      const res = await journalAPI.put(
        `/category/${id}`,
        categoryAux,

        {
          headers: { Authorization: session?.user.token || '' },
        }
      )
      if (res.data) {
        const { categories } = get()
        set({
          categories: categories.map(category => {
            if (category._id === id) {
              return res.data.category
            }
            return category
          }),
        })
      }
    },
  }
}
