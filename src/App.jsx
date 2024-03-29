import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './component/Login.jsx'
import Signup from './component/Signup.jsx'
import Home from './pages/Home'
import View from './pages/View'
import Add from './pages/Add'
import Apply from './pages/Apply'
import { Link } from 'react-router-dom'
import volunteerPlanet from './assets/volunteer-planet-green.png'
import Footer from './component/Footer.jsx'


function App() {
 
  return (
    <div className='all'>
    <nav className='navbar'>
      <div className='navdiv'> 
      <div className='logo'><img src={volunteerPlanet} className="logo" alt="logo" /></div>
        <ul>
            <div className='li'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/view">View Volunteering Opportunities</Link></li>
            <li><Link to="/add">Add Volunteering Opportunity</Link></li>
            <li> <a href="https://www.w3schools.com">View map</a></li>
            </div>
        </ul>
          <div >
            <button className='nav-button'><Link to="/Signup">Sign Up</Link></button>
            <button className='nav-button'><Link to="/Login">Login</Link></button>
          </div>
        </div>
    </nav>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/view" element={<View/>}/>  
      <Route path="/add" element={<Add />}/>
      <Route path="/apply" element={<Apply />}/>
      <Route path="/Signup" element={<Signup />}/>
      <Route path="/Login" element={<Login />}/>
     </Routes>
     <Footer />
    </div>
  )

}

export default App
