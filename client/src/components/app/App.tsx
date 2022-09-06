import React from 'react';
import AppHeader from 'src/components/appHeader/appHeader';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from 'src/pages/HomePage';
import UserProfilePage from 'src/pages/UserProfilePage';

const App = () => {
  return (
    <Router>
      <div>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
