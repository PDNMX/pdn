import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import MuiExpansionPanel from '@mui/material/Accordion';
import MuiExpansionPanelSummary from '@mui/material/AccordionSummary';
import MuiExpansionPanelDetails from '@mui/material/AccordionDetails';
import { Typography}  from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ButtonPDN from "../Compartidos/ButtonPDN";
import IconS1 from "@assets/rediseno/ico_sistemas/ico_s1_color.svg"
import IconS2 from "@assets/rediseno/ico_sistemas/ico_s2_color.svg"
import IconS3 from "@assets/rediseno/ico_sistemas/ico_s3_color.svg"
import IconS4 from "@assets/rediseno/ico_sistemas/ico_s4_color.svg"
import IconS5 from "@assets/rediseno/ico_sistemas/ico_s5_color.svg"
import IconS6 from "@assets/rediseno/ico_sistemas/ico_s6_color.svg"
import IconNormativa from "@assets/rediseno/ico_norma.svg"
import normatividadData from './normatividad.json';

const Accordion = withStyles(theme => ({
    root: {
        border: '1px solid' + theme.palette.background.opaque,
        boxShadow: 'none'
    },
    expanded: {},
}))(MuiExpansionPanel);

const AccordionSummary = withStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.opaque,
        minHeight: 56,
        "&.disabled": {
            color: theme.palette.grey[500],
            cursor: "not-allowed",
            pointerEvents: "none",
        },
        color: theme.palette.text.main
    },
    expandIconWrapper: {
        color: theme.palette.secundario.main,
    },
}))(MuiExpansionPanelSummary);

const AccordionDetails = withStyles(theme => ({
    root: {
        padding: theme.spacing(2),
        color: theme.palette.text.main,
        backgroundColor: theme.palette.background.opaque,
        border: '1px solid' + theme.palette.secundario.main,
    }
}))(MuiExpansionPanelDetails);


const useStyles = makeStyles(theme => ({
    sistemas: {
        maxWidth: 40,
        padding: '0 20px 0 0',
        "&:hover": {
            opacity: .5
        }
    }
}));

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
    const disabledState = { panel1: false, panel2: false, panel3: true, panel4: true, panel5: true };

    const handleChange = (panel) => (event, isExpanded) => {
        if (!disabledState[panel]) {
            setExpanded(isExpanded ? panel : false);
        }
    };

    const classes = useStyles();

    return (
        <div>
            {normatividadData.normatividadSeccion.normatividadSistemas.map((item, index) => (
                <Accordion key={index} square expanded={expanded === `panel${index + 1}`} onChange={handleChange(`panel${index + 1}`)}>
                    <AccordionSummary classes={{ root: disabledState[`panel${index + 1}`] ? 'disabled' : '' }} expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index + 1}d-content`} id={`panel${index + 1}d-header`}>
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

    );
}
