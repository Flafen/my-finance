import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import WalletsPage from './pages/WalletsPage/WalletsPage';
import './styles/index.scss';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="/wallets"
          element={<WalletsPage />}
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
