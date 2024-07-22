import React, { useEffect, useRef, useState } from "react";
import withStyles from '@mui/styles/withStyles';
import { Typography, Link, Collapse, ListItemButton } from "@mui/material";
import Box from "@mui/material/Box";
import icon_norma from "../../assets/rediseno/ico_norma.svg";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const styles = theme => ({
    root: {
        backgroundColor: '#364e56',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    item: {
        "&:hover": {
            backgroundColor: "#64808f"
        },
        borderStyle: 'solid',
        borderWidth: 1,
        minWidth: '260px',
        maxWidth:'260px',
        transition: 'height 2s',
        height: '70%',
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        maxWidth: theme.spacing(3),
        marginRight: theme.spacing(2)
    },
    link: {
        textDecoration: "none",
        color: "#b2bfc4"
    },
    list: {
        listStyleType: 'none',
        margin:'0',
        padding:'0'
    },
    listItem: {
        margin: '5px',
        padding:'0',
        minWidth: '300px',
        maxWidth:'300px'
    },
    listItemParent: {
        margin: '5px',
        padding:'7px',
        minWidth: '300px',
        maxWidth:'300px',
        border: '1px solid #34b3eb'
    },
    listItemChild: {
        margin: '5px',
        padding:'7px',
        minWidth: '300px',
        maxWidth:'300px',
        border: '1px solid #34b3eb'
    },
    row: {
        display: "flex"
    }
});

const NormatividadMenu = props => {
    const { classes } = props;
    const innerRef = useRef(null);
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const x = document.getElementById("normatividadMenu");
        x.addEventListener("mouseleave", toggle);
        return () => {
            x.removeEventListener("mouseleave", toggle);
        };
    }, []);

    const toggle = (e) => {
        props.toogle();
    }

    return (
        <Box id={"normatividadMenu"} ref={innerRef} className={classes.root}>
            <div className={classes.row}>
                
                <div className="col">
                    <ul className={classes.list}>
                        <li className={classes.listItem}>
                            <Link className={classes.link} href='https://www.diputados.gob.mx/LeyesBiblio/pdf/LGRA.pdf' target='_blank'>
                                <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                    <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                    <Typography color={'#b2bfc4'}>Ley General de Responsabilidades Administrativas</Typography>
                                </Box>
                            </Link>
                        </li>
                        <li className={classes.listItem}>
                            <Link className={classes.link} href='https://www.diputados.gob.mx/LeyesBiblio/pdf/LGSNA_200521.pdf' target='_blank'>
                                <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                    <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                    <Typography color={'#b2bfc4'}>Ley General del Sistema Nacional Anticorrupción</Typography>
                                </Box>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    <ul className={classes.list}>
                        <li className={classes.listItem}>
                            <ListItemButton className={classes.listItemParent} onClick={handleClick}>
                            <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                <Typography color={'#b2bfc4'}>Normatividad&nbsp;S1</Typography>
                                {open ? <ExpandLess style={{ color: '#ffffff' }} /> : <ExpandMore style={{ color: '#FFffff' }}/>}
                            </ListItemButton>
                            <Collapse in={open} timeout="auto" unmountOnExit>
                                <ul className={classes.list}>
                                    <li className={classes.listItem}>
                                        <Link className={classes.link} href='https://dof.gob.mx/nota_to_doc.php?codnota=5718117' target='_blank'>
                                            <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                                <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                                <Typography color={'#b2bfc4'}>Lineamientos S1</Typography>
                                            </Box>
                                        </Link>
                                    </li>
                                    <li className={classes.listItem}>
                                        <Link className={classes.link} href='https://dof.gob.mx/nota_to_doc.php?codnota=5729579' target='_blank'>
                                            <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                                <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                                <Typography color={'#b2bfc4'}>Declaratoria inicio de funciones S1</Typography>
                                            </Box>
                                        </Link>
                                    </li>
                                </ul>
                            </Collapse>
                        </li>
                        <li className={classes.listItem}>
                            <ListItemButton disabled>
                                <Typography color={'#b2bfc4'}>Normatividad&nbsp;S2</Typography>
                                <Collapse in={false}>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li className={classes.listItem}>
                                            <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                                <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                                <Typography color={'#b2bfc4'}>Lineamientos S1</Typography>
                                            </Box>
                                        </li>
                                        <li className={classes.listItem}>
                                            <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                                <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                                <Typography color={'#b2bfc4'}>Declaratoria inicio de funciones S1</Typography>
                                            </Box>
                                        </li>
                                    </ul>
                                </Collapse>
                            </ListItemButton>
                        </li>
                    </ul>
                </div>
                <div className="col">
                    <ul className={classes.list}>
                    <ul className={classes.list}>
                    <li className={classes.listItem}>
                            <ListItemButton disabled>
                                <Typography color={'#b2bfc4'}>Normatividad&nbsp;S3</Typography>
                                <Collapse in={false}>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li className={classes.listItem}>
                                            <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                                <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                                <Typography color={'#b2bfc4'}>Lineamientos S3</Typography>
                                            </Box>
                                        </li>
                                        <li className={classes.listItem}>
                                            <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                                <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                                <Typography color={'#b2bfc4'}>Declaratoria inicio de funciones S3</Typography>
                                            </Box>
                                        </li>
                                    </ul>
                                </Collapse>
                            </ListItemButton>
                        </li>
                        <li className={classes.listItem}>
                            <ListItemButton disabled>
                                <Typography color={'#b2bfc4'}>Normatividad&nbsp;S6</Typography>
                                <Collapse in={false}>
                                    <ul style={{ listStyle: 'none' }}>
                                        <li className={classes.listItem}>
                                            <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                                <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                                <Typography color={'#b2bfc4'}>Lineamientos S6</Typography>
                                            </Box>
                                        </li>
                                        <li className={classes.listItem}>
                                            <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>
                                                <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                                                <Typography color={'#b2bfc4'}>Declaratoria inicio de funciones S6</Typography>
                                            </Box>
                                        </li>
                                    </ul>
                                </Collapse>
                            </ListItemButton>
                        </li>
                    </ul>
                    </ul>
                </div>
                
            </div>
        </Box>
    );
}
export default withStyles(styles)(NormatividadMenu);
