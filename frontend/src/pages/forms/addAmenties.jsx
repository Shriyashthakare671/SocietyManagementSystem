import React, { useState } from 'react';
import axios from 'axios';
import './addAmenities.css'; // Import the new CSS file
import AmenitiesTable from '../table/amenitiesTable';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

const AddAmenities = () => {
    const [name, setName] = useState('');
    const secretaryId = localStorage.getItem('secretaryId'); // Retrieve secretary ID from local storage
    const history = useHistory(); // Get the history object

    const handleAddAmenity = async () => {
        try {
            const response = await axios.post('http://localhost:9898/amenities/addAmenities', {
                secretary_id: secretaryId,
                name: name
            });
            console.log(response.data);
            // Clear input field after successful submission
            setName('');
            alert('Amenity added successfully!');
            history.push('/secretaryDashboard'); // Redirect to SecretaryTable component
        } catch (error) {
            console.error('Error adding amenity:', error);
            alert('Error adding amenity. Please try again.');
        }
    };

    return (
        <>
            <div className="amenities-container">
                <h2 className="amenities-form-label">Add Amenities</h2>
                <input
                    type="text"
                    placeholder="Enter Amenity Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="amenities-form-control "
                /><br/>
                <button onClick={handleAddAmenity} className="amenities-btn-submit">Add Amenity</button>
                <AmenitiesTable/>
            </div>
        </>
    );
};

export default AddAmenities;
