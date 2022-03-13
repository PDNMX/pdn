import { createTheme } from '@mui/material/styles';
import { esES } from '@mui/material/locale';

export default createTheme(
  {
    typography: {
      useNextVariants: true,
      fontFamily: ['"Roboto"', 'sans-serif'].join(',')
    },
    palette: {
      primary: {
        main: '#0d3b49',
        light: '#3d6575',
        dark: '#001621',
        contrastText: '#ced8db'
      },
      secondary: {
        main: '#3ab0e5',
        light: '#79e2ff',
        dark: '#0081b3',
        contrastText: '#0d3b49'
      },
      primario: {
        main: '#0d3b49',
        light: '#3d6575',
        dark: '#001621',
        contrastText: '#ced8db'
      },
      secundario: {
        main: '#3ab0e5',
        light: '#79e2ff',
        dark: '#0081b3',
        contrastText: '#0d3b49'
      },
      text: {
        main: '#ced8db',
        greyColor: '#666666'
      },
      background: {
        default: '#0d3b49',
        opaque: '#155065',
        hoverBotton: '#56a3bf',
        tableBody: '#f2f2f2'
      },
      azulPDN: '#0081b3',
      yellowColor: '#ffe01b',
      greyColor: '#666666',
      redColor: '#B00020',
      S1: {
        color: '#F29888',
        shade: '#F9CFC8'
      },
      S2: {
        color: '#B25FAC',
        shade: '#EBD6EA'
      },
      S3: {
        color: '#9085DA',
        shade: '#D5D0F1'
      },
      S4: {
        color: '#CED8DB'
      },
      S5: {
        color: '#CED8DB'
      },
      S6: {
        color: '#42A5CC',
        shade: '#CFE8F2'
      }
    },
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
          notchedOutline: {
            borderColor: 'rgba(255, 255, 255, 0.23)'
            // backgroundColor: '#0d3b49',
          },
          formControl: {
            color: 'rgba(255, 255, 255, 0.67)'
          }
        }
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: 'rgba(137, 212, 242, 1)'
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
              color: '#F9CFC8'
            },
            '&.Mui-active': {
              color: 'rgba(137, 212, 242, 1)',
              
            }
          },
          icon: {
            color: '#ced8db'
          },
          iconDirectionDesc: {
            color: '#ced8db'
          }
        }
      }
    }
  },
  esES
);
