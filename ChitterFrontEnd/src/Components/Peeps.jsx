import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Peeps({ isLoggedIn }) {
    const [peeps, setPeeps] = useState([]);
    const [newPeepContent, setNewPeepContent] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPeeps();
    }, []);

    const fetchPeeps = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/peeps');
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
                    navigate('/login');
                }
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <div className="container mt-4">
            <div className="mb-3">
                <textarea
                    className="form-control"
                    value={newPeepContent}
                    onChange={(e) => setNewPeepContent(e.target.value)}
                    placeholder="What's happening?"
                    rows="3"
                ></textarea>
                <button className="btn btn-primary mt-2" onClick={handlePostPeep}>Post</button>
            </div>

            <div className="peeps-list">
                {peeps.map(peep => (
                    <div key={peep._id} className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{peep.user.username} (@{peep.user.name})</h5>
                            <p className="card-text">{peep.content}</p>
                            <footer className="blockquote-footer">{new Date(peep.timestamp).toLocaleString()}</footer>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Peeps;
