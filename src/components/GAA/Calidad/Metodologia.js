import React from 'react';
import {withStyles} from "@material-ui/core/styles";


const styles = theme => ({
  root :{
      flexGrow: 1
  }
});

class Metodologia extends React.Component{

    render (){

        const {classes} = this.props;
        return <div className={classes.root}>
            Metodología

        </div>
    }

}

export default withStyles(styles)(Metodologia);
