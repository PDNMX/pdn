import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Typography} from "@material-ui/core"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import BienesInmuebles from "./BienesInmuebles";
import BienesMueblesRegistrables from "./BienesMueblesRegistrables";
import BienesMueblesNoRegistrables from "./BienesMueblesNoRegistrables";
import InversionesCuentasValores from "./InversionesCuentasValores";
import EfectivoMetales from "./EfectivoMetales";
import Fideicomisos from "./Fideicomisos";
import BienesIntangibles from "./BienesIntangibles";
import CuentasCobrar from "./CuentasCobrar";
import UsoEspeciePropiedad from "./UsoEspeciePropiedad";

const styles = theme => ({});

class Activos extends React.Component {
    render() {
        const {declaracion, classes} = this.props;
        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Bienes inmuebles</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <BienesInmuebles bienesInmuebles={declaracion.activos.bienes_inmuebles}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Bienes muebles registrables</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <BienesMueblesRegistrables bienesMuebles={declaracion.activos.bienes_muebles_registrables}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Bienes muebles no registrables</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <BienesMueblesNoRegistrables bienesMuebles={declaracion.activos.bienes_muebles_no_registrables}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Inversiones, cuentas, valores</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <InversionesCuentasValores inversionesCuentasValores={declaracion.activos.inversiones_cuentas_valores}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Efectivo / Metales</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <EfectivoMetales efectivoMetales={declaracion.activos.efectivo_metales}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Fideicomisos</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Fideicomisos fideicomisos={declaracion.activos.fideicomisos}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Bienes intangibles</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <BienesIntangibles bienesIntangibles={declaracion.activos.bienes_intangibles}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Cuentas por cobrar</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <CuentasCobrar cuentasCobrar={declaracion.activos.cuentas_por_cobrar}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Uso, especie, propiedad tercero</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <UsoEspeciePropiedad usoEspeciePropiedad={declaracion.activos.uso_especie_propiedad_tercero}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(Activos);