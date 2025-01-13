import { Category } from '@/app/interfaces/types'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { useShallow } from 'zustand/react/shallow'
import './index.css'
import { ListBox } from 'primereact/listbox'
import { OverlayPanel } from 'primereact/overlaypanel'
import { Dialog } from 'primereact/dialog'
import StepNameCategory from '../category/StepNameCategory'
import { useBoundStore } from '@/app/store/useBoundStore'
import CategoryItem from './CategoryItem'

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
              <CategoryItem category={category} op={op} />
              <OverlayPanel ref={op}>
                <div className="" ref={ref}>
                  <div className="flex justify-content-center">
                    <ListBox
                      options={options}
                      optionLabel="name"
                      itemTemplate={optionsTemplate}
                      className="w-full text-sm md:w-14rem"
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
