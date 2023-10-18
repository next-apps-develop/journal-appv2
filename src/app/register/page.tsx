'use client'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const RegisterPage = () => {
  const [error, seterror] = useState(null)
  const router = useRouter()
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

  return (
    <div className='flex w-full justify-center'>
      {error && <ToastContainer />}
      <form action='' onSubmit={onSubmit} className='w-1/3' autoComplete='off'>
        <h1 className='text-4xl text-center'>Sign up</h1>
        <label htmlFor='fullName'>Name</label>
        <input
          type='text'
          placeholder='Jhon Doe'
          autoComplete='off'
          // name='fullName'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full text-white'
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
          <span className='text-red-400 block'>{errors.fullName?.message}</span>
        )}
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          placeholder='someemail@gmail.com'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full text-white'
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
          <span className='text-red-400 block'>{errors.email?.message}</span>
        )}
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          placeholder='*****'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full text-white'
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
          <span className='text-red-400 block'>{errors.password?.message}</span>
        )}
        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          placeholder='*****'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full text-white'
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
          <span className='text-red-400 block'>
            {/* @ts-ignore */}
            {errors.confirmPassword?.message}
          </span>
        )}

        <button className='bg-indigo-500 px-4 py-2 w-full mt-3'>
          Register
        </button>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </div>
  )
}

export default RegisterPage
