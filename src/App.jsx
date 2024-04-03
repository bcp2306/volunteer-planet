import './App.css';
import { Routes, Route } from 'react-router-dom';
import User from './pages/User';
import Home from './pages/Home';
import View from './pages/View';
import MyOpportunities from './pages/MyOpportunities.jsx';
import References from './pages/References.jsx';
import Apply from './pages/Apply';
import { Link } from 'react-router-dom';
import volunteerPlanet from './assets/volunteer-planet-green.png';
import Footer from './component/Footer.jsx';
import AddOpportunity from './pages/AddOpportunity';
import EditOpportunity from './pages/EditOpportunity';



function App() {
 
  return (
    <div className='all'>
    <nav className='navbar'>
      <div className='navdiv'> 
      <div className='logo'><img src={volunteerPlanet} className="logo" alt="logo" /></div>
        <ul>
            <div className='li'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/view">Volunteering Opportunities</Link></li>
            <li><Link to="/my-opportunities">My Opportunities</Link></li>
            <li> <a href="https://www.w3schools.com">View map</a></li>
            <li><Link to="/references">References</Link></li>
            </div>
        </ul>
          <div >
            <Link to="/user">
            <button className='nav-button'>SignUp/Login</button>
            </Link>
          </div>
        </div>
    </nav>
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/view" element={<View/>}/>  
      <Route path="/my-opportunities" element={<MyOpportunities />}/>
      <Route path="/references" element={<References />}/>
      <Route path="/apply" element={<Apply />}/>
      <Route path="/user" element={<User />} />
      <Route path="/add-opportunity" element={<AddOpportunity />} />
      <Route path="/edit-opportunity/:id" element={<EditOpportunity />} />
     </Routes>
     <Footer />
    </div>
  )

}

export default App
