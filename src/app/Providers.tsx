'use client'
import AppProvider from '@/context/app.provider'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppProvider>
      <SessionProvider>{children}</SessionProvider>
    </AppProvider>
  )
}

export default Providers
