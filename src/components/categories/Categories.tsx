import { Category } from '@/app/interfaces/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import './index.css'
import { FiHome, FiBook, FiMail, FiPhone, FiFolder } from 'react-icons/fi'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { ListBox } from 'primereact/listbox'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Dialog } from 'primereact/dialog'
import StepNameCategory from '../category/StepNameCategory'
import { areObjectsEqual } from '@/helpers'
import { useBoundStore } from '@/app/store/useBoundStore'

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

  // categories without uncategorized category
  const [categoriesAux, setcategoriesAux] = useState<Category[]>([])

  const { data: session } = useSession()
  const {
    fetchCategories,
    fetchTasksByCategory,
    deleteCategory,
    chooseCategory,
    categorySelected,
    categories,
  } = useBoundStore(useShallow(state => state))

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
    setcategoriesAux(
      categories.filter(category => category.name !== 'Uncategorized')
    )

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories])

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
    <>
      {categoriesAux && categoriesAux.length > 0 && (
        <div className="categories-main-container p-[1rem] flex flex-col items-center w-full gap-4">
          {categoriesAux.map((category: Category) => (
            <div key={category._id} className="flex items-center w-full">
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
                  <div className="flex w-full icon-name-category">
                    <div className="icon-category">
                      {IconCategory(category.icon || '', category.color)}
                    </div>
                    <p className="ml-4">{category.name}</p>
                  </div>
                </div>
                {categorySelected._id === category._id && (
                  <div
                    className="flex items-center justify-center h-full px-2 py-4"
                    onClick={e => {
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
