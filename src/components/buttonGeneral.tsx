import React from 'react'

const ButtonGeneral = ({
  text,
  handleClick,
  type
}: {
  text: string
  handleClick?: any
  type?: string
}) => {
  return (
    <div>
      <button
        className='px-4 py-2 border-solid border-2 border-white
    rounded-lg bg-primary text-white uppercase text-base font-medium block m-auto
    mt-4
    '
        onClick={() => (handleClick ? handleClick() : null)}
        type={type as any}
      >
        {text}
      </button>
    </div>
  )
}

export default ButtonGeneral
