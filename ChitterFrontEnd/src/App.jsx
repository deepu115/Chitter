import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Peeps from './Components/Peeps';

const App = () => {
  return (

    <Router>
      <Logout />
      <Routes>
        <Route path="/" element={<Peeps />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>

  );
}

export default App;
