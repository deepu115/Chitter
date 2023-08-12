import axios from 'axios';
import { useState } from 'react';

const Signup = () => {
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
        e.preventdefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/signup', formData);
            console.log(response.data);
        } catch (error) {
            console.error("Error Signing up:", error.response.data);
        }
    };


    return ()
}
export default Signup;