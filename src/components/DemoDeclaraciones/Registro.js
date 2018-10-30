import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import InformacionPersonal from "./InformacionPersonal";
import DatosCurriculares from "./DatosCurriculares";
import EncargoActual from "./EncargoActual";
import ExperienciaLaboral from "./ExperienciaLaboral";
import DependientesEconomicos from "./DependientesEconomicos";

const styles = theme => ({

});

class Registro extends  React.Component{
    render() {
        const {declaracion,classes} = this.props;
        return (
            <div>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Información
                            personal</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <InformacionPersonal
                            informacionPersonal={declaracion.informacion_personal.informacion_general}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Datos curriculares</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <DatosCurriculares datos_curriculares={declaracion.informacion_personal.datos_curriculares}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Encargo actual</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <EncargoActual encargo={declaracion.informacion_personal.datos_encargo_actual}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Experiencia laboral</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ExperienciaLaboral experiencias={declaracion.informacion_personal.experiencia_laboral?declaracion.informacion_personal.experiencia_laboral:[]}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Dependientes económicos</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <DependientesEconomicos dependientes={declaracion.informacion_personal.datos_dependientes_economicos?declaracion.informacion_personal.datos_dependientes_economicos:[]}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(Registro);