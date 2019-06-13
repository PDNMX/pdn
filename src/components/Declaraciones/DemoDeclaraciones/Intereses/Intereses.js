import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Typography} from "@material-ui/core"
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import Empresas from "./Empresas";
import Membresias from "./Membresias";
import Apoyos from "./Apoyos";
import RepresentacionPasiva from "./RepresentacionPasiva";
import RepresentacionActiva from "./RepresentacionActiva";
import SociosComerciales from "./SociosComerciales";
import ClientesPrincipales from "./ClientesPrincipales";
import BeneficiosGratuitos from "./BeneficiosGratuitos";

const styles = theme => ({

});

class Intereses extends  React.Component{
    render() {
        const {declaracion,classes} = this.props;
        return (
            <div>
                <ExpansionPanel >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Empresas, sociedades y asociaciones</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Empresas
                            empresas={declaracion.intereses.empresas_sociedades_asociaciones}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Membresias</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Membresias membresias={declaracion.intereses.membresias}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Apoyos y beneficios públicos</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Apoyos apoyos={declaracion.intereses.apoyos_beneficios_publicos}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Representación activa</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <RepresentacionActiva representacionesActivas={declaracion.intereses.representacion_activa}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Representación pasiva</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <RepresentacionPasiva representacionesPasivas={declaracion.intereses.representacion_pasiva}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Socios comerciales</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <SociosComerciales sociosComerciales={declaracion.intereses.socios_comerciales}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Clientes principales</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ClientesPrincipales clientesPrincipales={declaracion.intereses.clientes_principales}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Otras partes</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ClientesPrincipales clientesPrincipales={declaracion.intereses.clientes_principales}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Beneficios gratuitos</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <BeneficiosGratuitos beneficios={declaracion.intereses.beneficios_gratuitos}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(Intereses);