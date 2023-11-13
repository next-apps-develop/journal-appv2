'use client'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { signIn, useSession } from 'next-auth/react'
import './index.css'
import ButtonGeneral from '@/components/ButtonGeneral'
import FormLogin from './FormLoging'
import RegisterComponent from '../register/Register'
import { useRouter } from 'next/navigation'
const LoginComponent = () => {
  const [containerActive, setContainerActive] = useState(false)

  const { data: session } = useSession()
  const router = useRouter()

  const handleSignInSignOut = () => {
    console.log('first')
    setContainerActive((prev) => !prev)
  }

  useEffect(() => {
    if (session) {
      console.log('session exist')
      router.push('/dashboard')}
  }, [router, session])

  return (
    <>
      {!session && (
        <div className='max-container-component'>
          {/* my design */}

          <div className={`container-comp ${containerActive ? 'active' : ''}`}>
            <div className='content1'>
              <h1 className='font-bold text-3xl mb-10 '>Sign In</h1>

              <div
                className='google-btn flex items-center cursor-pointer mb-8'
                onClick={async () => await signIn('google')}
              >
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                  alt=''
                />
                <p className=''>Sign in with google</p>
              </div>
              <p className='mb-4'>or use your email password</p>

              <FormLogin />
            </div>
            <div className='content2'>
              <h1 className='font-bold text-3xl mb-4 text-center'>
                Create account
              </h1>
              <RegisterComponent />
            </div>

            <div className='toggle-container_'>
              <div className='toggle_'>
                <div className='panel tg-left'>
                  <h1 className='font-bold text-3xl mb-10 '>Welcome back !</h1>

                  <p className='text-center text-sm'>
                    Enter your personal credentials to use all of side features
                  </p>
                  <ButtonGeneral
                    text='Sign in'
                    handleClick={handleSignInSignOut}
                  />
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default LoginComponent
