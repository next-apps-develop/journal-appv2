'use client'
import React, { useEffect, useState } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import { signIn, useSession } from 'next-auth/react'
import './index.css'
import ButtonGeneral from '../ButtonGeneral'
import FormLogin from './FormLoging'
import RegisterComponent from '../register/Register'
import { useRouter } from 'next/navigation'
const LoginComponent = () => {
  const [containerActive, setContainerActive] = useState(false)

  const { data: session } = useSession()
  const router = useRouter()

  const handleSignInSignOut = () => {
    setContainerActive(prev => !prev)
  }

  useEffect(() => {
    if (session) {
      router.push('/dashboard')
    }
  }, [router, session])

  console.log({ session })
  return (
    <>
      {!session && (
        <div className="max-container-component">
          {/* my design */}

          <div className={`container-comp ${containerActive ? 'active' : ''}`}>
            <div className="content1">
              <h1 className="mb-8 text-3xl font-bold ">Sign In</h1>

              {/* <div
                className="flex items-center mb-8 cursor-pointer google-btn"
                onClick={async () => await signIn('google')}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  alt=""
                />
                <p className="">Sign in with google</p>
              </div>
              <p className="mb-4">or use your email password</p> */}

              <FormLogin />
            </div>
            <div className="content2">
              <h1 className="mb-8 text-3xl font-bold text-center">Create account</h1>
              <RegisterComponent />
            </div>

            <div className="toggle-container_">
              <div className="toggle_">
                <div className="panel tg-left">
                  <h1 className="mb-8 text-3xl font-bold ">Welcome !</h1>

                  <p className="text-sm text-center">
                    Enter your personal credentials to use all of side features
                  </p>
                  <ButtonGeneral
                    text="Sign in"
                    handleClick={handleSignInSignOut}
                    className="text-black bg-white mt-8"
                  />
                </div>
                <div className="px-4 panel tg-right">
                  <h1 className="mb-8 text-3xl font-bold ">Hello !</h1>

                  <p className="text-sm text-center">
                    Register with your credentials to use all of side features
                  </p>
                  <ButtonGeneral
                    text="Sign up"
                    handleClick={handleSignInSignOut}
                    className="text-[#000] mt-8 bg-white"
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
