import { createTheme } from "@mui/material";
import { orange } from "@mui/material/colors";
import { esES } from "@mui/material/locale";

export default createTheme(
  {
    status: {
      danger: orange[500],
    },
    typography: {
      useNextVariants: true,
      color:'#ff0',
      fontFamily: "Muli",
      htmlFontSize: 21,
      fontSize:18,
      h1: {
        fontSize:'2.65rem',
        lineHeight:'1.167' 
      },
      h2: {
        fontSize:'1.75rem',
        lineHeight:'1.3' 
      },
      h3: {
        fontSize:'3rem',
        lineHeight:'1.167' 
      },
      h4: {
        fontSize:'2.125rem',
        lineHeight:'1.235' 
      },
      h5: {
        fontSize:'1.5rem',
        lineHeight:'1.334' 
      },
      h6: {
        fontSize:'1.25rem',
        lineHeight:'1.6' 
      }
    },
    palette: {
      mode: 'light',
      text: {
        main: '#E1E8EB',
        primary: '#55575A',
        secondary: '#ff0',
        linkColor: '#7a3d71'
      },
      primary: {
        main: '#7a3d71'

      },
      secondary: {
        main: '#927188',
        light: '#4996cb',
        dark: '#135685',
        contrastText:'rgba(255, 255, 255, 0.8)'
      },
      background: {
        paper : '#FCFCFF',
        opaque: '#EAE1EA',
        default: '#fff',
        prueba: '#d3d',
        paperChart: '#FFFFFF'
      },
      error: {
        main: '#D43864'
      },
      success: {
        main: '#438e53',
      },
      S1: {
        color: '#f29888',
        main: '#F8CAC4',
        light: '#f9eded',
        dark: '#e28276'
      }, 
      S2: {
        color: '#b25fac',
        main: '#dbafdb',
        light: '#f1e9f2',
        dark: '#6d4162' 
      },
      S3: {
        color: '#9085da' ,
        main: '#b0acea',
        light: '#eae9f4', 
        dark: '#7d76cc'        
      },
      S4: {
        color: '#88bc69',
        main: '#c4eaac',
        light: '#f4f4f4',
        dark: '#739b59'
      },
      S5: {
        color: '#34c9b2',
        main: '#8befdb',
        light: ' #f2f9f8',
        dark: '#46a593 '
      },
      S6: {
        color: '#42a5cc',
        main: '#8fd9ea',
        light: '#eff9f9',
        dark: '#2894b5'
      }
    }        
  },
  esES
);


