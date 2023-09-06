import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import OffersScreen from './screens/OffersScreen';
import OfferDetailsScreen from './screens/OfferDetailsScreen';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/offers" element={<OffersScreen />} />
        <Route path="/offer/:id" element={<OfferDetailsScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
