import React from 'react';
import { Spinner as SpinnerStrap  } from 'reactstrap';
import './spinner.css';

const Spinner = () => {
    return (
        <div className="spinner">
            <SpinnerStrap color="primary" />
        </div>
        
    )
}
 export default Spinner;