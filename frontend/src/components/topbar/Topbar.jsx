import React, { useState } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory from React Router
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import "./topbar.css"; // Import the CSS file for topbar styles

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const history = useHistory(); // Initialize useHistory

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    // For example, clear session/local storage, etc.
    // Then navigate to the home page
    localStorage.removeItem('token')
    localStorage.removeItem('secretaryId')
    localStorage.removeItem('ownerInfo')
    history.push('/');
  };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">Resido</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <LanguageIcon />
            <span className="topIconBadge">2</span>
          </div>
          <img
            src="https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg"
            alt=""
            className="topAvatar"
            onClick={toggleMenu} // Toggle menu on image click
          />
          {isMenuOpen && (
            <div className="menu">
              <ul>
                <li>Profile</li>
                <li>Settings</li>
                <li onClick={handleLogout}>Logout</li> {/* Call handleLogout on click */}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
