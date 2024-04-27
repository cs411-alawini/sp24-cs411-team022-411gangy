import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Match from './pages/Match';
import Confirmation from './pages/Confirmation';

function App() {
  return (
    <Router>
      <Routes>
        {/* Define routes for different pages */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/match" element={<Match />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}

export default App;