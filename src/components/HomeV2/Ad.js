import React from 'react';
import {withStyles} from "@mui/styles";
import {Box, Button} from '@mui/material';

import logo from '../../assets/ad/logo_semanaPDN.svg';
import bgimg from '../../assets/ad/fondo_banner_SemanaPDN.png';
import manitad from '../../assets/ad/backhand-index-pointing-right-joypixels.gif';
import manitai from '../../assets/ad/backhand-index-pointing-left-joypixels.gif';


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '200px',
        backgroundColor: '#f5f5f5',
        backgroundImage: `url(${bgimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    },
    logo:{
        paddingTop: theme.spacing(2),
        maxWidth: '300px'
    },
    btnPDN: {
        'margin': theme.spacing(1),
        'background': 'white',//'#9eb1b6',
        'borderRadius': '50px',
        'fontWeight': 'bold',
        'fontStyle': 'italic',
        '&:hover': {
            backgroundColor: '#56a3bf'
        }
    },
    manitad:{
        paddingRight: '6px',
        maxHeight: '40px'
    },
    manitai:{
        maxHeight: '40px'
    }
});

const Ad = props => {
    const {classes} = props;
    const url = "https://forms.gle/vH2Qw7z3nwJauxEd7";

    return <div className={classes.root}>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <img src={logo} alt='Semana PDN' className={classes.logo}/>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
            <img src={manitad} className={classes.manitad} alt='Manita' />
            <Button className={classes.btnPDN} href={url} target='_blank' variant='contained'>
                ¡Inscribete ya!
            </Button>
            <img src={manitai} className={classes.manitai} alt='Manita' />
        </Box>
    </div>
}


export default withStyles(styles)(Ad);