import { createTheme } from '@mui/material/styles'
import { esES } from '@mui/material/locale'

import BaseTheme2023 from './BaseTheme2023'

const AzulPDN = 'rgba(113, 57, 114, 1)'
const grisBorder = 'rgba(255, 255, 255, 0.23)'
const amarilloPDN = 'rgb(232, 214, 67)'

// const err = {
//   'label + &': {
//     marginTop: theme.spacing(3)
//   },
//   '& .MuiInputBase-input': {
//     'borderRadius': 4,
//     'position': 'relative',
//     'backgroundColor': theme.palette.background.paper,
//     'border': '1px solid #ced4da',
//     'fontSize': 16,
//     'padding': '10px 26px 10px 12px',
//     'transition': theme.transitions.create(['border-color', 'box-shadow']),
//     // Use the system font instead of the default Roboto font.
//     'fontFamily': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(','),
//     '&:focus': {
//       borderRadius: 4,
//       borderColor: '#80bdff',
//       boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)'
//     }
//   }
// };

export default createTheme(
  {
    ...BaseTheme2023,
    components: {
      MuiInputLabel: {
        styleOverrides: {
          shrink: {
            // texto input focus
            color: AzulPDN
          },
          formControl: {
            // texto de los inputs no focus
            color: 'rgba(0, 0, 0, 0.67)'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            border: `1px ${grisBorder} solid`
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: AzulPDN,
            '&.MuiSelect-icon': {
              color: '#E1E8EB'
            }
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            // color de texto select
            color: '#000'
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            // etiqueta del nivel de gobierno
            color: AzulPDN
          }
        }
      },
      // tablas
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            color: '#713972',
            '&:hover': {
              color: AzulPDN
            },
            '&.Mui-active': {
              color: '#F9CFC8'
            }
          },
          icon: {
            color: '#E1E8EB'
          },
          iconDirectionDesc: {
            color: '#E1E8EB'
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            // color del texto del input
            color: '#b25fac'
          }
        }
      },
      MuiFormControl: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              textAlign: 'initial',
              '&:hover fieldset': {
                border: `1px ${AzulPDN} solid`
              },
              '& .MuiSvgIcon-root': {
                color: AzulPDN
              }
            }
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&:hover fieldset': {
                border: `1px ${AzulPDN} solid`
              }
            },
            '& .MuiSvgIcon-root': {
              color: amarilloPDN
            },
            '& .MuiCircularProgress-root': {
              color: amarilloPDN
            }
          }
        }
      },

      MuiChip: {
        styleOverrides: {
          root: {
            '& .MuiChip-label': {
              color: '#713972'
            },
            '& .MuiChip-deleteIcon': {
              color: amarilloPDN,
              '&:hover': {
                color: '#ef5350'
              }
            }
          }
        }
      }
    }
  },
  esES
)
