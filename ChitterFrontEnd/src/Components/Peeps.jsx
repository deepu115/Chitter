import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import Login from './Login';

const Peeps = ({ isLoggedIn, setLoggedIn }) => {
    const [peeps, setPeeps] = useState([]);
    const [newPeepContent, setNewPeepContent] = useState('');
    const [showLoginModal, setShowLoginModal] = useState(false);
    useEffect(() => {
        fetchPeeps();
    }, []);

    const fetchPeeps = async () => {
        try {
            const response = await axios.get('https://chitter-back-end.onrender.com/api/peeps');
            setPeeps(response.data);
        } catch (error) {
            console.error("Error fetching peeps:", error);
        }
    };

    const handlePostPeep = async () => {
        if (isLoggedIn) {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        'x-auth-token': token
                    }
                };
                await axios.post('http://localhost:3000/api/peeps', { content: newPeepContent }, config);
                setNewPeepContent('');
                fetchPeeps();
            } catch (error) {
                console.error("Error posting peep:", error);
                if (error.response && error.response.status === 401) {
                    setShowLoginModal(true);
                }
            }
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <div className="container mt-4">

            {showLoginModal && <Login onClose={() => setShowLoginModal(false)} onLogin={() => { setLoggedIn(true); setShowLoginModal(false); }} promptMessage="Please login to post a Peep" />}


            <div className="mb-3">
                <textarea
                    className="form-control"
                    value={newPeepContent}
                    onChange={(e) => setNewPeepContent(e.target.value)}
                    placeholder="What's happening?"
                    rows="3"
                ></textarea>
                <button className="btn btn-primary mt-2" onClick={handlePostPeep}>Peep</button>
            </div>

            <div className="peeps-list">
                {peeps.map(peep => (
                    <div key={peep._id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{peep.user.name} <small>@{peep.user.username}</small></h5>
                            <p className="card-text">{peep.content}</p>
                            <p className="card-text">
                                <small>{new Date(peep.timestamp).toLocaleString()}</small>
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
Peeps.propTypes = {
    isLoggedIn: propTypes.bool.isRequired,
    setLoggedIn: propTypes.func.isRequired
};


export default Peeps;

