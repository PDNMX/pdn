import React, { useEffect } from 'react'
import withStyles from '@mui/styles/withStyles'
import { AppBar, Typography, Grid } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'
import imgHeader from '../../../assets/rediseno2023/imgs/iconos/logotipos/logo_pdn-transparente.svg'

// import {getUser} from '../Login/Auth';

const styles = (theme) => ({
  list: {
    listStyle: 'none',
},
  opc: {
    '&:hover': {
      backgroundColor: '#ebe9f9',
      color: '#55575a',
      borderRadius: '75px'
    },
    paddingBottom: theme.spacing(2),
    textAlign: 'center',
    cursor: 'pointer',
    color: '#55575a'
  },
  selected: {
    backgroundColor: '#ebe9f9',
    color: '#55575a',
    borderRadius: '75px'
  }
})

const BannerContract = (props) => {

  return (
    <>
      <AppBar
        position='absolute'
        style={{
          background:
            'transparent linear-gradient(230deg, #1C7CBF 0%, #1C7CBF 4%, #42a5cc 49%, #42a5cc 100%) 0% 0% no-repeat padding-box',
          border: 0,
          boxShadow: 'none',
        overflowX: 'auto',
        top:'.7rem',
        zIndex:'2',
        width:'110px',
        left:'.7rem',
        borderRadius:'60px',
        right:'20px',
        }}
      >
        <div className='contratoS6'>
          <div>
            <RouterLink to='/'>
              <img src={imgHeader} alt='PDN' />
            </RouterLink>
          </div>
          
        </div>
       
      </AppBar>
      

    </>
  )
}
export default withStyles(styles)(BannerContract)
