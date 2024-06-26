import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import User from './pages/User';
import View from './pages/View';
import MyOpportunities from './pages/MyOpportunities';
import References from './pages/References';
import Apply from './pages/Apply';
import AddOpportunity from './pages/AddOpportunity';
import Profile from './pages/Profile'; 
import Footer from './component/Footer';
import volunteerPlanet from './assets/volunteer-planet-green.png';
 
function App() {

    /* I tried to implement the logout button to appear upon successful login but it didn't end up working - Reece

    const [isLoggedIn, setIsLoggedIn] = useState(sessionStorage.getItem('username'));

    const handleLogout = () => {
      sessionStorage.removeItem('usernname');
      setIsLoggedIn(null);
    }

    const location = useLocation();
    
  */

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
              <li> <a href="https://w20042922.nuwebspace.co.uk/team-project/interactive-map/">View map</a></li>
              <li><Link to="/references">References</Link></li>
              <li><Link to="/profile">Profile</Link></li>
            </div>
          </ul>
          <div>
          {/*

          {isLoggedIn ? (
              <button className='nav-button' onClick={handleLogout}>Logout</button>
            ) : (
              <Link to={{ pathname: '/user', state: { from: location } }}>
                <button className='nav-button'>SignUp/Login</button>
              </Link>
            )}
          */}
            <Link to="/user">
              <button className='nav-button'>SignUp/Login</button>
            </Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user" element={<User />} />
        <Route path="/view" element={<View/>} />  
        <Route path="/my-opportunities" element={<MyOpportunities />} />
        <Route path="/references" element={<References />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/add-opportunity" element={<AddOpportunity />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;