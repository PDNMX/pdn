import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Box, Typography } from '@mui/material'
import WarningIcon from '@mui/icons-material/Warning'
import ButtonPDN from '../Compartidos/ButtonPDN'

const DialogoNoConectado = (props) => {
  const { open, setOpen } = props
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  const bgColor = theme.palette.background.opaque

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div style={{ background: theme.palette.background.opaque }}>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        {/* <DialogTitle id="responsive-dialog-title" style={{color: "#d3d3d3", background: bgColor}}>
                    {"Cobertura"}
                </DialogTitle> */}
        <DialogContent style={{ background: bgColor }}>
          <Box display='flex' flexWrap='wrap' justifyContent='center' alignContent='center' alignItems='stretch'>
            <Box p={1} m={1} flexGrow={1} alignSelf='center'>
              <WarningIcon
                aria-label='delete'
                sx={{
                  color: 'orange',
                  fontSize: '3rem'
                }}
              />
            </Box>
            <Box p={1} m={1} flexGrow={1} display='flex' alignItems='stretch'>
              <Typography color='#55575A' alignSelf='center'>
                La Entidad no ha reportado información a la PDN
              </Typography>
            </Box>
          </Box>
          {/* <DialogContentText> La Entidad no ha reportado información a la PDN </DialogContentText> */}
        </DialogContent>
        <DialogActions style={{ background: bgColor }}>
          <ButtonPDN variant='contained' onClick={handleClose} autoFocus>
            Aceptar
          </ButtonPDN>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogoNoConectado
