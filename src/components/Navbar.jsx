
// import React from "react";
// import { Link } from "react-router-dom";
// import './Navbar.css'; 

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <h1 className="logo">Railway Reservation</h1>
//         <ul className="nav-links">
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/search">Search Trains</Link>
//           </li>
//           <li>
//             <Link to="/mybookings">My Bookings</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/signup">Sign Up</Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import chevron from '../assets/chevron.svg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <button
        onClick={() => document.body.classList.toggle('open')}
        className="burger"
      ></button>
      <h1>Onboard</h1>

      <div className="dropdowns">
        <div className="dropdown">
          <button>
            Services
            <img src={chevron} alt="chevron" />
          </button>
          <div className="dropdown-menu">
            {/* Replacing buttons with Links */}
            
          <button><Link to="/SearchTrain">Search train</Link></button>  
            <Link to="/mybookings">Web Applications</Link>
            <Link to="/">SEO Advice</Link>
            
          </div>
        </div>
        <div className="dropdown">
          <button>
            Products
            <img src={chevron} alt="chevron" />
          </button>
          <div className="dropdown-menu">
            {/* Replacing buttons with Links */}
            <Link to="#">Learn CSS Ebook</Link>
            <Link to="#">Security Course</Link>
            <Link to="#">Masterclass Bundle</Link>
          </div>
        </div>
     
      </div>
    </nav>
  );
};

export default Navbar;
