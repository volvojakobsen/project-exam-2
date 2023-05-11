import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Navbar } from './components/navbar';
import { Home } from "./pages/home/home.jsx";
import { Footer } from './components/footer';
import { VenueInfo } from "./pages/venueInfo/venueInfo";
import { LoginCustomer } from "./pages/login-customer/LoginCustomer";
import { Register } from "./pages/register/register";
import { Profile } from "./pages/profile/profile";
import { NewVenue } from "./pages/newVenue/newVenue.jsx"

function App() {



  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venueInfo/:id" element={<VenueInfo />} />
          <Route path="/loginCustomer" element={<LoginCustomer />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/newVenue" element={<NewVenue />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;