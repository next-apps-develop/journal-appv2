import React, { useEffect, useState } from 'react'

type Severity = 'danger' | 'success' | 'warning' | 'info'

interface ButtonGeneral {
  text: string
  handleClick?: any
  type?: string
  severity?: Severity
  icon?: any
  disabled?: boolean
  className?: string
}
const ButtonGeneral = ({
  text,
  handleClick,
  type,
  severity,
  icon,
  disabled = false,
  className = '',
}: ButtonGeneral) => {
  const [colorbtn, setcolorbtn] = useState('')

  useEffect(() => {
    switch (severity) {
      case 'danger':
        setcolorbtn('bg-red-500')
        break

      case 'success':
        setcolorbtn('bg-green-cool-vivid-200')
        break

      case 'warning':
        setcolorbtn('bg-yellow-200')
        break

      case 'info':
        setcolorbtn('bg-blue-500')
        break

      default:
        setcolorbtn('bg-primary')
        break
    }
  }, [severity])

  return (
    <div>
      <button
        className={`px-4 py-2 border-solid  border-white
    rounded-md  uppercase text-base font-medium  m-auto 
    flex justify-between items-center 
   
    ${disabled ? 'bg-gray-400' : colorbtn} 
    ${className}
    `}
        onClick={() => (handleClick ? handleClick() : null)}
        type={type as any}
        disabled={disabled}
      >
        {icon}
        {text}
      </button>
    </div>
  )
}

export default ButtonGeneral
