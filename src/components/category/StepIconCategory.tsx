import React, { useState } from 'react'
import { FiHome, FiBook, FiMail, FiPhone, FiFolder } from 'react-icons/fi'
import './category.css'
import { useCategoryStore } from '@/app/store/useCategory'
import { useShallow } from 'zustand/react/shallow'

const SteIconCategory = () => {
  interface Icon {
    code: string
    selected: boolean
    icon: any
  }

  const [icons, seticons] = useState<Icon[]>([
    { icon: <FiFolder />, selected: false, code: 'folder' },
    { icon: <FiMail />, selected: false, code: 'mail' },
    { icon: <FiPhone />, selected: false, code: 'phone' },
    { icon: <FiBook />, selected: false, code: 'book' },
    { icon: <FiHome />, selected: false, code: 'home' }
  ])

  const setNewCategory = useCategoryStore(
    useShallow((state) => state.setNewCategory)
  )
  const newCategoryState = useCategoryStore(
    useShallow((state) => state.newCategoryState)
  )

  return (
    <div className='mt-4'>
      <label htmlFor='name' className='text-white '>
        Icon
      </label>

      <div className='icons-container flex justify-between'>
        {icons.map((iconItem, index) => (
          <div className=' m-4' key={index}>
            <div
              className={`icon-item bg-gray-300 h-24 w-16 rounded-lg cursor-pointer
              flex justify-center items-center text-xl 
              ${iconItem.selected ? 'active' : ''}
              `}
              onClick={() => {
                seticons((iconsPrev) =>
                  iconsPrev.map((icon: Icon) => {
                    if (icon.code === iconItem.code) {
                      return { ...icon, selected: true }
                    }
                    return { ...icon, selected: false }
                  })
                )
                setNewCategory({ ...newCategoryState, icon: iconItem.code })
              }}
            >
              {iconItem.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SteIconCategory
