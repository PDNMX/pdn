import Banner from './Banner'
import Footer from './Footer'
//import Version from './Version'
import ChatBotPDN from '../ChatBot/ChatBotPDN'
import Glosario from '../Glosario/'
import AsistenteBusqueda from './Asistente/BotonFlotante'

import style from '../Sistema1/style'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles(style)

const Layout = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.backgroundCruces}>
        <Banner />
        {/* <Version/> */}
        {children}
        <AsistenteBusqueda />
        <Glosario />
        <ChatBotPDN />
        <Footer />
      </div>
    </>
  )
}

export default Layout
