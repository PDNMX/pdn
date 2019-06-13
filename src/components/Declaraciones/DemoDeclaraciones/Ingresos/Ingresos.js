import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Typography} from "@material-ui/core"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import SueldosSalariosPublicos from "./SueldosSalariosPublicos";
import SueldosSalariosOtros from "./SueldosSalariosOtros";
import ActividadProfesional from "./ActividadProfesional";
import ActividadEmpresarial from "./ActividadEmpresarial";
import ActividadEconomicaMenor from "./ActividadEconomicaMenor";
import Arrendamiento from "./Arrendamiento";
import Premios from "./Premios";
import EnajenacionBienes from "./EnajenacionBienes";
import OtrosIngresos from "./OtrosIngresos";
import Intereses from "./Intereses";

const styles = theme => ({

});

class Ingresos extends  React.Component{
    render() {
        const {declaracion,classes} = this.props;
        return (
            <div>
                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Sueldos y salarios públicos</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <SueldosSalariosPublicos
                            sueldosSalariosPublicos={declaracion.ingresos.sueldos_salarios_publicos}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Sueldos y salarios otros empleos</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <SueldosSalariosOtros
                            sueldosSalariosOtros={declaracion.ingresos.sueldos_salarios_otros_empleos}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Actividad profesional</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ActividadProfesional
                            actividadProfesional={declaracion.ingresos.actividad_profesional}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Actividad empresarial</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ActividadEmpresarial
                            actividadEmpresarial={declaracion.ingresos.actividad_empresarial}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Actividad económica menor</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ActividadEconomicaMenor
                            actividadEconomicaMenor={declaracion.ingresos.actividad_economica_menor}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Arrendamiento</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Arrendamiento
                            arrendamiento={declaracion.ingresos.arrendamiento}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Intereses</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Intereses
                            intereses={declaracion.ingresos.intereses}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Premios</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Premios
                            premios={declaracion.ingresos.premios}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Enajenación de bienes</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <EnajenacionBienes
                            enajenacionBienes={declaracion.ingresos.enajenacion_bienes}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Otros ingresos</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <OtrosIngresos
                            otrosIngresos={declaracion.ingresos.otros_ingresos}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(Ingresos);