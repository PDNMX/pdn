import React, { useEffect, useRef } from "react";
import withStyles from '@mui/styles/withStyles';
import { Typography, Link } from "@mui/material";
import Box from "@mui/material/Box";
import icon_norma from "../../assets/rediseno/ico_norma.svg";

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
        minWidth: theme.spacing(43),
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
    },
    listItem: {
        margin: theme.spacing(1)
    },
    row: {
      display:"flex"
    }
});

const NormatividadMenu = props => {
    const { classes } = props;
    const innerRef = useRef(null);

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
                    <Link className={classes.link} href='https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018#gsc.tab=0' target='_blank'>
                        <Box className={classes.item} sx={{ m: 0, p: 1, color: '#34b3eb' }}>                   
                            <img src={icon_norma} alt="Normatividad" className={classes.icon} />
                            <Typography color={'#b2bfc4'}>Bases para el funcionamiento de la PDN</Typography>
                        </Box>
                    </Link>
                </li>
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
            </div>
            <div className="col">
            <ul className={classes.list}>


            </ul>
            </div>
          </div>
            
        </Box>
    );
}
export default withStyles(styles)(NormatividadMenu);
