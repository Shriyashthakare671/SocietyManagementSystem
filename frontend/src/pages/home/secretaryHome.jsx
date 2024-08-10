import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import OwnerTable from '../table/ownerTable';
import './secretaryHome.css';
import axios from 'axios'; // Import axios

export default function SecretaryHome() {
    const [showPopup, setShowPopup] = useState(false);
    const [flatCount, setFlatCount] = useState(0); // State for flat count
    const popupRef = useRef(null); // Reference to the popup element
    const history = useHistory();

    useEffect(() => {
        // Fetch societies count when the component mounts
        fetchFlatCount();

        document.addEventListener('mousedown', handleClickOutside);
        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const handleAddAnnouncement = () => {
        // Navigate to the register society page
        history.push('/addAnnouncement');
    };

    const handleAddAmenities = () => {
        // Navigate to the register secretary page
        history.push('/addAmenities');
    };

    const handleRegisterOwner = () => {
        // Navigate to the register secretary page
        history.push('/registerOwner');
    };

    const handleClickOutside = (event) => {
        // Close the popup if clicked outside of it
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowPopup(false);
        }
    };

// Function to fetch flat count
const fetchFlatCount = async () => {
    try {
        const secretaryId = localStorage.getItem('secretaryId'); // Fetch secretaryId from localStorage
        const response = await axios.post('http://localhost:9898/owner/countOwners', { secretaryId }); // Send secretaryId in the request body
        console.log(response);
        setFlatCount(response.data.count);
    } catch (error) {
        console.error('Error fetching flat count:', error);
    }
};
    return (
        <>
            <div className="secretary-home-container">

                <div className="secretary-card">
                    <h2>Flats</h2>
                    <p>{flatCount}</p> {/* Display flat count here */}
                </div>

                <div className="secretary-card" onClick={togglePopup}>
                    <h2>Add</h2>
                    <img src="https://static.vecteezy.com/system/resources/previews/013/215/442/non_2x/add-button-black-glyph-ui-icon-circle-with-plus-website-interactive-element-user-interface-design-silhouette-symbol-on-white-space-solid-pictogram-for-web-mobile-isolated-illustration-vector.jpg" alt="Register" />
                </div>

                {showPopup && (
                    <div className="secretary-popup" ref={popupRef}>
                        <div className="secretary-popup-inner">
                            <h2>Options</h2>
                            <button onClick={handleRegisterOwner} className="secretary-registerOwner">Register Owner</button>
                            <button onClick={handleAddAmenities} className="secretary-addSecretary">Add Amenities</button>
                            <button onClick={handleAddAnnouncement} className="secretary-addAnnouncment">Add Announcement</button>
                        </div>
                    </div>
                )}

                <div className="secretary-card">
                    <h2>No of Members</h2>
                    <p></p>
                </div>

            </div>

            <OwnerTable /> 
        </>
    )
}
