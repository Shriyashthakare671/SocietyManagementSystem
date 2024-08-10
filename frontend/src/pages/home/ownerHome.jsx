import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'; // Import useHistory
import './ownerHome.css';

function OwnerHome() {
    const [ownerInfo, setOwnerInfo] = useState(null);
    const history = useHistory(); // Get history object

    useEffect(() => {
        const storedOwnerInfo = localStorage.getItem('ownerInfo');
        if (storedOwnerInfo) {
            setOwnerInfo(JSON.parse(storedOwnerInfo));
        }
    }, []);

    const handleAmenitiesClick = () => {
        // Navigate to the Amenities section
        history.push('/amenitiesTable');
    };

    const handleAnnouncementClick = () => {
        // Navigate to the Announcement section
        history.push('/announcementTable');
    };

    return (
        <><div className="owner-home-container">
            <h2>Owner Information</h2>
            <div className="owner-card">
                {ownerInfo ? (
                    <div>
                        <p>Flat No: {ownerInfo.flat_no}</p>
                        <p>Name: {ownerInfo.name}</p>
                        <p>Address: {ownerInfo.address}</p>
                        <p>Mobile No: {ownerInfo.mobile_no}</p>
                        <p>Email: {ownerInfo.email}</p>
                    </div>
                ) : (
                    <p>Loading owner info...</p>
                )}
            </div>

            <div className="owner-card-row">
                <div className="owner-card2" onClick={handleAmenitiesClick}>
                    <p>Amenities</p>
                    <img src="https://png.pngtree.com/png-clipart/20230805/original/pngtree-accommodation-amenities-infographics-with-icons-graph-infographics-icon-vector-picture-image_9855490.png" alt="Owner" />
                </div>

                <div className="owner-card3" onClick={handleAnnouncementClick}>
                    <p>Announcement</p>
                    <img src="https://media.istockphoto.com/id/1344512181/vector/icon-red-loudspeaker.jpg?s=612x612&w=0&k=20&c=MSi3Z2La8OYjSY-pr0bB6f33NOuUKAQ_LBUooLhLQsk=" alt="Owner" />
                </div>
            </div>
        </div><div className="society-rules">
                <h1>Society Rules</h1>
                <div className="rules-container">
                    <div className="rule">
                        <div className="rule-title">water</div>
                        <div className="rule-content">
                            Fresh and good quality water of dharoi and society bore is available for 24 x 7.
                        </div>
                    </div>
                    {/* <div className="rule">
                        <div className="rule-title">nature</div>
                        <div className="rule-content">
                            Live with nature and do not harm the plants grown in the society premises also water them accordingly.
                        </div>
                    </div> */}
                    <div className="rule">
                        <div className="rule-title">speed</div>
                        <div className="rule-content">
                            Do not drive vehicle with speed more than 10km in society premises.
                        </div>
                    </div>
                    <div className="rule">
                        <div className="rule-title">sticker</div>
                        <div className="rule-content">
                            Please apply society sticker to your vehicles otherwise entry is prohibited.
                        </div>
                    </div>
                    <div className="rule">
                        <div className="rule-title">chapman</div>
                        <div className="rule-content">
                            Do not enter without any valid identity proof. Verify your identity with society admin.
                        </div>
                    </div>
                    <div className="rule">
                        <div className="rule-title">cleaning</div>
                        <div className="rule-content">
                            Maintain cleanliness in society for our personal and public hygiene.
                        </div>
                    </div>
                </div>
            </div></>
    );
    
}

export default OwnerHome;
