import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
        window.location.reload();
    }

    return (
        <div>
            {isLoggedIn && <button className="btn btn-success" onClick={handleLogout}>Logout</button>
            }
        </div>
    );
}

export default Logout;
