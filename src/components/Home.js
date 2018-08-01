import React from 'react';
import './home.css';

class Home extends React.Component{
    render (){
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Plataforma Digital Nacional</h1>
                    <p> Inteligencia de datos anticorrupción</p>
                </header>
                <p className="App-intro">
                    Explora los sistemas de la PDN
                </p>
            </div>
        );
    }
}

export default Home;