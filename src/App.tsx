import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer';
import HomePage from './pages/HomePage/HomePage';
import WalletsPage from './pages/WalletsPage/WalletsPage';
import './styles/index.scss';
import { Provider } from 'react-redux';
import store from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
