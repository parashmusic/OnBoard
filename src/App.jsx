import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SearchTrain from './components/SearchTrain';
import MyBookings from './pages/MyBookings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      {/* <SearchTrain/> */}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/SearchTrain" element={<SearchTrain />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

