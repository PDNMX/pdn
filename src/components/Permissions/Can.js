import * as React from "react";
import app from "../../config/firebase";
import BeatLoader from 'react-spinners/BeatLoader';
import Grid from "@material-ui/core/Grid/Grid";
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    padre: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
});

class Can extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    };

    componentDidMount() {
        this.getPermissions();
    };

    getPermissions() {
        let uid = app.auth().currentUser ? app.auth().currentUser.uid : null;
        if (!uid) {
            this.setState({
                opc: this.props.no
            });
            return true;
        }
        let action = this.props.perfom;
        let db = app.firestore();
        const settings = {timestampsInSnapshots: true};
        db.settings(settings);
        db.collection('/users_pdn').where("uid", "==", uid).get().then((querySnapshot) => {
            let role = querySnapshot.docs[0].data().rol;
            db.collection('/roles_rbacrules').where("rol", "==", role).get().then((querySnapshot) => {
                let permisos = [];
                querySnapshot.forEach(doc => {
                    if (doc.data().estatus)
                        permisos.push(doc.data().permission);
                });
                this.setState({
                    opc: permisos.includes(action) ? this.props.yes : this.props.no
                });
            });
        })
    };


    render() {
        const {classes} = this.props;
        return this.state.opc ? this.state.opc() : (
            <div className={classes.root}>
                <Grid container>
                    <Grid item xs={12}>
                        <div className={classes.padre}>
                            <BeatLoader
                                color="#2EB2E7"
                                loading={true}
                                size={50}
                            />
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

Can.defaultProps = {
    yes: () => null,
    no: () => null
};

export default withStyles(styles)(Can);