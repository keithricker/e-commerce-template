import React from 'react';
import './custom-button.styles.scss';
import Badge from '@mui/material/Badge';

const CustomButton = ({ children, isGoogleSignIn, inverted, className, badgeContent, badgeIcon, ...otherProps }) => {
return (
    <button className={`${inverted ? 'inverted' : ''} ${className ? className : ''} custom-button`} { ...otherProps }>
        <Badge badgeContent={badgeContent} color="primary">{children}</Badge>
    </button>
    )
}
export default CustomButton;