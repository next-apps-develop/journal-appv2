import { useBoundStore } from '@/app/store/useBoundStore'
import React from 'react'
import { useShallow } from 'zustand/react/shallow'
import { Category } from '@/app/interfaces/types'
import { areObjectsEqual } from '@/helpers'
import { FiBook, FiFolder, FiHome, FiMail, FiPhone } from 'react-icons/fi'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { useSession } from 'next-auth/react'

const CategoryItem = ({ category , op}: { category: Category, op: any }) => {
  const {
    categorySelected,
    categories,
    fetchTasksByCategory,
    chooseCategory,
    tasksByCategoryTodo,
  } = useBoundStore(useShallow(state => state))
  const { data: session } = useSession()

  const handleClickCategory = (category?: Category) => {
    if (category) {
      if (areObjectsEqual(category, categorySelected)) {
        const categoryUncategorized = categories.find(
          category => category.name === 'Uncategorized'
        )
        if (categoryUncategorized) {
          fetchTasksByCategory(categoryUncategorized._id || '', session)
          chooseCategory(categoryUncategorized)
        }
      } else {
        fetchTasksByCategory(category._id || '', session)
        chooseCategory(category)
      }

      return
    }
  }

  const IconCategory = (iconCode: string, color?: string) => {
    switch (iconCode) {
      case 'folder':
        return <FiFolder fill={color} className="text-2xl text-white" />
      case 'mail':
        return <FiMail fill={color} className="text-2xl text-white" />
      case 'phone':
        return <FiPhone fill={color} className="text-2xl text-white" />
      case 'book':
        return <FiBook fill={color} className="text-2xl text-white" />
      case 'home':
        return <FiHome fill={color} className="text-2xl text-white" />
      default:
        break
    }
  }
  return (
    <div
      className={`category-item-container flex w-full justify-start items-center
            bg-white rounded-lg h-full shadow-md ${
              categorySelected._id === category._id ? 'active' : ''
            }`}
    >
      <div
        className={`category-item flex items-start justify-between  w-full p-4 `}
        onClick={() => {
          handleClickCategory(category)
        }}
      >
        <div className="flex flex-col w-full">
          <div className="flex w-full icon-name-category">
            <div className="icon-category">
              {IconCategory(category.icon || '', category.color)}
            </div>
            <p className="ml-4">{category.name}</p>
          </div>
          <div className="p-4">
            <p>{tasksByCategoryTodo.length} Tasks left</p>
          </div>
        </div>
      {categorySelected._id === category._id && (
        <div
          className="flex items-center justify-center h-full "
          onClick={e => {
            e.stopPropagation()
            //@ts-ignore
            op.current.toggle(e)
          }}
        >
          <div className="p-2 bg-gray-200 border border-gray-300 rounded-full cursor-pointer">
            <HiOutlineDotsVertical />
          </div>
        </div>
      )}
      </div>
    </div>
  )
}

export default CategoryItem
