import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import propTypes from 'prop-types';

const Logout = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
        props.reloadPageFunction();
    }

    return (
        <div>
            {isLoggedIn && <button className="btn btn-success" onClick={handleLogout}>Logout</button>
            }
        </div>
    );
}
Logout.defaultProps = {
    reloadPageFunction: () => window.location.reload()
};

Logout.propTypes = {
    reloadPageFunction: propTypes.func
};

export default Logout;
