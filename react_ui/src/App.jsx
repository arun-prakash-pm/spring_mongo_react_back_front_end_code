import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Home from './Home';
import Login from './pages/Login'
import Home from './pages/Home'
//import Dashboard from './Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
