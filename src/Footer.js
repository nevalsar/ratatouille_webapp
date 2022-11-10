import React from 'react';
import './Footer.css'

const Footer = (props) => {
    return (
        <footer id="footer" className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-4 mb-0 text-muted">&copy; {new Date().getFullYear()} Ratatouille Robotics Inc.</p>

            <a href="https://mrsdprojects.ri.cmu.edu/2022teamb/" className="col-md-4 d-flex align-items-center justify-content-center mb-md-0 me-md-auto link-dark text-decoration-none" target='_blank'>
                <img src="ratatouille-logo.png" />
            </a>

            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a className='nav-link px-2 text-muted' href='https://github.com/ratatouille-robotics' target='_blank'><i className="bi-github" /></a></li>
            </ul>
        </footer>);
}

export default Footer;
