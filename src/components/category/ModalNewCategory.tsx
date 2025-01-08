import React, { useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import 'swiper/css'
import ButtonGeneral from '../ButtonGeneral'
import StepColorCategory from './StepColorCategory'
import StepIconCategory from './StepIconCategory'
import { useCategoryStore } from '@/app/store/useCategory'
import StepTasks from './StepTasks'
import { useSession } from 'next-auth/react'
import { Category, Task } from '@/app/interfaces/types'
import { useShallow } from 'zustand/react/shallow'
import StepNameCategory from './StepNameCategory'

type ModalNewCategoryProps = {
  setshowModalNewCategory: any
}

const ModalNewCategory = ({
  setshowModalNewCategory,
}: ModalNewCategoryProps) => {
  const { data: session } = useSession()
  const [heightStep, setheightStep] = useState(0)

  const newCategoryState = useCategoryStore(
    useShallow(state => state.newCategoryState)
  )

  const createCategory = useCategoryStore(
    useShallow(state => state.createCategory)
  )

  const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper()
    return (
      <div
        onClick={() => {
          swiper.slideNext()
        }}
        className="mt-4"
      >
        {children}
      </div>
    )
  }

  const SwiperButtonPrev = ({ children }: any) => {
    const swiper = useSwiper()
    return (
      <div onClick={() => swiper.slidePrev()} className="mt-4">
        {children}
      </div>
    )
  }

  const handleSaveNewCategory = async () => {
    let listTasks: Array<Task> = []
    // @ts-ignore
    let payload: Category = { ...newCategoryState, userId: session?.user?._id }
    if (newCategoryState.tasks && newCategoryState.tasks.length > 0) {
      listTasks = newCategoryState.tasks
      payload = {
        ...newCategoryState,
        // @ts-ignore
        userId: session?.user?._id,
        tasks: listTasks,
      }
    }
    await createCategory(payload, session)
    setshowModalNewCategory(false)
  }

  // useEffect(() => {
  //   const element: any = document.querySelector('.swiper-slide-active')
  //   if (element) {
  //     console.log(element.offsetHeight)
  //     setheightStep(element.offsetHeight)
  //     setHeight(element.offsetHeight); // Get the height of the element
  //   }
  // }, [])

  return (
    <>
      <div
        className={`steps-new-category-container h-[${heightStep}px] overflow-hidden`}
        // style={{ height: `${heightStep}px` }}
      >
        <Swiper
          spaceBetween={100}
          slidesPerView={1}
          // style={{ height: `${heightStep}px` }}
          onSlideChange={e => {
            console.log({ e })
            setTimeout(() => {
              const element: any = document.querySelector(
                '.swiper-slide-active'
              )
              console.log(element.offsetHeight)

              setheightStep(element.offsetHeight)
            }, 500)

            // setactiveIndex(e.activeIndex)
          }}
          onSwiper={swiper1 => {
            console.log({ swiper1 })
          }}
        >
          <SwiperSlide key={'1'}>
            {/* {stepNameCategory()} */}
            <StepNameCategory />
            <div className="flex justify-end buttons-section">
              <SwiperButtonNext>
                {/* <ButtonGeneral
                  text="Next"
                  icon={<FaChevronRight />}
                  severity="info"
                  disabled={newCategoryState.name === ''}
                /> */}

                <button
                  className={`px-4 py-2 border-solid  border-white
                    rounded-md  uppercase text-base font-medium  m-auto 
                    flex justify-between items-center bg-blue-500
                  
                    ${newCategoryState.name === '' ? 'bg-gray-400' : ''}
                    `}
                  // onClick={() => (handleClick ? handleClick() : null)}
                  // type={type as any}
                  disabled={newCategoryState.name === ''}
                >
                  <FaChevronRight />
                  Next
                </button>
              </SwiperButtonNext>
            </div>
          </SwiperSlide>
          <SwiperSlide key={'2'}>
            <StepColorCategory />
            <div className="flex justify-between buttons-section">
              <SwiperButtonPrev>
                <ButtonGeneral
                  text="Back"
                  icon={<FaChevronLeft />}
                  severity="warning"
                />
              </SwiperButtonPrev>
              <SwiperButtonNext>
                <ButtonGeneral
                  text="Next"
                  icon={<FaChevronRight />}
                  severity="info"
                  disabled={
                    newCategoryState.color && newCategoryState.color !== ''
                      ? false
                      : true
                  }
                />
              </SwiperButtonNext>
            </div>
          </SwiperSlide>

          <SwiperSlide key={'3'}>
            <StepIconCategory />
            <div className="flex justify-between buttons-section">
              <SwiperButtonPrev>
                <ButtonGeneral
                  text="Back"
                  icon={<FaChevronLeft />}
                  severity="warning"
                />
              </SwiperButtonPrev>
              <SwiperButtonNext>
                <ButtonGeneral
                  text="Next"
                  icon={<FaChevronRight />}
                  severity="info"
                  disabled={
                    newCategoryState.icon && newCategoryState.icon !== ''
                      ? false
                      : true
                  }
                />
              </SwiperButtonNext>
            </div>
          </SwiperSlide>

          <SwiperSlide key={'4'}>
            <h2 className="mt-4 text-white">Agregue una tarea</h2>
            <StepTasks />
            <div className="mt-4">
              <ButtonGeneral
                text="Finish"
                handleClick={handleSaveNewCategory}
                disabled={newCategoryState?.tasks?.length === 0}
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}

export default ModalNewCategory
