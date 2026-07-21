import Banner from './Banner'
import Footer from './Footer'
//import Version from './Version'
import ChatBotPDN from '../ChatBot/ChatBotPDN'
import Glosario from '../Glosario/'
import AsistenteBusqueda from './Asistente/BotonFlotante'
import SurveyFloatingBanner from '../Compartidos/SurveyFloatingBanner'

import style from '../style'
import { makeStyles } from 'tss-react/mui';
const useStyles = makeStyles()(style);

const Layout = ({ children }) => {
  const { classes } = useStyles()
  return (
    <>
      <div className={classes.backgroundCruces}>
        <Banner />
        {/* <Version/> */}
        {children}
        <SurveyFloatingBanner />
        <AsistenteBusqueda />
        <Glosario />
        <ChatBotPDN />
        <Footer />
      </div>
    </>
  )
}

export default Layout
