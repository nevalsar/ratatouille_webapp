import './Header.css'
import React, { Component } from 'react';

class Header extends Component {
    render() {
        const iconStyle = { fontSize: '2rem', color: 'black' };
        return (
            <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">

                    <span className="fs-4">Ratatouille Robotics</span>
                </a>

                <a href='https://github.com/ratatouille-robotics'><i className="bi-github" style={iconStyle}></i></a>

            </header>
        );
    }
}

export default Header;