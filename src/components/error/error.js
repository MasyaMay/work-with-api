import React from 'react';
import './error.css';
import img from './error.png'

const ErrorMessage = () => {
    return (
        <div className="error">
            <img src={img} alt='error'></img>
            <span>Это уведомление об ошибке</span>
        </div>
    )
}

export default ErrorMessage;