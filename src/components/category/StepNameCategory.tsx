import { useBoundStore } from '../../app/store/useBoundStore'
import { InputText } from 'primereact/inputtext'
import React, { useEffect, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import ButtonGeneral from '../ButtonGeneral'
import { useSession } from 'next-auth/react'
import { ChangeCategory } from '../categories/Categories'

type StepNameCategoryProps = {
  isFormSubmit?: boolean
  setshowModalChangeCategory?: any
}

const StepNameCategory = ({ isFormSubmit, setshowModalChangeCategory }: StepNameCategoryProps) => {
  const { setNewCategory, newCategoryState, updateCategory, categorySelected } = useBoundStore(
    useShallow(state => state)
  )

  const { data: session } = useSession()
  const handleUpdateName = () => {
    if (categorySelected) {
      updateCategory(session, categorySelected._id as string, {
        ...categorySelected,
        name: newCategoryState.name,
      })
      setshowModalChangeCategory((prev: ChangeCategory) => ({ ...prev, show: false }))
    }
  }

  useEffect(() => {
    if (isFormSubmit && categorySelected) {
      setNewCategory({ name: categorySelected.name })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFormSubmit, categorySelected])

  const renderContentStepNameCategory = () => {
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
        {isFormSubmit && (
          <div className="mt-8 flex w-full justify-end ">
            <ButtonGeneral
              text="Submmit"
              severity="info"
              className="text-white"
              handleClick={handleUpdateName}
            />
          </div>
        )}
      </div>
    )
  }

  return renderContentStepNameCategory()
}

export default StepNameCategory
