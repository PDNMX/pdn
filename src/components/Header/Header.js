import React from "react";
import pndRoutes from "../../routes";
import {Switch, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
// @material-ui/core components
import Navbar  from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs/Tabs";
import Tab from "@material-ui/core/Tab/Tab";

const hist = createBrowserHistory();
const switchRoutes = (
    <Router history={hist}>
        <Switch>
            {pndRoutes.map((prop, key) => {
                return <Route path={prop.path} component={prop.component} key={key} />;
            })}
        </Switch>
    </Router>
);
/**
 * @return {boolean}
 */
function Header(props){
    var styles = {
        appBar: {
            flexWrap: 'wrap'
        },
        tabs: {
            width: '100%',
            color : 'black'
        }
    }
    var routes = props.routes;
        return (
            <Navbar  position="static" style = {{float:'right'}}>
                    <Tabs variant="dense" style={{backgroundColor: "white"}} >
                        <Tabs style={styles.tabs}>
                            <Tab label='Home' to="/home" />
                            <Tab label='Acerca de' to="/about"  />
                            <Tab label='FAQ' to="/faq" />
                        </Tabs>
                    </Tabs>
            </Navbar>
        );

}
export default Header;