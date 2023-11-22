import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { InputText } from 'primereact/inputtext'
import 'swiper/css'
import ButtonGeneral from '../ButtonGeneral'
import StepColorCategory from './StepColorCategory'
import StepIconCategory from './StepIconCategory'
import CreateTaskInput from '../tasks/CreateTaskInput'
import { useTask } from '@/hooks/useTask'
import { useCategoryStore } from '@/app/store/useCategory'
import StepTasks from './StepTasks'
import { useSession } from 'next-auth/react'
import { Category, Task } from '@/app/interfaces/types'
import { useShallow } from 'zustand/react/shallow'

const ModalNewCategory = () => {
  const [nameCategory, setnameCategory] = useState('')
  const [activeIndex, setactiveIndex] = useState(0)
  const { data: session, status } = useSession()

  const {
    handleChangeTitle,
    titleTask,
    handleClickAddTaskCategory,
    tasksFromCategory
  } = useTask()
  const setNewCategory = useCategoryStore(useShallow((state) => state.setNewCategory))
  const newCategoryState = useCategoryStore(useShallow((state) => state.newCategoryState))
  const createCategory = useCategoryStore(useShallow((state) => state.createCategory))

  const SwiperButtonNext = ({ children }: any) => {
    const swiper = useSwiper()
    return (
      <div
        onClick={() => {
          swiper.slideNext()
        }}
        className='mt-4'
      >
        {children}
      </div>
    )
  }

  const SwiperButtonPrev = ({ children }: any) => {
    const swiper = useSwiper()
    return (
      <div onClick={() => swiper.slidePrev()} className='mt-4'>
        {children}
      </div>
    )
  }

  const stepNameCategory = () => (
    <div className='mt-4'>
      <label htmlFor='name' className='text-white '>
        Name
      </label>
      <InputText
        value={nameCategory}
        onChange={(e) => setnameCategory(e.target.value)}
        placeholder='Name category'
        className='mt-4'
        id='name'
      />
    </div>
  )

  useEffect(() => {
    setNewCategory({ name: nameCategory })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameCategory])

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
        tasks: listTasks
      }
    }
    await createCategory(payload, session)
  }

  return (
    <>
      <div className='staps-new-category-container'>
        <Swiper
          spaceBetween={100}
          slidesPerView={1}
          onSlideChange={(e) => {
            console.log({ e })
            setactiveIndex(e.activeIndex)
          }}
          onSwiper={(swiper1) => console.log({ swiper1 })}
        >
          <SwiperSlide key={'1'}>
            {stepNameCategory()}

            <div className='buttons-section flex justify-end'>
              <SwiperButtonNext>
                <ButtonGeneral
                  text='Next'
                  icon={<FaChevronRight />}
                  severity='info'
                  disabled={newCategoryState.name === ''}
                />
              </SwiperButtonNext>
            </div>
          </SwiperSlide>
          <SwiperSlide key={'2'}>
            <StepColorCategory />
            <div className='buttons-section flex justify-between'>
              <SwiperButtonPrev>
                <ButtonGeneral
                  text='Back'
                  icon={<FaChevronLeft />}
                  severity='warning'
                />
              </SwiperButtonPrev>
              <SwiperButtonNext>
                <ButtonGeneral
                  text='Next'
                  icon={<FaChevronRight />}
                  severity='info'
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
            <div className='buttons-section flex justify-between'>
              <SwiperButtonPrev>
                <ButtonGeneral
                  text='Back'
                  icon={<FaChevronLeft />}
                  severity='warning'
                />
              </SwiperButtonPrev>
              <SwiperButtonNext>
                <ButtonGeneral
                  text='Next'
                  icon={<FaChevronRight />}
                  severity='info'
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
            <StepTasks />
            <ButtonGeneral text='Finish' handleClick={handleSaveNewCategory} />
          </SwiperSlide>

          {/* <div
            className={`buttons-prev-next flex justify-between ${
              activeIndex === 0 ? '!justify-end' : ''
            }`}
          >
            {activeIndex > 0 && (
              <SwiperButtonPrev>
                <ButtonGeneral
                  text='Back'
                  icon={<FaChevronLeft />}
                  severity='warning'
                />
              </SwiperButtonPrev>
            )}

            {activeIndex < 3 && (
              <SwiperButtonNext>
                <ButtonGeneral
                  text='Next'
                  icon={<FaChevronRight />}
                  severity='info'
                  disabled={!isNextStepEnable}
                />
              </SwiperButtonNext>
            )}

            {activeIndex === 3 && (
              <div className='mt-4'>
                <ButtonGeneral text='Finish' />
              </div>
            )}
          </div> */}
        </Swiper>
      </div>
    </>
  )
}

export default ModalNewCategory
