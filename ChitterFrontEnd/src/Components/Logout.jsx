import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    }

    return (
        <div>
            {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
        </div>
    );
}

export default Logout;
