import React, { useState, useEffect } from 'react';
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useAuth } from '../AuthContext'; // authentication

function User() {
    const [activeTabIndex, setActiveTabIndex] = useState(0);

    const handleTabClick = (index) => {
      setActiveTabIndex(index);
    };
	
  const { login } = useAuth();
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [email, setEmail] = useState(null);
	const [data, setData] = useState([]);
	

	const regSubmit = async () => {
        try {
            const data = await (await fetch(`https://w22039513.nuwebspace.co.uk/API/api/register?username=${username}&email=${email}&password=${password}`)).json()
            setData(data)
			if(String(data.response == "OK")){
        login({ username, isAdmin: false }); // payload
				window.location.href = "/";
			}else{
				console.log("no");
			}
        } catch (err) {
            console.log(err.message)
        }
    }

	const loginSubmit = async () => {
        try {
            const data = await (await fetch(`https://w22039513.nuwebspace.co.uk/API/api/login?username=${username}&password=${password}`)).json()
            setData(data)
			if(data.valid){
        login({ username, isAdmin: data.isAdmin }); // payload
				window.location.href = "/";
			}else{
				console.log("no");
			}
        } catch (err) {
            console.log(err.message)
        }
    }

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