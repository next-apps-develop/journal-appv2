import { create } from 'zustand'
import { StateCategory, useCategoryStore } from './useCategory'
import { useTasksStore, StateTasks } from './useTasks'

export const useBoundStore = create<StateCategory & StateTasks>(
  (set, get) => ({
    ...useCategoryStore(set, get),
    ...useTasksStore(set, get),
  })
)
