import { TextField } from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'
import { ThemeProvider } from '@mui/material/styles'
import ThemeV2 from '../../../../ThemeV2'
import Fade from '@mui/material/Fade'
export function PersonasServidorasPublicasYSusDeclaraciones () {
  const { control } = useFormContext()

  /*
    3.- Personas servidoras pub y declaraciones patri
      - Nombre
      - AP1
      - AP2
      - Institución
      - Empleo, cargo, comisión
    */
  return (
    <Fade in timeout={1200}>
      <div>
        <ThemeProvider theme={ThemeV2}>
          <Controller
            control={control}
            name='psp-declaraciones.nombres'
            defaultValue=''
            render={({ field }) => (
              <TextField
                style={{ background: '#fff' }}
                id='nombres'
                label='Nombre(s)'
                variant='outlined'
                placeholder='Ingresa el nombre o nombres'
                fullWidth
                margin='normal'
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            name='psp-declaraciones.primerApellido'
            defaultValue=''
            render={({ field }) => (
              <TextField
                style={{ background: '#fff' }}
                label='Primer Apellido'
                variant='outlined'
                placeholder='Ingresa el primer apellido'
                fullWidth
                margin='normal'
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            defaultValue=''
            name='psp-declaraciones.segundoApellido'
            render={({ field }) => (
              <TextField
                style={{ background: '#fff' }}
                label='Segundo Apellido'
                variant='outlined'
                placeholder='Ingresa el segundo apellido'
                fullWidth
                margin='normal'
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            defaultValue=''
            name='psp-declaraciones.nombreEntePublico'
            render={({ field }) => (
              <TextField
                style={{ background: '#fff' }}
                id='nombreEntePublico'
                label='Institución o ente público'
                variant='outlined'
                placeholder='Ingresa la institución o ente público'
                fullWidth
                margin='normal'
                {...field}
              />
            )}
          />

          <Controller
            control={control}
            defaultValue=''
            name='psp-declaraciones.empleoCargoComision'
            render={({ field }) => (
              <TextField
                style={{ background: '#fff' }}
                id='empleoCargoComision'
                label='Empleo, cargo o comisión'
                variant='outlined'
                placeholder='Ingresa el empleo, cargo o comisión'
                fullWidth
                margin='normal'
                {...field}
              />
            )}
          />
        </ThemeProvider>
      </div>
    </Fade>
  )
}
