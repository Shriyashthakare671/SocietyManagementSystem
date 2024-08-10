import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './amenitiesTable.css';
const AmenitiesTable = () => {
    const [amenities, setAmenities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch amenities data when the component mounts
        fetchAmenities();
    }, []);

    const fetchAmenities = async () => {
        try {
            // Get secretaryId from localStorage
            const secretaryId = localStorage.getItem('secretaryId');

            if (!secretaryId) {
                throw new Error('Secretary ID not found in local storage');
            }

            const response = await axios.post('http://localhost:9898/amenities', { secretaryId });
            setAmenities(response.data.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    return (
        <div className="amenitiesTable-card">
            <h2 className="amenitiesTable-title">Amenities Table</h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <div className="amenitiesTable-container">
                    <table className="amenitiesTable-table">
                        <thead>
                            <tr>
                                <th>Amenity ID</th>
                                <th>Amenity Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {amenities.map(amenity => (
                                <tr key={amenity.id}>
                                    <td>{amenity.id}</td>
                                    <td>{amenity.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AmenitiesTable;
