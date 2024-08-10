import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './announcementTable.css';



const AnnouncementsTable = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch announcements data when the component mounts
        fetchAnnouncements();
    }, []);

    const fetchAnnouncements = async () => {
        try {
            // Get secretaryId from localStorage
            const secretaryId = localStorage.getItem('secretaryId');

            if (!secretaryId) {
                throw new Error('Secretary ID not found in local storage');
            }

            const response = await axios.post('http://localhost:9898/announcements', { secretaryId });
            setAnnouncements(response.data);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    // Function to format date
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toDateString(); // Return formatted date string
    };

    return (
        <div className="announcementTable-card">
            <h2 className="announcementTable-title">Announcements</h2>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <div className="announcementTable-container">
                    {announcements.length === 0 ? (
                        <div>No announcements available.</div>
                    ) : (
                        <table className="announcementTable-table">
                            <thead>
                                <tr>
                                    <th>Announcement</th>
                                    <th>Created At</th>
                                </tr>
                            </thead>
                            <tbody>
                                {announcements.map(announcement => (
                                    <tr key={announcement.id}>
                                        <td>{announcement.announcement}</td>
                                        <td>{formatDate(announcement.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}
        </div>
    );
};

export default AnnouncementsTable;
