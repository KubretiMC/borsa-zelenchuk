import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import OffersScreen from './screens/OffersScreen';
import OfferDetailsScreen from './screens/OfferDetailsScreen';
import ReserveScreen from './screens/ReserveScreen';
import AddOfferScreen from './screens/AddOfferScreen';
import ProfileScreen from './screens/ProfileScreen';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/offers" element={<OffersScreen />} />
        <Route path="/offer/:id" element={<OfferDetailsScreen />} />
        <Route path="/offer/:id/reserve" element={<ReserveScreen />} />
        <Route path="/add-offer" element={<AddOfferScreen />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
