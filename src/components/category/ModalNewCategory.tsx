import React, { useState } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { InputText } from 'primereact/inputtext'
import 'swiper/css'
import ButtonGeneral from '../ButtonGeneral'
import StepColorCategory from './StepColorCategory'
import StepIconCategory from './StepIconCategory'
import CreateTaskInput from '../tasks/CreateTaskInput'
import { useTask } from '@/hooks/useTask'

const ModalNewCategory = () => {
  const [nameCategory, setnameCategory] = useState('')
  const [activeIndex, setactiveIndex] = useState(0)
  const {
    handleChangeTitle,
    titleTask,
    handleClickAddTaskCategory,
    tasksFromCategory
  } = useTask()

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

  console.log({ titleTask })
  console.log({ tasksFromCategory })

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
          <SwiperSlide key={'1'}>{stepNameCategory()}</SwiperSlide>
          <SwiperSlide key={'2'}>
            <StepColorCategory />
          </SwiperSlide>

          <SwiperSlide key={'3'}>
            <StepIconCategory />
          </SwiperSlide>

          <SwiperSlide key={'4'}>
            <div className='input-container mt-4 relative flex'>
              <CreateTaskInput
                handleChangeTitle={handleChangeTitle}
                titleTask={titleTask}
                handleClickAdd={handleClickAddTaskCategory}
              />
            </div>
          </SwiperSlide>

          <div
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
                />
              </SwiperButtonNext>
            )}

            {activeIndex === 3 && (
              <div className='mt-4'>
                <ButtonGeneral text='Finish' />
              </div>
            )}
          </div>
        </Swiper>
      </div>
      <div className='info-container-project m-8'>
        <div className='title'>
          {/* <h2 className='main-title'>{selectedProject?.info?.mainTitle}</h2>
          <h3 className='secondary-title'>
            {selectedProject?.info?.secondaryTitle}
          </h3> */}
        </div>
      </div>
    </>
  )
}

export default ModalNewCategory
