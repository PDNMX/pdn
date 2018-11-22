import React from 'react';
import pndRoutes from './routes/index';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import P404 from './components/P404';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import PrivateRoute from "./PrivateRoute";
import DemoDeclaraciones from './components/DemoDeclaraciones/demo';
import app from "./config/firebase";
import LoginPDN from "./components/Inicio/LoginPDN";

const theme = createMuiTheme({
    palette: {
        primary: {
            main:'#295c53',
            light:'#56897f',
            dark:'#00322b'
        },
        secondary: {
            main: '#8fe19f',
            light: "#c1ffd0",
            dark:'#5eaf70'
        },
        fontLight:{
            color: "#f5f5f5"//"#e0e0e0"
        },
        grey:{
            color:"#c5c5c5"
        },
        greyTitle:{
            color:'rgb(55, 70, 79)'
        },
        graphGreen:{
            color:"#00cc99"
        },
        textPrincipal:{
            color:"#00322b"
        },
        textSecondary:{
            color : "#e6e6e6"
        },
        backLight:{
            color : "#e6e6e6"
        },
        backDark:{
            color:'rgb(55, 70, 79)'
        },
        textNormal:{
            color : 'rgba(0, 0, 0, 0.87)'
        },
        white:{
            color : "#ffff"
        },
        grisTenue:{
            color :'#f5f5f5'
        },

    },
    /*   overrides:{
           MuiTableHead:{
               root:{
                   backgroundColor: '#8fe19f'
               }
           }
       }
   */
});

const p404 = () => {
    return <P404/>
};


class App extends React.Component {
    state={loading :true, authenticated: false, user:null};

    constructor(props) {
        super(props);
    };

    getUser = ()=>{
        app.auth().onAuthStateChanged(user =>{
            if(user){
                let db = app.firestore();
                const settings ={timestampsInSnapshots :true};
                db.settings(settings);
                db.collection('/users_demodeclaraciones').where("UID","==",user.uid).get().then((querySnapshot)=>{
                    querySnapshot.forEach(doc=>{
                        this.setState({
                            user: {
                                nombre : doc.data().nombre,
                                apellidoPaterno: doc.data().apellidoPaterno,
                                apellidoMaterno : doc.data().apellidoMaterno,
                                profile : doc.data().profile
                            },
                            authenticated : true,
                            currentUsuer : user,
                            loading: false
                        })
                    });
                });

            }else{
                this.setState({
                    authenticated : false,
                    currentUser: null,
                    loading : false,
                    user : null,
                });
            }
        })
    };
    componentWillMount() {
        app.auth().onAuthStateChanged(user => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false
                });
            } else {
                this.setState({
                    authenticated: false,
                    currentUser: null,
                    loading: false
                });
            }
        })
    }
   handleSignIn =  (email,pass,history) => {
        try {
            app.auth().signInWithEmailAndPassword(email, pass).then((resp)=>{
                if (resp.user.uid) {
                    app.auth().onAuthStateChanged(user =>{
                        if(user){
                            let db = app.firestore();
                            const settings ={timestampsInSnapshots :true};
                            db.settings(settings);
                            db.collection('/users_demodeclaraciones').where("UID","==",user.uid).get().then((querySnapshot)=>{
                                querySnapshot.forEach(doc=>{
                                    this.setState({
                                        user: {
                                            nombre : doc.data().nombre,
                                            apellidoPaterno: doc.data().apellidoPaterno,
                                            apellidoMaterno : doc.data().apellidoMaterno,
                                            profile : doc.data().profile
                                        },
                                        authenticated : true,
                                        currentUsuer : user,
                                        loading: false
                                    },()=>{
                                        history.push('/home');
                                    })
                                });
                            });
                        }
                    });
                }
            });

        } catch (e) {
            alert(e);
        }
    };

    render() {
       const {authenticated, loading,user} = this.state;
        if (loading) {
            return <p>Cargando...</p>;
        }

        return (
            <MuiThemeProvider theme={theme}>
               <Router basename={process.env.PUBLIC_URL}>
                    <Switch>
                        <Route exact path={'/'} render={(props)=><LoginPDN handleSignIn={this.handleSignIn} propiedades={props}/> } />
                        {pndRoutes.map((prop, key) => {
                            return <PrivateRoute exact path={prop.path} component={prop.component}  key={key}  authenticated={authenticated} currentUser={user}/>;
                        }
                        )
                        }
                        <Route render={p404}/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        );
    }
}

export default App;