import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Topbar from '../../components/topbar/Topbar';
import './register.css'; // Import the shared CSS file

function RegisterOwner() {
    const [ownerData, setOwnerData] = useState({
        flat_no: '',
        name: '',
        address: '',
        mobile_no: '',
        email: '',
        password: ''
    });

    const history = useHistory();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOwnerData({ ...ownerData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const secretary_id = localStorage.getItem("secretaryId");

            const response = await axios.post('http://localhost:9898/owner/registerOwner', {
                ...ownerData,
                secretary_id
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log('Owner Registration Successful:', response.data);
            history.push('/secretaryDashboard'); // Redirect to dashboard after successful registration
        } catch (error) {
            console.error('Owner Registration Error:', error);
        }
    };

    return (
        <div className="register-owner-container">
            <Topbar />
            <h2 className='form-label'>Register Owner</h2>
            <form onSubmit={handleSubmit} className="register-owner-form">
                <div className="register-owner-form-group">
                    <label htmlFor="flat_no">Flat Number</label>
                    <input
                        type="number"
                        id="flat_no"
                        name="flat_no"
                        value={ownerData.flat_no}
                        onChange={handleInputChange}
                        required
                        className="register-owner-form-control"
                    />
                </div>
                <div className="register-owner-form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={ownerData.name}
                        onChange={handleInputChange}
                        required
                        className="register-owner-form-control"
                    />
                </div>
                <div className="register-owner-form-group">
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={ownerData.address}
                        onChange={handleInputChange}
                        required
                        className="register-owner-form-control"
                    />
                </div>
                <div className="register-owner-form-group">
                    <label htmlFor="mobile_no">Mobile No</label>
                    <input
                        type="text"
                        id="mobile_no"
                        name="mobile_no"
                        value={ownerData.mobile_no}
                        onChange={handleInputChange}
                        required
                        className="register-owner-form-control"
                    />
                </div>
                <div className="register-owner-form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={ownerData.email}
                        onChange={handleInputChange}
                        required
                        className="register-owner-form-control"
                    />
                </div>
                <div className="register-owner-form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={ownerData.password}
                        onChange={handleInputChange}
                        required
                        className="register-owner-form-control"
                    />
                </div>
                <div className="login-form-group">
                    <a href="/login"><h4>Already Registered? Click here</h4></a>
                </div>
                <button type="submit" className="register-owner-btn-submit">Register</button>
            </form>
        </div>
    );
}

export default RegisterOwner;
