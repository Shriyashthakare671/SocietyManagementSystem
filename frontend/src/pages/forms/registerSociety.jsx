import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import './register.css';
import Topbar from '../../components/topbar/Topbar';
import axios from 'axios';

function RegisterSociety() {
    const [societyData, setSocietyData] = useState({ name: '', address: '' });
    const history = useHistory(); // Initialize useHistory
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setSocietyData({ ...societyData, [name]: value });
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
  
        const response = await axios.post('http://localhost:9898/society/addSociety', societyData, config);
        if(response.data.status==="success"){
            history.push("/adminDashboard");
        }else{
            console.log(response.data)
        }

        
      } catch (error) {
        console.error('Society Registration Error:', error);
      }
    };

    return (
        <div className="register-society-container">
               <Topbar/>
            <h2 className='register-form-label'>Register Society</h2>
            <form onSubmit={handleSubmit} className="register-society-form">
                <div className="register-form-group">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        value={societyData.name} 
                        onChange={handleInputChange} 
                        required 
                        className="register-form-control"
                    />
                </div>
                <div className="register-form-group">
                    <label htmlFor="address">Address</label>
                    <textarea 
                        id="address" 
                        name="address"
                        value={societyData.address} 
                        onChange={handleInputChange} 
                        required 
                        className="register-form-control"
                    ></textarea>
                </div>
                <button type="submit" className="register-btn-submit">Register</button>
            </form>
        </div>
    );
};

export default RegisterSociety;
