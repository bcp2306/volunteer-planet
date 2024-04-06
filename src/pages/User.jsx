import React, { useState } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

function User() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [data, setData] = useState([]);

    const handleTabClick = (index) => {
        setActiveTabIndex(index);
      };

      const regSubmit = async () => {
        try {
            const response = await fetch(`https://w22039513.nuwebspace.co.uk/API/api/register?username=${username}&email=${email}&password=${password}`);
            const data = await response.json();
            setData(data);
            if(String(data.response) === "OK"){
                login({ username, isAdmin: false });
                navigate('/');
            } else {
                console.log("Registration failed:", data.message);
            }
        } catch (err) {
            console.log("Error during registration:", err.message);
        }
    };

    const loginSubmit = async () => {
        try {
            const response = await fetch(`https://w22039513.nuwebspace.co.uk/API/api/login?username=${username}&password=${password}`);
            const data = await response.json();
            setData(data);
            if(data.valid) {
                login({ username, isAdmin: data.isAdmin });
                data.isAdmin ? navigate('/my-opportunities') : navigate('/');
            } else {
                console.log("Login failed:", data.message);
            }
        } catch (err) {
            console.log("Error during login:", err.message);
        }
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
                    <input type="text" placeholder='Enter Username' name="Username" required value={username} onChange={e => setUsername(e.target.value)}/> 
                    <FaUser className='icon-user' />     
                  </div>

                  <div className="input-box">
                    <label>Email</label>
                    <input type="email" placeholder='Enter Email' name="Email" required value={email} onChange={e => setEmail(e.target.value)}/>
                    <IoIosMail className='icon-mail' /> 
                  </div>

                  <div className="input-box">
                    <label>Password</label>
                    <input type="password" placeholder='Enter Password' name="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
                    <FaLock className='icon-lock' />  
                  </div>   

                  <div className="input-box">
                    <button onClick={regSubmit}>Signup</button>
                  </div>
                  </div>
                )}               
                {activeTabIndex === 1 && (
                  <div className='login active'>
                    <h2 className='title-color'>Login</h2>

                  <div className="input-box">
                          <label>Username</label>
                          <input type="text" placeholder='Enter Username' name="Username" required value={username} onChange={e => setUsername(e.target.value)} />
                          <FaUser className='icon-user' />
                  </div>

                  <div className="input-box">
                          <label>Password</label>
                          <input type="password" placeholder='Enter Password' name="Password" required value={password} onChange={e => setPassword(e.target.value)}/>
                          <FaLock className='icon-lock' />  
                  </div>

                  <div className="input-box">
                          <button onClick={loginSubmit}>Login</button>
                  </div>
                  </div>              
                )}
              </div>
            </div>
  );
}

export default User;