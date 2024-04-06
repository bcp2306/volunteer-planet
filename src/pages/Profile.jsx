// Profile.jsx

import React from 'react';
import '../Profile.css'; // Importing CSS file
import Profilepic from '../assets/Blank-Profile.png'

function Profile() {
    const username = sessionStorage.getItem('username'); // Retrieve the username saved earlier

    return (
        <div className="hPage">
            <h1 className="hColor">Profile</h1>
            <h2>Username: {username ? username : 'Not logged in'}</h2>
            <div className='hImg'><img src={Profilepic} className="hImg" alt="Profile" /></div>
        </div>
    );
}
export default Profile;

