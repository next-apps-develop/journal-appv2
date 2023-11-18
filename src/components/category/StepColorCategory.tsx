import { useCategoryStore } from '@/app/store/useCategory'
import React, { useEffect, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
interface Color {
  code: string
  selected: boolean
}
const StepColorCategory = () => {
  const setNewCategory = useCategoryStore((state) => state.setNewCategory)
  const newCategoryState = useCategoryStore((state) => state.newCategoryState)

  const [colors, setcolors] = useState<Color[]>([
    { code: '#ADBCA5', selected: false },
    { code: '#2892D7', selected: false },
    { code: '#D33F49', selected: false },
    { code: '#D17B0F', selected: false },
    { code: '#FF9F1C', selected: false },
    { code: '#34623F', selected: false }
  ])

  const [colorSelected, setcolorSelected] = useState<Color>({
    code: '',
    selected: false
  })

  console.log({ newCategoryState })
  return (
    <div className='mt-4'>
      <label htmlFor='name' className='text-white '>
        Color
      </label>

      <div className='colors-container flex justify-between'>
        {colors.map((color, index) => (
          <div className='color-item m-4 relative' key={index}>
            <div
              className={`h-24 w-16 rounded-lg cursor-pointer`}
              style={{ backgroundColor: color.code }}
              onClick={() => {
                setcolors((colorsPrev) =>
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
            ></div>
            {color.selected && (
              <div
                className='color-selected-icon absolute top-0  left-0 m-auto 
            flex justify-center items-center h-full w-full
            
            '
              >
                <div className='icon'>
                  <FiCheck className='text-white text-3xl' />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default StepColorCategory
