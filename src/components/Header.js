import './Header.css'
import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (
            <header className="d-flex flex-wrap py-3 px-4 justify-content-evenly">
                <a href="/" className="d-flex align-items-center mb-md-0 me-md-auto text-dark text-decoration-none">
                    <img src="rata-logo-name-transparent-white.png" alt='Ratatouille Robotics logo'/>
                </a>

                {/* <a className='d-flex align-items-center text-dark text-decoration-none' href='https://github.com/ratatouille-robotics' target='_blank'><i className="bi-github"></i></a> */}

            </header>
        );
    }
}

export default Header;
