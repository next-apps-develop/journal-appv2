'use client'
import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
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

  const notify = () => {
    toast(error)
    toast.onChange((v) => {
      if (v.status === 'removed') {
        seterror(null)
      }
    })
  }

  useEffect(() => {
    if (error) toast(error)
  }, [error])

  const onSubmit = handleSubmit(async (data) => {
    const { email, password } = data
    const resSignIn = await signIn('credentials', {
      email,
      password,
      redirect: false
    })
    if (resSignIn?.error) {
      seterror(resSignIn.error as any)
      notify()
    }
    if (resSignIn?.ok) router.push('/dashboard')
  })

  useEffect(() => {
    reset()
  }, [reset])

  console.log({ error })

  return (
    <div className='flex w-full justify-center'>
      {error && <ToastContainer />}
      <form action='' onSubmit={onSubmit} className='w-1/3' autoComplete='off'>
        <h1 className='text-4xl text-center'>Sign In</h1>

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          placeholder='someemail@gmail.com'
          className='bg-zinc-800 px-4 py-2 block mb-2 w-full text-white'
          autoComplete='off'
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

        <button className='bg-indigo-500 px-4 py-2 w-full mt-3'>Login</button>
        <button
          type='button'
          className='bg-indigo-500 px-4 py-2 w-full mt-3'
          onClick={async () => await signIn('google')}
        >
          Sign in with Google
        </button>
        {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </div>
  )
}

export default LoginPage
