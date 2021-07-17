import React from 'react';
import './custom-button.styles.scss';

const CustomButton = ({ children, isGoogleSignIn, inverted, className, ...otherProps }) => {
return (
    <button className={`${inverted ? 'inverted' : ''} ${className ? className : ''} custom-button`} { ...otherProps }>
        {children}
    </button>
    )
}
export default CustomButton;