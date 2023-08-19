import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/signup', formData, { withCredentials: true });
            console.log(response.data);
            navigate('/');
        } catch (error) {
            setErrorMessage(error.response.data.msg);
        }
    };

    return (
        <div className="container mt-5">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <h2>Signup</h2>
            <form onSubmit={handleSubmit} method='post'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" name="username" value={formData.username} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
                <div className="mt-3">
                    Already a user? <Link to="/">Homepage</Link>
                </div>
            </form>
        </div>
    );
}
export default Signup;