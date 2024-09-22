import { useCategoryStore } from '@/app/store/useCategory'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'

const StepNameCategory = () => {
  const setNewCategory = useCategoryStore(
    useShallow(state => state.setNewCategory)
  )
  const newCategoryState = useCategoryStore(
    useShallow(state => state.newCategoryState)
  )
  return (
    <div className="mt-4">
      <label htmlFor="name" className="text-sm">
        Name Category
      </label>
      <InputText
        value={newCategoryState.name}
        onChange={e => {
          setNewCategory({ name: e.target.value })
        }}
        placeholder="Name category"
        className=""
        id="name"
      />
    </div>
  )
}

export default StepNameCategory
