import React from "react";
import PropTypes from "prop-types";

function Footer( ) {

    return (
        <footer className='footer'>
            <div className='container'>
                <p className='right'>
          <span style={{color:'white', fontSize:'2em'}}>
              gob.mx
          </span>
                </p>
            </div>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
};

export default (Footer);
