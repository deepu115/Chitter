import axios from 'axios';
import propTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = ({ onClose, onLogin, promptMessage, reloadPageFunction = () => window.location.reload() }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://chitter-back-end.onrender.com/login/api/users/login', formData, { withCredentials: true });
            localStorage.setItem("token", response.data.token);
            onLogin();
            onClose();
            reloadPageFunction();
        } catch (error) {
            setErrorMessage(error.response.data.msg);
        }
    };

    return (
        <div className="login-modal">
            <div className="modal-content">
                <span className="close-button" onClick={onClose}>&times;</span>
                {promptMessage && <div className="prompt-message">{promptMessage}</div>}
                {errorMessage && <div className="error-message">{errorMessage}</div>}
                <h2>Login</h2>
                <form onSubmit={handleSubmit} method='post'>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" name="email" autoComplete="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" autoComplete="current-password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
                <div className="mt-3">
                    New to Chitter? <Link to="/signup">Signup Now</Link>
                </div>
            </div>
        </div>
    );
}
Login.propTypes = {
    onClose: propTypes.func.isRequired,
    onLogin: propTypes.func.isRequired,
    promptMessage: propTypes.string,
    reloadPageFunction: propTypes.func
};

export default Login;

