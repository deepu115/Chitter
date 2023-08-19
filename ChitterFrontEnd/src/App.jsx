import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Peeps from './Components/Peeps';
import Logout from './Components/logout';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem('token')));

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Peeps isLoggedIn={isLoggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {isLoggedIn && <Logout setLoggedIn={setLoggedIn} />}
    </BrowserRouter>
  );
}

export default App;

