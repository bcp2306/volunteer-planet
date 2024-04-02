import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

function User() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
      setActiveTabIndex(index);
    };

    return (
        <div className='tab-form'>
            <div className="tab-header">
            <div className={activeTabIndex === 0 ? 'active' : ''} onClick={() => handleTabClick(0)}>Signup</div>
            <div className={activeTabIndex === 1 ? 'active' : ''} onClick={() => handleTabClick(1)}>Login</div>
        </div>

            <div className="tab-body">
                {activeTabIndex === 0 && (
                  <div className='signup active'>                     
                    <h2 className='title-color'>Create an account</h2>

                  <div className="input-box">
                    <label>Username</label>
                    <input type="text" placeholder='Enter Username' required /> 
                    <FaUser className='icon-user' />     
                  </div>

                  <div className="input-box">
                    <label>Email</label>
                    <input type="email" placeholder='Enter Email' required />
                    <IoIosMail className='icon-mail' /> 
                  </div>

                  <div className="input-box">
                    <label>Password</label>
                    <input type="password" placeholder='Enter Password' required />
                    <FaLock className='icon-lock' />  
                  </div>   

                  <div className="input-box">
                    <button>Signup</button>
                  </div>
                  </div>
                )}               
                {activeTabIndex === 1 && (
                  <div className='login active'>
                    <h2 className='title-color'>Login</h2>

                  <div className="input-box">
                          <label>Username</label>
                          <input type="text" placeholder='Enter Username' required />
                          <FaUser className='icon-user' />
                  </div>

                  <div className="input-box">
                          <label>Password</label>
                          <input type="password" placeholder='Enter Password' required />
                          <FaLock className='icon-lock' />  
                  </div>

                  <div className="remember-forgot">
                    <label><input type="checkbox" />Remember me</label>
                    <a href="#">Forgot Password?</a>
                  </div>

                  <div className="input-box">
                          <button>Login</button>
                </div>
                </div>
                )}
              </div>
            </div>
  );
}

export default User;