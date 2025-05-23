import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import WalletsPage from './pages/WalletsPage/WalletsPage';
import './styles/index.scss';
import { useAppSelector } from './utils/hooks';
import Login from './pages/Login/Login';

const App: React.FC = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Router>
      {isAuthenticated ? (
        <>
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
        </>
      ) : (
        <Routes>
          <Route
            path="*"
            element={<Login />}
          />
        </Routes>
      )}
    </Router>
  );
};

export default App;
