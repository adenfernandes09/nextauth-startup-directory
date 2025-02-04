import React from 'react'
import Navbar from '../components/Navbar'

const layout = ({children} : Readonly<{children: React.ReactNode}>) => {
  return (
    <>
    <Navbar />
    <section>{children}</section>
    </>
  )
}

export default layout