import React, { useState } from 'react'
import { AppContext } from './app.context'

interface props {
  children: JSX.Element | JSX.Element[]
}

const AppProvider = ({ children }: props) => {
  const [showMenu, setshowMenu] = useState(true)

  return (
    <div>
      <AppContext.Provider value={{showMenu, setshowMenu}}>{children}</AppContext.Provider>
    </div>
  )
}

export default AppProvider
