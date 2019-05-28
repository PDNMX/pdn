import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import Header from "./Header/Header";


const styles = theme => ({
  root :{
      flexGrow: 1
  }
});

class Metodologia extends React.Component{

    render (){

        const {classes} = this.props;
        return <div className={classes.root}>
            <Header/>
            Metodología

        </div>
    }

}

export default withStyles(styles)(Metodologia);
