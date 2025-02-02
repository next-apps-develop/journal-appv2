'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    // defaultValues: {
    //   fullName: 'Henry',
    //   email: 'henry@gmail.com'
    // }
  })
  const onSubmit = handleSubmit((data) => {
    // console.log('first', data)
  })

  // console.log({ errors })
  return (
    <div className='flex justify-center w-full'>
      <form action='' onSubmit={onSubmit} className='w-1/3' autoComplete='off'>
        <h1 className='text-4xl text-center'>Sign up</h1>
        <label htmlFor='fullName'>Name</label>
        <input
          type='text'
          placeholder='Jhon Doe'
          autoComplete='off'
          // name='fullName'
          className='block w-full px-4 py-2 mb-2 text-white bg-zinc-800'
          {...register('fullName', {
            required: {
              value: true,
              message: 'Name is required'
            },
            minLength: {
              value: 3,
              message: 'Name must be at least 3 characters'
            },
            maxLength: {
              value: 20,
              message: 'Name must have maximun 30 characters'
            }
          })}
        />
        {errors.fullName && (
          // @ts-ignore
          <span className='block text-red-400'>{errors.fullName?.message}</span>
        )}
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          placeholder='someemail@gmail.com'
          className='block w-full px-4 py-2 mb-2 text-white bg-zinc-800'
          autoComplete='nope'
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required'
            },
            pattern: {
              value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              message: 'email is not valid'
            }
          })}
        />
        {errors.email && (
          // @ts-ignore
          <span className='block text-red-400'>{errors.email?.message}</span>
        )}
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          placeholder='*****'
          className='block w-full px-4 py-2 mb-2 text-white bg-zinc-800'
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required'
            },
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characers'
            }
          })}
          autoComplete='new-password'
        />
        {errors.password && (
          // @ts-ignore
          <span className='block text-red-400'>{errors.password?.message}</span>
        )}
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          placeholder='*****'
          className='block w-full px-4 py-2 mb-2 text-white bg-zinc-800'
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirm password is required'
            },
            minLength: {
              value: 6,
              message: 'Confirm password must be at least 6 characers'
            },
            validate: (value) => {
              return value === watch('password') || 'The passwords not match'
            }
          })}
        />
        {errors.confirmPassword && (
          <span className='block text-red-400'>
            {/* @ts-ignore */}
            {errors.confirmPassword?.message}
          </span>
        )}
        <label htmlFor='birdthDate'>Birdth date</label>
        <input
          type='date'
          className='block w-full px-4 py-2 mb-2 text-white bg-zinc-800'
          {...register('birdthDate', {
            required: {
              value: true,
              message: 'Birdth date is requierd'
            },
            validate: (value) => {
              const birdthDate = new Date(value)
              const currentDate = new Date()

              const age = currentDate.getFullYear() - birdthDate.getFullYear()
              if (age >= 18) {
                return true
              } else {
                return 'You must be older than 18 years'
              }
            }
          })}
        />

        {errors.birdthDate && (
          <span className='block text-red-400'>
            {/* @ts-ignore */}
            {errors.birdthDate?.message}
          </span>
        )}

        <label htmlFor='country'>Country</label>
        <select className='w-full' {...register('country')}>
          <option value='mx'>Mexico</option>
          <option value='co'>Colombia</option>
          <option value='ar'>Argentina</option>
        </select>
        {watch('country') === 'ar' && (
          <>
            <input
              type='text'
              placeholder='Province'
              {...register('province', {
                required: {
                  value: true,
                  message: 'Province is required'
                }
              })}
              className='block w-full px-4 py-2 mb-2 text-white bg-zinc-800'
            />

            {errors.province && (
              <span className='block text-red-400'>
                {/* @ts-ignore */}
                {errors.province?.message}
              </span>
            )}
          </>
        )}
        <label htmlFor='photo' className='w-full'>
          Photo
        </label>
        {/* <input type='file' className='w-full mb-3' {...register('photo')} /> */}
        <input
          type='file'
          className='w-full mb-3'
          onChange={(e) => {
            // @ts-ignore
            // console.log(e.target?.files[0] || 'a')
            // @ts-ignore
            setValue('photoUser', e.target?.files[0].name || '')
          }}
        />
        <label htmlFor='terms'>Aceptar terminos y condiciones</label>
        <input
          type='checkbox'
          {...register('terms', {
            required: {
              value: true,
              message: 'You have to accept terms and conditions'
            }
          })}
        />
        {errors.terms && (
          <span className='block text-red-400'>
            {/* @ts-ignore */}
            {errors.terms?.message}
          </span>
        )}
        <button className='w-full px-4 py-2 mt-3 bg-indigo-500'>
          Register
        </button>
        <pre>{JSON.stringify(watch(), null, 2)}</pre>
      </form>
    </div>
  )
}

export default RegisterPage
