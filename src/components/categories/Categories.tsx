import { Category } from '@/app/interfaces/types'
import { useCategoryStore } from '@/app/store/useCategory'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import './index.css'
import { useTasksStore } from '@/app/store/useTasks'
import { FiHome, FiBook, FiMail, FiPhone, FiFolder } from 'react-icons/fi'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { ListBox } from 'primereact/listbox'

const Categories = () => {
  const ref = useRef(null)

  const { data: session } = useSession()
  const [showOptionsCategory, setshowOptionsCategory] = useState(false)
  const changeTasksByCategory = useTasksStore(
    useShallow((state) => state.changeTasksByCategory)
  )

  const chooseCategory = useCategoryStore(
    useShallow((state) => state.chooseCategory)
  )

  const fetchCategories = useCategoryStore(
    useShallow((state) => state.fetchCategories)
  )

  const categorySelected = useCategoryStore(
    useShallow((state) => state.categorySelected)
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

  const handleClickCategory = (category?: Category) => {
    if (category) {
      changeTasksByCategory(category._id || '', session)
      chooseCategory(category)
      return
    }
    changeTasksByCategory('uncategorized', session)
    chooseCategory({})
  }

  const IconCategory = (iconCode: string, color?: string) => {
    switch (iconCode) {
      case 'folder':
        return <FiFolder fill={color} className='text-2xl text-gray-400' />
      case 'mail':
        return <FiMail fill={color} className='text-2xl text-gray-600' />
      case 'phone':
        return <FiPhone fill={color} className='text-2xl text-gray-600' />
      case 'book':
        return <FiBook fill={color} className='text-2xl text-gray-600' />
      case 'home':
        return <FiHome fill={color} className='text-2xl text-gray-600' />
      default:
        break
    }
    
  }
  const options = [
    { name: 'Delete category', code: 'deleteCategory' },
    { name: 'Change name', code: 'changeName' },
    { name: 'Change color', code: 'changeColor' },
    { name: 'Change icon', code: 'icon' }
  ]

  const optionsTemplate = (option: any) => {
    return (
      <div className='flex items-center w-full justify-between'>
        <div className='mr-4'>{option.name}</div>
      </div>
    )
  }

  useEffect(() => {
    const handleOutSideClick = (event: any) => {
      // console.log('entra metodo')
      // @ts-ignore
      if (!ref.current?.contains(event.target)) {
        // console.log('Outside Clicked. ')
        setshowOptionsCategory(false)
      }
    }

    window.addEventListener('mousedown', handleOutSideClick)

    return () => {
      window.removeEventListener('mousedown', handleOutSideClick)
    }
  }, [ref])

  return (
    <div>
      {categories && categories.length > 0 && (
        <div className='categories-container'>
          {categories.map((category: Category) => (
            <div
              className={`category-item flex items-center justify-between   ${
                categorySelected._id === category._id ? 'active' : ''
              }`}
              key={category._id}
              onClick={() => handleClickCategory(category)}
            >
              <div className='icon-name-category flex w-[80%]'>
                <div className='icon-category'>
                  {IconCategory(category.icon || '', category.color)}
                </div>
                <p className='ml-4'>{category.name}</p>
              </div>

              {categorySelected._id === category._id && (
                <>
                  <div
                    className='tools-category'
                    onClick={() => {
                      setshowOptionsCategory(true)
                    }}
                  >
                    <HiOutlineDotsVertical />
                  </div>

                  <div className='aux-area relative'>
                    {showOptionsCategory && (
                      <div className='absolute top-0 right-[-20px] w-[200px]' ref={ref}>
                        <div className='flex justify-content-center'>
                          <ListBox
                            // value={selectedCountry}
                            // onChange={(e) => {
                            //   handleClickSingleOption(e.value, task._id)
                            // }}
                            options={options}
                            optionLabel='name'
                            itemTemplate={optionsTemplate}
                            className='w-full md:w-14rem'
                            listStyle={{ maxHeight: '250px' }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
          {/* Space to tasks without category */}
          <div className='category-item' onClick={() => handleClickCategory()}>
            <p>Uncategorized</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Categories
