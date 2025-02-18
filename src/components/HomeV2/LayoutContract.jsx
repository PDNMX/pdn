import BannerContract from '../Sistema6/Dashboard/BannerContract'
import ContainerContract from '../Sistema6/Dashboard/ContainerContract'


import style from '../style'
import { makeStyles } from '@mui/styles'
const useStyles = makeStyles(style)

const LayoutContract = ({ children }) => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.backgroundCruces}>
        <BannerContract />
        <ContainerContract />
      </div>
    </>
  )
}

export default LayoutContract
