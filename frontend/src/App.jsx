import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Community from './pages/Community';
import SignIn from './pages/SignIn';
import Footer from './components/Footer';
import Signup from './pages/Signup';
import TextInterview from './pages/TextInterview';
import VideoInterview from './pages/VideoInterview';
import Analytics from './pages/Analytics';
import Scheduler from './pages//Scheduler';
import Quiz from './pages/Quiz'
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/community" element={<Community />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<Signup />} />
              <Route path='/textInterview' element={<TextInterview />} />
              <Route path='/videoInterview' element={<VideoInterview />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path='/scheduler' element={<Scheduler />} />
              <Route path='/analytics' element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;