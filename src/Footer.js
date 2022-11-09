import React, { Component } from 'react';
import { ImageProps } from 'react-bootstrap';
import './Footer.css'

const Footer = (props) => {
    const imgstyle = { maxWidth: '2rem' }

    return (
        <footer id="footer" className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-4 mb-0 text-muted">&copy; {new Date().getFullYear()} Ratatouille Robotics Inc.</p>

            <a href="https://mrsdprojects.ri.cmu.edu/2022teamb/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <img src="ratatouille-logo.png" style={imgstyle} />
            </a>

            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Home</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Features</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Pricing</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">FAQs</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">About</a></li>
            </ul>
        </footer>);
}

export default Footer;
