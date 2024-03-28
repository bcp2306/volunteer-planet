import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './component/Login.jsx'
import Signup from './component/Signup.jsx'
import Home from './pages/Home'
import View from './pages/View'
//import Map from './pages/Map'
import Add from './pages/Add'
import Apply from './pages/Apply'
import { Link } from 'react-router-dom'
import volunteerPlanet from './assets/volunteerPlanet.png'



function App() {
 

  return (
    <>
    <img src={volunteerPlanet} className="logo" alt="logo" />
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/view">View Volunteering Opportunities</Link></li>
            <li><Link to="/add">Add Volunteering Opportunity</Link></li>
            <li><Link to="/apply">Apply Volunteering Opportunity</Link></li>
        </ul>
        <div>
          <button><Link to="/Signup">Sign Up</Link></button>
          <button><Link to="/Login">Login</Link></button>
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
    </>

  )

}

export default App
