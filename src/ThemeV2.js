import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

import BaseTheme from './BaseTheme';

const AzulPDN = 'rgba(137, 212, 242, 1)';
const grisBorder = 'rgba(255, 255, 255, 0.23)';

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
    ...BaseTheme,
    components: {
      MuiInputLabel: {
        styleOverrides: {
          shrink: {
            // texto input focus
            color: AzulPDN
          },
          formControl: {
            // texto de los inputs no focus
            color: 'rgba(255, 255, 255, 0.67)'
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
            'color': AzulPDN,
            '&.MuiSelect-icon': {
              color: '#ced8db'
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
            'color': '#ced8db',
            '&:hover': {
              color: AzulPDN
            },
            '&.Mui-active': {
              color: '#F9CFC8'
            }
          },
          icon: {
            color: '#ced8db'
          },
          iconDirectionDesc: {
            color: '#ced8db'
          }
        }
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            // color del texto del input
            color: 'rgba(255, 255, 255, 0.67)'
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
            }
          }
        }
      }
      // MuiSelect: {
      //   styleOverrides: {
      //     '& .MuiOutlinedInput-root': {
      //       '&:hover': {
      //         border: `1px ${AzulPDN} solid`
      //       }
      //     }
      //   }
      // }
    }
  },
  esES
);
