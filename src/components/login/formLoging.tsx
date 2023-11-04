import React, { FormEventHandler, useEffect, useState } from 'react'
import ButtonGeneral from '../buttonGeneral'
import { FieldErrors, useForm } from 'react-hook-form'
import { signIn } from 'next-auth/react'
import { ToastContainer, toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const FormLogin = ({}) => {
  const [error, seterror] = useState(null)
  const router = useRouter()

  const handleSignIn = async () => {
    try {
      await signIn('google')
    } catch (error) {
      console.log(error)
    }
  }

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
    console.log({ errorNot: error })
    toast(error)
    toast.onChange((v) => {
      if (v.status === 'removed') {
        console.log('remover')
        seterror(null)
      }
    })
  }

  useEffect(() => {
    if (error) toast(error)
  }, [error])

  useEffect(() => {
    reset()
  }, [reset])
  
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
  return (
    <>
      <ToastContainer />
      <form
        action=''
        onSubmit={onSubmit}
        autoComplete='off'
        className='w-full px-8'
      >
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          placeholder='someemail@gmail.com'
          // className='bg-zinc-800 px-4 py-2 block mb-2 w-full text-white'
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
          <span className='text-red-400 block'>
            {errors.email?.message as any}
          </span>
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
          <span className='text-red-400 block'>
            {errors.password?.message as any}
          </span>
        )}

        <ButtonGeneral text='Log In' />
        {/* <button
        type='button'
        className='bg-indigo-500 px-4 py-2 w-full mt-3'
        onClick={async () => await signIn('google')}
      >
        Sign in with Google
      </button> */}
        {/* {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
      </form>
    </>
  )
}

export default FormLogin
