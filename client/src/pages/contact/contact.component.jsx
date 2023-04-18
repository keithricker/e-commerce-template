import React from 'react';
import './contact.styles.scss';
import { withCms } from '../../cms';

const ContactPage = ({cms}) => {
    const { branding, contact } = cms
    const { phone, contactFields } = contact
    const {titleText} = branding
    return (
        <div id="contact-page" className="page">
            <h2>{titleText} is pleased to serve you!</h2>
            <h4>{phone}</h4>
            <p><img className="image" src="https://blog.hubspot.com/hubfs/Customer%20Care.jpg" alt="Customer Care" loading="lazy" /></p>
            {
                contactFields.sort((x,y) => x.order < y.order ? -1 : 1).map((field,n) => {
                    return <p key={n}><b>{field.title}:</b> {field.value}</p>
                })
            }
        </div>
    )
}
export default withCms(ContactPage);