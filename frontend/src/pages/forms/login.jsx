import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './login.css'; // Import CSS file for styling

const LoginForm = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [role, setRole] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAdminLogin = async () => {
        try {
            // Make Axios request specific to admin login
            const response = await axios.post('http://localhost:9898/admin/login', credentials);
            console.log(response)
            const token = response.data.data.token; // Extract token from response
            localStorage.setItem('token', token); // Store token in local storage
            // localStorage.setItem('role', role);  // For Conditional Rendering for Admin
            console.log('Admin Login response:', response.data);
            history.push('/adminDashboard');
        } catch (error) {
            console.error('Admin Login error:', error);
            // Handle error
        }
    };

    const handleOwnerLogin = async () => {
        try {
            // Make Axios request specific to owner login
            const response = await axios.post('http://localhost:9898/owner/login', credentials);
            const token = response.data.token; // Extract token from response
            localStorage.setItem('token', token); // Store token in local storage
            const ownerInfo = response.data;
            localStorage.setItem("ownerInfo", JSON.stringify(ownerInfo));
            localStorage.setItem("secretaryId", ownerInfo.secretary_id)
            console.log('Owner Login response:', response.data);
            history.push('/ownerDashboard');
        } catch (error) {
            console.error('Owner Login error:', error);
            // Handle error
        }
    };

    const handleSecretaryLogin = async () => {
        try {
            // Make Axios request specific to secretary login
            const response = await axios.post('http://localhost:9898/secretary/login', credentials);
            console.log('Secretary Login response:', response.data.data);
            const token = response.data.data.token; // Extract token from response
            localStorage.setItem('token', token); // Store token in local storage
            const secretaryId = response.data.data.secretary_id
            localStorage.setItem('secretaryId', secretaryId); // Store token in local storage
            history.push('/secretaryDashboard');
        } catch (error) {
            console.error('Secretary Login error:', error);
            // Handle error
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (role === 'admin') {
            handleAdminLogin();
        } else if (role === 'owner') {
            handleOwnerLogin();
        } else if (role === 'secretary') {
            handleSecretaryLogin();
        }
    };

    return (
        <div className="login-container">
            <h1 className="login-form-h1">Login Form</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <div className="login-form-group">
                    <label htmlFor="email" className="login-form-label">Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        value={credentials.email}
                        onChange={handleChange}
                        required
                        className="login-form-control"
                    />
                </div>
                <div className="login-form-group">
                    <label htmlFor="password" className="login-form-label">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={handleChange}
                        required
                        className="login-form-control"
                    />
                </div>
                <div className="login-form-group">
                    <label htmlFor="role" className="login-form-label">Role</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                        className="login-form-control"
                    >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                        <option value="secretary">Secretary</option>
                    </select>
                </div>
                <div className="login-form-group">
                    <a href="/registerOwner"><h4>SignUp as Owner</h4></a>
                </div>
                <button type="submit" className="login-btn-submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;
