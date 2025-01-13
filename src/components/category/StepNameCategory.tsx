import { useBoundStore } from '@/app/store/useBoundStore'
import { InputText } from 'primereact/inputtext'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'

const StepNameCategory = () => {
  const { setNewCategory, newCategoryState } = useBoundStore(
    useShallow(state => state)
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
