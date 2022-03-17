import React from 'react';

import withStyles from '@mui/styles/withStyles';
import Fab from '@mui/material/Fab';
import ArrowUpward from '@mui/icons-material/KeyboardArrowUp';

const styles = theme => ({
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
            <div>
                {this.state.visible?
                <Fab onClick={this.scrollToTop} className={classes.fab} href="#">
                    <ArrowUpward/>
                </Fab>
                    :<div/>}
            </div>
        );
    }
}


export default withStyles(styles)(ScrollToTopButton);
