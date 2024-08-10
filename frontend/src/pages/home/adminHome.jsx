import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory
import SocietyTable from '../table/societyTable';
import './adminHome.css';

function AdminHome() {
    const [societiesCount, setSocietiesCount] = useState(0);
    const [showPopup, setShowPopup] = useState(false);
    const history = useHistory(); // Get history object
    const popupRef = useRef(null); // Reference to the popup element

    useEffect(() => {
        // Fetch societies count when the component mounts
        fetchSocietiesCount();
        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const fetchSocietiesCount = async () => {
        try {
            const response = await axios.get('http://localhost:9898/society/getAllSocietiesCount');
            setSocietiesCount(response.data.count);
        } catch (error) {
            console.error('Error fetching societies count:', error);
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleRegisterSociety = () => {
        // Navigate to the register society page
        history.push('/registerSociety');
    };

    const handleRegisterSecretary = () => {
        // Navigate to the register secretary page
        history.push('/registerSecretary');
    };

    const handleClickOutside = (event) => {
        // Close the popup if clicked outside of it
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };

    return (
        <>
        <div className="home-container">
         
                <div className="card">
                    <h2>Societies</h2>
                    <p>{societiesCount}</p>
                </div>

                <div className="card" onClick={togglePopup}>
                    <h2>Register</h2>
                    <img src="https://static.vecteezy.com/system/resources/previews/013/215/442/non_2x/add-button-black-glyph-ui-icon-circle-with-plus-website-interactive-element-user-interface-design-silhouette-symbol-on-white-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg" alt="Register" />
                </div>

                            

            {showPopup && (
                <div className="popup" ref={popupRef}>
                    <div className="popup-inner">
                        <h2>Options</h2>
                        <button onClick={handleRegisterSociety} className="register-society">Register Society</button>
                        <button onClick={handleRegisterSecretary} className="register-secretary">Register Secretary</button>
                    </div>
                </div>
            )}

                <div className="card">
                    <h2>Happy Families</h2>
                    <p>465</p>
                </div>
         

                </div>

            
            <SocietyTable />
        </>
    );
}

export default AdminHome;
