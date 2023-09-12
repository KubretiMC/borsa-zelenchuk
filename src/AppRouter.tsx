import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import OffersScreen from './screens/OffersScreen';
import OfferDetailsScreen from './screens/OfferDetailsScreen';
import ReserveScreen from './screens/ReserveScreen';
import AddOfferScreen from './screens/AddOfferScreen';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/offers" element={<OffersScreen />} />
        <Route path="/offer/:id" element={<OfferDetailsScreen />} />
        <Route path="/offer/:id/reserve" element={<ReserveScreen />} />
        <Route path="/add-offer" element={<AddOfferScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
