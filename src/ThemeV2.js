import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

import BaseTheme from './BaseTheme';

export default createTheme(
  {
    ...BaseTheme,
    components: {
      MuiInputLabel: {
        styleOverrides: {
          shrink: {
            color: 'rgba(137, 212, 242, 1)'
          },
          formControl: {
            color: 'rgba(255, 255, 255, 0.67)'
          }
        }
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderColor: 'rgba(255, 255, 255, 0.23)'
          },
          notchedOutline: {
            borderColor: 'rgba(255, 255, 255, 0.23)'
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            'color': 'rgba(137, 212, 242, 1)',
            '&.MuiSelect-icon': {
              color: '#ced8db'
            }
          }
        }
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            color: 'black'
          }
        }
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: 'rgba(255, 255, 255, 0.6)'
          }
        }
      },
      MuiTableSortLabel: {
        styleOverrides: {
          root: {
            'color': '#ced8db',
            '&:hover': {
              color: 'rgba(137, 212, 242, 1)'
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
          root: {
            // '&.MuiOutlinedInput-root.MuiSelect-root': {
            //   outline: '1px #3ab0e5 solid'
            // },
            // '&:hover': {
            //   outline: '1px #3ab0e5 solid'
            // }
          },
          input: {
            color: 'rgba(255, 255, 255, 0.67)'
          },
          formControl: {
            // '&:hover': {
            //   outline: '1px #3ab0e5 solid'
            // }
          }
        }
      }
    }
  },
  esES
);
