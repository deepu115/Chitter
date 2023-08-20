import { useState } from 'react';
import propTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Logout from './Logout';

function Navbar({ isLoggedIn, setLoggedIn }) {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);

    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src="https://banner2.cleanpng.com/20180411/opq/kisspng-hummingbird-logo-graphic-design-paper-hummingbird-5ace542f961100.3753998415234714076147.jpg" alt="Chitter logo" width="50" height="50" /></Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        {!isLoggedIn && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                        )}
                    </ul>
                    <div className="d-flex">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="darkModeToggle" onChange={toggleDarkMode} />
                            <label className="form-check-label" htmlFor="darkModeToggle">{isDarkMode ? 'Night Mode' : 'Day Mode'}</label>
                        </div>
                        {isLoggedIn && (
                            <Logout setLoggedIn={setLoggedIn} />
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
Navbar.propTypes = {
    isLoggedIn: propTypes.bool.isRequired,
    setLoggedIn: propTypes.func.isRequired
};

export default Navbar;
