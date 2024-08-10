import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Table.css'; // Import CSS file from SocietyTable component
import { RemoveCircleOutlineOutlined } from '@mui/icons-material';

const OwnerTable = () => {
  const [owners, setOwners] = useState([]);
  const [error, setError] = useState(null);

  const fetchOwners = async () => {
    try {
      const secretaryId = localStorage.getItem('secretaryId');
      if (!secretaryId) {
        throw new Error('Secretary ID not found in localStorage');
      }
      
      const response = await axios.get(`http://localhost:9898/owner/owners?secretaryId=${secretaryId}`);
      console.log(response.data);
      setOwners(response.data.owners);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  return (
    <div className="card1">
      <h2 className="card-title">Owner Table</h2>
      <div className="table-container">
        {error && <div>Error: {error.message}</div>}
        <table className="society-table">
          <thead>
            <tr>
              <th>Flat No</th>
              <th>Name</th>
              <th>Address</th>
              <th>Mobile No</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {owners.length > 0 && owners.map(owner => (
              <tr key={owner.id}>
                <td>{owner.flat_no}</td>
                <td>{owner.name}</td>
                <td>{owner.address}</td>
                <td>{owner.mobile_no}</td>
                <td>{owner.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OwnerTable;
