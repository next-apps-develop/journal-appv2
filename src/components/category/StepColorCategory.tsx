import { useCategoryStore } from '@/app/store/useCategory'
import React, { useEffect, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'
interface Color {
  code: string
  selected: boolean
}
const StepColorCategory = () => {
  const setNewCategory = useCategoryStore(
    useShallow(state => state.setNewCategory)
  )
  const newCategoryState = useCategoryStore(
    useShallow(state => state.newCategoryState)
  )

  const [colors, setcolors] = useState<Color[]>([
    { code: '#ADBCA5', selected: false },
    { code: '#2892D7', selected: false },
    { code: '#D33F49', selected: false },
    { code: '#D17B0F', selected: false },
    { code: '#FF9F1C', selected: false },
    { code: '#34623F', selected: false },
  ])

  
  
  return (
    <div className="mt-4">
      <label htmlFor="name" className="text-white ">
        Color
      </label>

      <div className="colors-container flex flex-wrap  justify-between w-full">
        {colors.map((color, index) => (
          <div className="flex w-1/2 sm:w-1/3 justify-center items-center mt-4" key={index}>
            <div
              className={`h-24 rounded-lg w-16 cursor-pointer`}
              style={{ backgroundColor: color.code }}
              onClick={() => {
                setcolors(colorsPrev =>
                  colorsPrev.map((colorPrev: Color) => {
                    if (colorPrev.code === color.code) {
                      return { ...colorPrev, selected: true }
                    }
                    return { ...colorPrev, selected: false }
                  })
                )
                setNewCategory({ ...newCategoryState, color: color.code })
                // setNewCategory()
                // setcolorSelected(color)
              }}
            >
              {color.selected && (
                <div
                  className="color-selected-icon  top-0  left-0 m-auto 
                  flex justify-center items-center h-full w-full"
                >
                  <div className="icon">
                    <FiCheck className="text-white text-3xl" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepColorCategory
