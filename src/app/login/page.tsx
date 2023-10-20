'use client'
import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast } from 'react-toastify'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { AiOutlineGoogle } from 'react-icons/ai'
import './index.css'
import ButtonGeneral from '@/components/buttonGeneral'
const LoginPage = () => {
  const [error, seterror] = useState(null)
  const [containerActive, setContainerActive] = useState(false)
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
  useEffect(() => {
    // const container = document.getElementById('container-component')
    const registerBtn = document.getElementById('register')
    const loginBtn = document.getElementById('login')

    console.log({ registerBtn })
    registerBtn?.addEventListener('click', () => {
      console.log('first')

      setContainerActive(true)
      // container?.classList.add('active')
    })

    loginBtn?.addEventListener('click', () => {
      setContainerActive(false)
      // container?.classList.remove('active')
    })
  }, [])

  console.log({ error })

  const handleSignInSignOut = () => {
    console.log('first')
    setContainerActive((prev) => !prev)
  }

  const handleSignIn = async () => {
    await signIn('google')
  }

  return (
    <>
      <div className='max-container-component'>
        {/* my design */}

        <div className={`container-comp ${containerActive ? 'active' : ''}`}>
          <div className='content1'>
            <h1 className='font-bold text-3xl mb-10 '>Sign In</h1>

            <div
              className='google-btn flex items-center cursor-pointer mb-8'
              onClick={async () => await signIn('google')}
            >
              <img
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt=''
              />
              <p className=''>Sign in with google</p>
            </div>
            <p className='mb-4'>or use your email password</p>

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

              <ButtonGeneral text='Log In' handleClick={handleSignIn} />
              {/* <button
                type='button'
                className='bg-indigo-500 px-4 py-2 w-full mt-3'
                onClick={async () => await signIn('google')}
              >
                Sign in with Google
              </button> */}
              {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
            </form>
          </div>
          <div className='content2'></div>

          <div className='toggle-container_'>
            <div className='toggle_'>
              <div className='panel tg-left'>
                <div className='toggle1'>TOGGLE1</div>
              </div>
              <div className='panel tg-right px-4'>
                <h1 className='font-bold text-3xl mb-10 '>Hello, Friend !</h1>

                <p className='text-center text-sm'>
                  Register with your credentials to use all of side features
                </p>
                <ButtonGeneral
                  text='Sign up'
                  handleClick={handleSignInSignOut}
                />
                {/* <button className='mt-10 text-sm' onClick={handleSignInSignOut}>
                  SIGN UP
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
