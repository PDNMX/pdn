import React from 'react';

import {withStyles} from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowUpward from '@material-ui/icons/KeyboardArrowUp';

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

    state = {
        visible: false
    };

    scrollToTop = () => {
        window.scroll(0,0 );
    };

    handleScroll = ()=> {
        //console.log(window.scrollY)
        if (window.scrollY > 200){
            this.setState({visible: true})
        } else {
            this.setState({visible: false})
        }

    };

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }


    render(){
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                {this.state.visible?
                <Fab onClick={this.scrollToTop} className={classes.fab}>
                    <ArrowUpward/>
                </Fab>
                    :<div/>}
            </div>
        );
    }
}


export default withStyles(styles)(ScrollToTopButton);