import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Peeps from './Components/Peeps';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')));

  return (
    <BrowserRouter>
      <div id="app-root" >
        <Navbar isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />
        <Routes>
          <Route path="/" element={<Peeps isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Footer />
      </div>

    </BrowserRouter>
  );
}

export default App;

