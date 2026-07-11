import React, { useState } from 'react'
import { FiHome, FiBook, FiMail, FiPhone, FiFolder } from 'react-icons/fi'
import './category.css'
import { useShallow } from 'zustand/react/shallow'
import { useBoundStore } from '@/app/store/useBoundStore'

const SteIconCategory = () => {
  interface Icon {
    code: string
    selected: boolean
    icon: any
  }

  const [icons, seticons] = useState<Icon[]>([
    { icon: <FiFolder className="text-white" />, selected: false, code: 'folder' },
    { icon: <FiMail className="text-white" />, selected: false, code: 'mail' },
    { icon: <FiPhone className="text-white" />, selected: false, code: 'phone' },
    { icon: <FiBook className="text-white" />, selected: false, code: 'book' },
    { icon: <FiHome className="text-white" />, selected: false, code: 'home' },
  ])

  const { setNewCategory, newCategoryState } = useBoundStore(useShallow(state => state))

  return (
    <div className="mt-4">
      <label htmlFor="name" className="text-sm">
        Icon Category
      </label>

      <div className="flex flex-wrap justify-between icons-container">
        {icons.map((iconItem, index) => (
          <div className="flex justify-center w-1/2 mt-4 sm:w-1/3" key={index}>
            <div
              className={`icon-item bg-gray-300 h-24 w-16 rounded-lg cursor-pointer
              flex justify-center items-center text-xl 
              ${iconItem.selected ? 'active' : ''}
              `}
              onClick={() => {
                seticons(iconsPrev =>
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
