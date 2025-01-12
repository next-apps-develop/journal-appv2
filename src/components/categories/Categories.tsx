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
import { OverlayPanel } from 'primereact/overlaypanel'
import { Dialog } from 'primereact/dialog'
import StepNameCategory from '../category/StepNameCategory'
import { areObjectsEqual } from '@/helpers'

type ChangeCategory = {
  show: boolean
  headerTitle: string
  content: any
}
const Categories = () => {
  const ref = useRef(null)
  const op = useRef(null)

  const [showModalChangeCategory, setshowModalChangeCategory] =
    useState<ChangeCategory>({
      show: false,
      headerTitle: '',
      content: () => <></>,
    })

  const [categoriesWithoutUncategorized, setcategoriesWithoutUncategorized] =
    useState<Category[]>([])

  const { data: session } = useSession()
  const changeTasksByCategory = useTasksStore(
    useShallow(state => state.changeTasksByCategory)
  )

  const deleteCategory = useCategoryStore(
    useShallow(state => state.deleteCategory)
  )

  const chooseCategory = useCategoryStore(
    useShallow(state => state.chooseCategory)
  )

  const fetchCategories = useCategoryStore(
    useShallow(state => state.fetchCategories)
  )

  const categorySelected = useCategoryStore(
    useShallow(state => state.categorySelected)
  )

  const categories = useCategoryStore(useShallow(state => state.categories))

  useEffect(() => {
    const getCategories = async () => {
      await fetchCategories(session)
    }
    if (session) {
      getCategories()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  useEffect(() => {
    setcategoriesWithoutUncategorized(
      categories.filter(category => category.name !== 'Uncategorized')
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories])

  const handleClickCategory = (category?: Category) => {
    console.log({ category })
    console.log({ categorySelected })
    if (category) {
      if (areObjectsEqual(category, categorySelected)) {
        console.log('pasa11', categories)
        const categoryUncategorized = categories.find(
          category => category.name === 'Uncategorized'
        )
        if (categoryUncategorized) {
          console.log('pasa2')
          changeTasksByCategory(categoryUncategorized._id || '', session)
          chooseCategory(categoryUncategorized)
        }
      } else {
        changeTasksByCategory(category._id || '', session)
        chooseCategory(category)
      }

      return
    }
    // changeTasksByCategory('uncategorized', session)
    // chooseCategory({})
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
  const options = [
    { name: 'Delete category', code: 'deleteCategory' },
    { name: 'Change name', code: 'changeName' },
    { name: 'Change color', code: 'changeColor' },
    { name: 'Change icon', code: 'changeIcon' },
  ]

  const optionsTemplate = (option: any) => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="mr-4">{option.name}</div>
      </div>
    )
  }

  const handleChangeOptions = (e: any, idCategory: any) => {
    switch (e.value.code) {
      case 'deleteCategory':
        deleteCategory(session, idCategory)
        //@ts-ignore
        op.current.toggle(e)
        break

      case 'changeName':
        setshowModalChangeCategory({
          show: true,
          headerTitle: 'Change name category',
          content: () => <StepNameCategory />,
        })
        break
      case 'changeColor':
        break
      case 'changeIcon':
        break

      default:
        break
    }
  }
  console.log({ categorySelected })
  return (
    <>
      {categoriesWithoutUncategorized &&
        categoriesWithoutUncategorized.length > 0 && (
          <div className="categories-main-container p-[1rem]">
            <div className="categories-container">
              {categoriesWithoutUncategorized
                .filter(category => category.name !== 'Uncategorized')
                .map((category: Category) => (
                  <div key={category._id} className="flex items-center w-full">
                    <div
                      className={`category-item-container flex w-full justify-start items-center
                         bg-white rounded-lg h-full shadow-md ${
                        categorySelected._id === category._id &&
                        categorySelected.name !== 'Uncategorized'
                          ? 'active'
                          : ''
                      }`}
                    >
                      <div
                        className={`category-item flex items-start justify-between  w-full p-4 `}
                        onClick={() => {
                          handleClickCategory(category)
                        }}
                      >
                        <div className="icon-name-category flex w-full">
                          <div className="icon-category">
                            {IconCategory(category.icon || '', category.color)}
                          </div>
                          <p className="ml-4">{category.name}</p>
                        </div>
                      </div>
                      {categorySelected._id === category._id && (
                        <div
                          className="h-full flex py-4 px-2"
                          onClick={e => {
                            //@ts-ignore
                            op.current.toggle(e)
                          }}
                        >
                          <div>
                            <HiOutlineDotsVertical />
                          </div>
                        </div>
                      )}
                    </div>
                    <OverlayPanel ref={op}>
                      <div className="" ref={ref}>
                        <div className="flex justify-content-center">
                          <ListBox
                            options={options}
                            optionLabel="name"
                            itemTemplate={optionsTemplate}
                            className="w-full md:w-14rem"
                            listStyle={{ maxHeight: '250px' }}
                            onChange={e =>
                              handleChangeOptions(e, categorySelected._id)
                            }
                          />
                        </div>
                      </div>
                    </OverlayPanel>
                  </div>
                ))}
            </div>
          </div>
        )}

      <Dialog
        header={showModalChangeCategory.headerTitle}
        visible={showModalChangeCategory.show}
        style={{ width: '50vw' }}
        onHide={() =>
          setshowModalChangeCategory({
            show: false,
            content: () => <></>,
            headerTitle: '',
          })
        }
        draggable={false}
        resizable={false}
        className="modal-category !w-[80%] sm:max-w-[450px]"
      >
        {showModalChangeCategory.content()}
      </Dialog>
    </>
  )
}

export default Categories
