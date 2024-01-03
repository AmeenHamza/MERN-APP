import React from 'react'
import './Footer.css';
import footer_logo from '../assets/logo_big.png';
import instagram_icon from '../assets/instagram_icon.png';
import pintester_icon from '../assets/pintester_icon.png';
import whatsapp_icon from '../assets/whatsapp_icon.png';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer'>
            <div className="footer-logo">
                <img src={footer_logo} />
                <p>SHOPPER</p>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <Link to='/products'><li>Products</li></Link>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <img src={instagram_icon} />
                </div>
                <div className='footer-icons-container'>
                    <img src={pintester_icon} />
                </div>
                <div className='footer-icons-container'>
                    <img src={whatsapp_icon} />
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>&copy; Copyright 2023 - All Rights Reserved</p>
            </div>
        </div>
    )
}

export default Footer