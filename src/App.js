import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';

import Signup from './components/signup';
import Login from './components/login';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
    <div>
   
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}/>
      </Routes>
    </div>
  </Router>
  );
}

export default App;
