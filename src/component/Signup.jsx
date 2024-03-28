import './account.css'
import { FaUser, FaLock } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Signup = () => {
    return (
        <div className='wrapper'>
            <form action="">
                <h1>Sign Up</h1>
                <div className="input-box">
                    <input type="text" placeholder='Username' required />  
                    <FaUser className='icon' />                
                </div>
                <div className="input-box">
                    <input type="Email" placeholder='Email' required />  
                    <IoIosMail className='icon' />             
                </div>
                <div className="input-box">
                    <input type="Password" placeholder='Password' required />
                    <FaLock className='icon' />  
                </div>

                <button type="submit">Sign Up</button>

            </form>

        </div>
    )
}

export default Signup