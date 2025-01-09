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
    if (categories.length === 1) {
      chooseCategory(categories[0])
      changeTasksByCategory(categories[0]._id || '', session)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories])

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
        return <FiFolder fill={color} className="text-2xl text-gray-400" />
      case 'mail':
        return <FiMail fill={color} className="text-2xl text-gray-600" />
      case 'phone':
        return <FiPhone fill={color} className="text-2xl text-gray-600" />
      case 'book':
        return <FiBook fill={color} className="text-2xl text-gray-600" />
      case 'home':
        return <FiHome fill={color} className="text-2xl text-gray-600" />
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

  return (
    <div>
      {categories && categories.length > 0 && (
        <div className="categories-container">
          {categories.map((category: Category) => (
            <div key={category._id}>
              <div
                className={`category-item flex items-center justify-between   ${
                  categorySelected._id === category._id ? 'active' : ''
                }`}
                onClick={() => {
                  handleClickCategory(category)
                }}
              >
                <div className="icon-name-category flex w-[80%]">
                  <div className="icon-category">
                    {IconCategory(category.icon || '', category.color)}
                  </div>
                  <p className="ml-4">{category.name}</p>
                </div>

                {categorySelected._id === category._id && categorySelected.name!== 'Uncategorized'&&(
                  <>
                    <div
                      className="tools-category"
                      onClick={e => {
                        // setshowOptionsCategory(true)
                        //@ts-ignore
                        op.current.toggle(e)
                      }}
                    >
                      <HiOutlineDotsVertical />
                    </div>
                  </>
                )}
              </div>
              <OverlayPanel ref={op}>
                {/* {showOptionsCategory && ( */}
                <div className="" ref={ref}>
                  <div className="flex justify-content-center">
                    <ListBox
                      // value={selectedCountry}
                      // onChange={(e) => {
                      //   handleClickSingleOption(e.value, task._id)
                      // }}
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
                {/* )} */}
              </OverlayPanel>
            </div>
          ))}
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
    </div>
  )
}

export default Categories
