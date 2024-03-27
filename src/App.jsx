import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import View from './pages/View'
import Add from './pages/Add'
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
        </ul>
    </nav>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/view" element={<View/>}/>
      <Route path="/add" element={<Add />}/>
     </Routes>
    </>
  )
}

export default App
