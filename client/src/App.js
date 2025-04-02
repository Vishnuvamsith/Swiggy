import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PendingFeedbacks from './pages/PendingFeedbacks';
import RequestFeedback from './pages/RequestFeedback';
import SubmitFeedback from './pages/SubmitFeedback';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} /> {/* Added */}
        <Route path="/pending-feedbacks" element={<ProtectedRoute><PendingFeedbacks /></ProtectedRoute>} />
        <Route path="/request-feedback" element={<ProtectedRoute><RequestFeedback /></ProtectedRoute>} />
        <Route path="/submit-feedback/:id" element={<ProtectedRoute><SubmitFeedback /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;