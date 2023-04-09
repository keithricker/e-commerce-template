import React from 'react';
import { withRouter } from 'react-router-dom';
import './menu-item.styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const MenuItem = ({ title, imageUrl, icon, size, history, linkUrl, match }) => {
    if (size + '' === 'undefined') size = 'small'
    return (
    <div className={`${size} menu-item`} >
        <img className="background-image" alt={title} src={imageUrl} loading="lazy" />
        <div className="content" onClick={() => history.push(`${match.url}${linkUrl}`)}>
            <span><FontAwesomeIcon icon={icon} /></span>
            <h1 className="title">
                <a href={"#"}>{title.toUpperCase()}</a>
            </h1>
        </div>
    </div>
    )
};

export default withRouter(MenuItem);