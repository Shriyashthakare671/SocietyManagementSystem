import React, { useState } from 'react';
import axios from 'axios';
import './addAnnouncement.css'; // Import the new CSS file
import AnnouncementsTable from '../table/announcementTable'; // Assuming you have a component for displaying announcements
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import Topbar from '../../components/topbar/Topbar';

const AddAnnouncement = () => {
    const [announcement, setAnnouncement] = useState('');
    const secretaryId = localStorage.getItem('secretaryId'); // Retrieve secretary ID from local storage
    const history = useHistory(); // Get the history object

    const handleAddAnnouncement = async () => {
        try {
            const response = await axios.post('http://localhost:9898/announcements/addAnnouncement', {
                secretary_id: secretaryId,
                announcement: announcement
            });
            console.log(response.data);
            // Clear input field after successful submission
            setAnnouncement('');
            alert('Announcement added successfully!');
            history.push('/secretaryDashboard'); // Redirect to SecretaryTable component
        } catch (error) {
            console.error('Error adding announcement:', error);
            alert('Error adding announcement. Please try again.');
        }
    };

    return (
        <>
        <Topbar/>
            <div className="announcement-container">
                <h2 className="announcement-form-label">Add Announcement</h2>
                <textarea
                    placeholder="Enter Announcement"
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    className="announcement-form-control"
                /><br/>
                <button onClick={handleAddAnnouncement} className="announcement-btn-submit">Add Announcement</button>
                <AnnouncementsTable/> {/* Render the announcements table */}
            </div>
        </>
    );
};

export default AddAnnouncement;
