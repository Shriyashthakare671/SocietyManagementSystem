import React from 'react';
import './Home.css'; // Import CSS file for styling
import Navbar from './Navbar'

function Home() {
  return (
    <>
    <Navbar/>
    <div className="fullscreen-image">
      <img src="https://internationalfireandsafetyjournal.com/wp-content/uploads/2022/10/shutterstock_383282161-e1683020949520.jpg" alt="Fullscreen" />
      <div className="image-text">
        <h1>WE MANAGE YOUR HOUSING</h1>
        <p>creating an immersive experience for residents to connect, manage, and thrive in their community.</p>
      </div>
    </div>
    </>
  );
}

export default Home;
