import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RecordsScreen from './pages/RecordsScreen';
import Header from './components/Header';
import SignupScreen from './pages/SignupScreen';
import { Container } from 'react-bootstrap';
import LoginScreen from './pages/LoginScreen';
import { AuthProvider } from './contexts/AuthContexts';
import AnalysisScreen from './pages/AnalysisScreen';
import Welcome from './pages/Welcome';

function App() {
  return (
    <Router >
      <AuthProvider>
        <Header />
        <Container className='mt-3'>
          <Routes>
            <Route path="/MoneyManager" element={<Welcome />} />
            <Route path="/" element={<Welcome />} />
            <Route path="/home" element={<Welcome />} />
            <Route path="/records" element={<RecordsScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/analysis" element={<AnalysisScreen />} />
          </Routes>
        </Container>
      </AuthProvider >
    </Router>
  );
}

export default App;