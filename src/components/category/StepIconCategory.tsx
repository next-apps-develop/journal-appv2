import React, { useEffect, useState } from 'react'
import { IconType } from 'react-icons'
import { FiHome, FiBook, FiMail, FiPhone, FiFolder } from 'react-icons/fi'
const SteIconCategory = () => {
  interface Icon {
    code: any
    selected: boolean
  }

  const [icons, seticons] = useState<Icon[]>([
    { code: <FiFolder />, selected: false },
    { code: <FiMail />, selected: false },
    { code: <FiPhone />, selected: false },
    { code: <FiBook />, selected: false },
    { code: <FiHome />, selected: false }
  ])

  const [iconSelected, seticonSelected] = useState<Icon>({
    code: '',
    selected: false
  })

  // useEffect(()=>{

  // }, [colors])
  console.log({ colors: icons })
  return (
    <div className='mt-4'>
      <label htmlFor='name' className='text-white '>
        Color
      </label>

      <div className='colors-container flex justify-between'>
        {icons.map((icon, index) => (
          <div className='color-item m-4' key={index}>
            <div
              className={`bg-gray-300 h-24 w-16 rounded-lg cursor-pointer
              flex justify-center items-center text-xl
              `}
              onClick={() => {
                // seticons((colorsPrev) =>
                //   colorsPrev.map((colorPrev: Icon) => {
                //     if (colorPrev.code === icon.code) {
                //       return { ...colorPrev, selected: true }
                //     }
                //     return { ...colorPrev, selected: false }
                //   })
                // )
                // seticonSelected(icon)
              }}
            >
                {icon.code}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SteIconCategory
