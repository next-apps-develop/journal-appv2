import { useBoundStore } from '@/app/store/useBoundStore'
import React, { useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import { useShallow } from 'zustand/react/shallow'
interface Color {
  code: string
  selected: boolean
}
const StepColorCategory = () => {
  const { setNewCategory, newCategoryState } = useBoundStore(
    useShallow(state => state)
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
      <label htmlFor="name" className="text-sm">
        Color Category
      </label>

      <div className="flex flex-wrap justify-between w-full colors-container ">
        {colors.map((color, index) => (
          <div
            className="flex items-center justify-center w-1/2 mt-4 sm:w-1/3"
            key={index}
          >
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
              }}
            >
              {color.selected && (
                <div
                  className="top-0 left-0 flex items-center justify-center w-full h-full m-auto color-selected-icon "
                >
                  <div className="icon">
                    <FiCheck className="text-3xl text-white" />
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
