import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SplashPage from './pages/SplashPage';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import BettingPage from './pages/BettingPage';
import QueuePage from './pages/QueuePage';
import GamePage from './pages/GamePage';
import PaymentPage from './pages/PaymentPage';
import RankingPage from './pages/RankingPage';
import ProfilePage from './pages/ProfilePage';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './App.css';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<SplashPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/betting" element={<BettingPage />} />
            <Route path="/queue" element={<QueuePage />} />
            <Route path="/game" element={<GamePage />} />
                      <Route path="/payment" element={<PaymentPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
