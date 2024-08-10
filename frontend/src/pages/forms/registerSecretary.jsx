import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import './register.css'; // Import the shared CSS file
import Topbar from '../../components/topbar/Topbar';
import axios from 'axios';

function RegisterSecretary() {
    const [registerSec, setRegisterSec] = useState(false);
    const [secretaryData, setSecretaryData] = useState({
        society_id: '',
        name: '',
        email: '',
        mobile_no: '',
        password: ''
    });

    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSecretaryData({ ...secretaryData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const config = {
                headers: {
                    Authorization: `${token}`
                }
            };

            const response = await axios.post('http://localhost:9898/secretary/registerSecretary', secretaryData, config);
            console.log('Secretary Registration Successful:', response.data);
            setRegisterSec(true);
        } catch (error) {
            console.error('Secretary Registration Error:', error);
        }
    };

    useEffect(() => {
        if (registerSec) {
            // Redirect to '/adminDashboard' if registerSec is true
            history.push('/adminDashboard');
        }
    }, [registerSec, history]);

    return (
        <div className="register-secretary-container"> {/* Update container class */}
            <Topbar/>
            <h2 className='register-form-label'>Register Secretary</h2> {/* Update form label class */}
            <form onSubmit={handleSubmit} className="register-secretary-form"> {/* Apply the shared CSS class */}
                <div className="register-form-group"> {/* Update form group class */}
                    <label htmlFor="society_id">Society ID</label>
                    <input 
                        type="text" 
                        id="society_id" 
                        name="society_id"
                        value={secretaryData.society_id} 
                        onChange={handleInputChange} 
                        required 
                        className="register-form-control" 
                    />
                </div>
                <div className="register-form-group"> {/* Update form group class */}
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={secretaryData.name} 
                        onChange={handleInputChange} 
                        required 
                        className="register-form-control" 
                    />
                </div>
                <div className="register-form-group"> {/* Update form group class */}
                    <label htmlFor="email">Email</label>
                    <input 
                        type="text" 
                        id="email" 
                        name="email"
                        value={secretaryData.email} 
                        onChange={handleInputChange} 
                        required 
                        className="register-form-control" 
                    />
                </div>
                <div className="register-form-group"> {/* Update form group class */}
                    <label htmlFor="mobile_no">Mobile No</label>
                    <input 
                        type="text" 
                        id="mobile_no" 
                        name="mobile_no"
                        value={secretaryData.mobile_no} 
                        onChange={handleInputChange} 
                        required 
                        className="register-form-control" 
                    />
                </div>
                <div className="register-form-group"> {/* Update form group class */}
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password"
                        value={secretaryData.password} 
                        onChange={handleInputChange} 
                        required 
                        className="register-form-control" 
                    />
                </div>
                <button type="submit" className="register-btn-submit">Register</button> {/* Update button class */}
            </form>
        </div>
    );
}

export default RegisterSecretary;
