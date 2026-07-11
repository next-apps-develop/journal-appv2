import React, { useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import 'swiper/css'
import ButtonGeneral from '../ButtonGeneral'
import StepColorCategory from './StepColorCategory'
import StepIconCategory from './StepIconCategory'
import StepTasks from './StepTasks'
import { useSession } from 'next-auth/react'
import { useShallow } from 'zustand/react/shallow'
import StepNameCategory from './StepNameCategory'
import { Button } from 'primereact/button'
import { useBoundStore } from '@/app/store/useBoundStore'
import { ICategoryFront, ITaskFront } from '@/app/interfaces/IFront'

type ModalNewCategoryProps = {
  setshowModalNewCategory: any
}

const ModalNewCategory = ({
  setshowModalNewCategory,
}: ModalNewCategoryProps) => {
  const { data: session } = useSession()
  const [heightStep, setheightStep] = useState(0)

  const { newCategoryState, createCategory, setNewCategory } = useBoundStore(
    useShallow(state => state)
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
    let listTasks: Array<ITaskFront> = []
    // @ts-ignore
    let payload: ICategoryFront = { ...newCategoryState, userId: session?.user?._id }
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

    setNewCategory({ name: '', color: '', icon: '' })
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
      >
        <Swiper
          spaceBetween={100}
          slidesPerView={1}
          onSlideChange={e => {
            console.log({ e })
            setTimeout(() => {
              const element: any = document.querySelector(
                '.swiper-slide-active'
              )

              setheightStep(element.offsetHeight)
            }, 500)
          }}
          onSwiper={swiper1 => {
            console.log({ swiper1 })
          }}
          allowTouchMove={false}
        >
          <SwiperSlide key={'1'}>
            <StepNameCategory />
            <div className="flex justify-between items-center buttons-section mt-[180px]">
              <Button
                link
                onClick={() => {
                  setshowModalNewCategory(false)
                  setNewCategory({ name: '', color: '', icon: '' })
                }}
                className="px-4 py-2 mt-4"
              >
                Cancel
              </Button>
              <SwiperButtonNext>
                <button
                  className={`px-4 py-2 border-solid  border-white
                    rounded-md  uppercase text-base font-medium  m-auto 
                    flex justify-between items-center bg-blue-500 text-white
                  
                    ${newCategoryState.name === '' ? 'bg-gray-400' : ''}
                    `}
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
            <div className="flex justify-between mt-8 buttons-section">
              <SwiperButtonPrev>
                <Button link className="px-4 py-2 mr-4">
                  <FaChevronLeft className="mr-2" />
                  Back
                </Button>
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
                  className="text-white"
                />
              </SwiperButtonNext>
            </div>
          </SwiperSlide>

          <SwiperSlide key={'3'}>
            <StepIconCategory />
            <div className="flex justify-between mt-8 buttons-section">
              <SwiperButtonPrev>
                <Button link className="px-4 py-2 mr-4">
                  <FaChevronLeft className="mr-2" />
                  Back
                </Button>
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
                  className="text-white"
                />
              </SwiperButtonNext>
            </div>
          </SwiperSlide>

          <SwiperSlide key={'4'}>
            <h2 className="mt-4 text-white">Agregue una tarea</h2>
            <StepTasks />
            <div className="mt-[100px] flex justify-between items-center">
              <SwiperButtonPrev>
                <Button link className="px-4 py-2 mr-4">
                  <FaChevronLeft className="mr-2" />
                  Back
                </Button>
              </SwiperButtonPrev>
              <ButtonGeneral
                text="Finish"
                handleClick={handleSaveNewCategory}
                disabled={
                  newCategoryState?.tasks?.length === 0 ||
                  newCategoryState?.tasks === undefined
                }
                className="text-white"
                severity='info'
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  )
}

export default ModalNewCategory
