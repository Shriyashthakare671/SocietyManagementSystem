import { RemoveCircleOutlineOutlined } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Table.css';

function SocietyTable() {
    const [societyData, setSocietyData] = useState([]);
    const [error, setError] = useState(null);

    // Define function to fetch society data
    const fetchSocietyData = () => {
        axios.get('http://localhost:9898/society/getAllSocieties')
            .then(response => {
                setSocietyData(response.data);
            })
            .catch(error => {
                setError(error);
            });
    };

    // Call the fetchSocietyData function when the component mounts
    useEffect(() => {
        fetchSocietyData();
    }, []);

    // Function to handle removal of a society
    const handleRemoveSociety = (id) => {
        axios.delete(`http://localhost:9898/society/deleteSociety/${id}`)
            .then(() => {
                // Reload the page to reflect the updated data
                window.location.reload();
            })
            .catch(error => {
                console.error('Error removing society:', error);
                setError(error);
            });
    };

    return (
        <div className="card1">
            <h2 className="card-title">Society Table</h2>
            <div className="table-container">
                <table className="society-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Society Name</th>
                            <th>Address</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {societyData.map(society => (
                            <tr key={society.id}>
                                <td>{society.id}</td>
                                <td>{society.name}</td>
                                <td>{society.address}</td>
                                <td>
                                    {/* Add onClick event to the remove icon */}
                                    <RemoveCircleOutlineOutlined onClick={() => handleRemoveSociety(society.id)} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {error && <div>Error: {error.response.data.error}</div>}
                {/* {error && <div>Error: {error.message}</div>} */}
            </div>
        </div>
    );
}

export default SocietyTable;
