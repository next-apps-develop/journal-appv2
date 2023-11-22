import { Category } from '@/app/interfaces/types'
import { useCategoryStore } from '@/app/store/useCategory'
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import './index.css'
import { useTasksStore } from '@/app/store/useTasks'
const Categories = () => {
  const { data: session } = useSession()
  const changeTasksByCategory = useTasksStore(
    useShallow((state) => state.changeTasksByCategory)
  )

  const fetchCategories = useCategoryStore(
    useShallow((state) => state.fetchCategories)
  )

  const categories = useCategoryStore(useShallow((state) => state.categories))
  useEffect(() => {
    const getCategories = async () => {
      await fetchCategories(session)
    }
    if (session) {
      getCategories()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const handleClickCategory = (categoryId: string) => {
    changeTasksByCategory(categoryId || '', session)
  }

  return (
    <div>
      {categories && categories.length > 0 && (
        <div className='categories-container'>
          {categories.map((category: Category) => (
            <div
              className='category-item'
              key={category._id}
              onClick={() => handleClickCategory(category._id || '')}
            >
              <p>{category.name}</p>
            </div>
          ))}
          <div
            className='category-item'
            onClick={() => handleClickCategory('uncategorized')}
          >
            <p>Uncategorized</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories
