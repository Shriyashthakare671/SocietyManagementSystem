import React from 'react';
import './about.css'; // Import CSS file for styling
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';

const About = () => {
  return (
    <>
      <Topbar />
      <div className="about-container">
      <div className="container">
        <Sidebar />
      </div>
        <h4>About Us</h4>
        <p>
          Our Society Management System is a comprehensive <br />software solution dedicated to facilitating community engagement and welfare. <br />We provide a platform that fosters a welcoming environment for all members and <br />enables effective management of various aspects of community living.
        </p>
      </div>
    </>
  );
};

export default About;
