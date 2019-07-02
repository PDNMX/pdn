import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

const styles = theme => ({
   root :{
       flexGrow:1,
       position: "fixed",
       zIndex: 1,
       bottom: 0,
       right: 0
   },
   fab: {
       margin: theme.spacing(2),
       background: theme.palette.azul.color
   }
});


class ScrollToTopButton extends React.Component {

    scrollToTop = () => {
        window.scroll(0,0 );
    };

    render(){
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Fab onClick={this.scrollToTop} className={classes.fab}>
                    <ArrowUpward/>
                </Fab>
            </div>
        );
    }
}


export default withStyles(styles)(ScrollToTopButton);