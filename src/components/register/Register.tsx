'use client'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import ButtonGeneral from '../ButtonGeneral'

const RegisterComponent = () => {
  const [error, seterror] = useState(null)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    // defaultValues: {
    //   fullName: 'Henry',
    //   email: 'henry@gmail.com'
    // }
  })

  const notify = () => toast(error)

  useEffect(() => {
    if (error) toast(error)
  }, [error])

  const onSubmit = handleSubmit(async (data) => {
    const { fullName, email, password } = data
    try {
      const res = await axios.post('api/auth/signup', {
        fullName,
        email,
        password
      })

      const resSignIn = await signIn('credentials', {
        email: res.data.userSaved.email,
        password,
        redirect: false
      })
      if (resSignIn?.ok) router.push('/dashboard')
    } catch (error) {
      console.log({ error })
      if (error instanceof AxiosError) {
        // @ts-ignore
        seterror(error?.response?.data.msg || error.message)
        notify()
      }
    }
  })

  useEffect(() => {
    reset()
  }, [reset])
  
  return (
    <div className='flex flex-col justify-center w-full p-4'>
      {error && <ToastContainer />}
      {/* <p className='block'>enter your credentials</p> */}
      <form
        action=''
        onSubmit={onSubmit}
        className='block w-full'
        autoComplete='off'
      >
        <label htmlFor='fullName'>Name</label>
        <input
          type='text'
          placeholder='Jhon Doe'
          autoComplete='off'
          // name='fullName'
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
          autoComplete='nope'
          {...register('email', {
            required: {
              value: true,
              message: 'Email is required'
            },
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
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

        {/* <button className='w-full px-4 py-2 mt-3 bg-indigo-500'>
          Register
        </button> */}
        <ButtonGeneral text={'Register'} />
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </div>
  )
}

export default RegisterComponent
