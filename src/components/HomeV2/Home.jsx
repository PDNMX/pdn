import React from 'react'
import SysPDN from './Sistemas/SysPDN'
import Cards from './Cards/'
import QueEsPDN from './QueEsPDN'
import Numeralia from './Numeralia'
import AlertDialog from './Disclaimer'
import Evolucion from './Evolucion'
import { UserContext } from '../Login/UserContext'
// import Ad from "./Ad";

const Home = () => {
  const { user } = React.useContext(UserContext)

  return (
    <>
      {/* <Ad/> */}
      {user.loggedIn && <Evolucion />}
      <QueEsPDN />
      <Numeralia />
      <SysPDN />
      <Cards />
      <AlertDialog />
    </>
  )
}

export default Home
