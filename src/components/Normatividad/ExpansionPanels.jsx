import React from 'react'
import makeStyles from '@mui/styles/makeStyles'
import withStyles from '@mui/styles/withStyles'
import MuiExpansionPanel from '@mui/material/Accordion'
import MuiExpansionPanelSummary from '@mui/material/AccordionSummary'
import MuiExpansionPanelDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ButtonPDN from '../Compartidos/ButtonPDN'
import normatividadData from './normatividad.json'

import IconS1 from '../../assets/rediseno2023/imgs/iconos/sistemas/ico_s1.svg'
import IconS2 from '../../assets/rediseno2023/imgs/iconos/sistemas/ico_s2.svg'
import IconS3 from '../../assets/rediseno2023/imgs/iconos/sistemas/ico_s3.svg'
import IconS4 from '../../assets/rediseno2023/imgs/iconos/sistemas/ico_s4.svg'
import IconS5 from '../../assets/rediseno2023/imgs/iconos/sistemas/ico_s5.svg'
import IconS6 from '../../assets/rediseno2023/imgs/iconos/sistemas/ico_s6.svg'
import IconNormativa from '../../assets/rediseno2023/imgs/iconos/menu/ico_norma.svg'


const Accordion = withStyles(theme => ({
    root: {
        background: "none",
        border: '1px solid' + theme.palette.background.opaque,
        boxShadow: 'none'
    },
    expanded: {}
}))(MuiExpansionPanel)

const AccordionSummary = withStyles(theme => ({
    root: {
        backgroundColor: "none",
        minHeight: 56,
       "&.disabled": {
            color: theme.palette.grey[400],
            cursor: "not-allowed !important",
            pointerEvents: "none",
            opacity : .5
        },
        color: theme.palette.primary.main
    },
    expandIconWrapper: {
        color: theme.palette.secondary.main
    }
}))(MuiExpansionPanelSummary)

const AccordionDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.opaque,
        borderTop: '1px solid' + theme.palette.secondary.main
    }
}))(MuiExpansionPanelDetails)

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: 'none',
        color: theme.palette.text.linkColor,
        wordBreak: 'break-word'
    },
    ul: {
        listStyle: 'none'
        // paddingLeft: '20px'
    },
    li: {
        '&:before': {
            content: '"•"',
            color: '#94638d',
            fontWeight: 'bold',
            display: 'inline-block',
            width: '1em',
            marginLeft: '-1em'
        }
    },
    TypographyButton: {
        fontSize: '13px',
        textAlign: 'center',
        fontWeight: 'bold',
        color: theme.palette.text.clear
    },
    sistemas: {
        maxWidth: '40px',
        padding: '0 20px 0 0',
        "&:hover": {
            opacity: .8
        }
    }
}))

export default function CustomizedExpansionPanels() {


    const iconMap = {
        IconNormativa,
        IconS1,
        IconS2,
        IconS3,
        IconS4,
        IconS5,
        IconS6,
    };

    const [expanded, setExpanded] = React.useState('panel1');

    const estadoDeshabilitado = normatividadData.normatividadSeccion.normatividadSistemas.reduce((acc, item, index) => {
        const NombrePanel = `panel${index + 1}`;
        acc[NombrePanel] = item.estatus !== "activo";
        return acc;
    }, {});

    const handleChange = (panel) => (event, isExpanded) => {
        if (!estadoDeshabilitado[panel]) {
            setExpanded(isExpanded ? panel : false);
        }
    };

    const classes = useStyles();

    return (
        <div>
            {normatividadData.normatividadSeccion.normatividadSistemas.map((item, index) => (
                <Accordion key={index} square expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
                    <AccordionSummary classes={{ root: estadoDeshabilitado[`panel${index + 1}`] ? 'disabled' : '' }} expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`}>
                        <img src={iconMap[item.icono]} alt="" className={classes.sistemas} />
                        <Typography variant="h6">{item.titulo}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div>
                            {item.vinculo.map((vinculo, index) => (
                                <ButtonPDN key={index} target="_blank" href={vinculo.url}>
                                    {vinculo.titulo}
                                </ButtonPDN>
                            ))}
                        </div>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    )
}
