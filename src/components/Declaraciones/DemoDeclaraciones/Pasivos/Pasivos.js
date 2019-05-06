import React from 'react';
import {withStyles} from '@material-ui/core/styles/index';
import ExpansionPanel from "@material-ui/core/ExpansionPanel/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography/Typography";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails";
import Deudas from "./Deudas";
import OtrasObligaciones from "./OtrasObligaciones";

const styles = theme => ({});

class Pasivoss extends React.Component {
    render() {
        const {declaracion, classes} = this.props;
        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Deudas</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Deudas deudas={declaracion.pasivos.deudas}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel defaultExpanded={false}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>Otras obligaciones</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <OtrasObligaciones otrasObligaciones={declaracion.pasivos.otras_obligaciones}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </div>
        );
    }
}

export default withStyles(styles)(Pasivoss);