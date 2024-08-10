import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RegisterSociety from './pages/forms/registerSociety';
import RegisterSecretary from './pages/forms/registerSecretary';
import LoginForm from './pages/forms/login';
import AdminDashboard from './pages/dashboard/adminDashboard';
import ProtectedRoute from './ProtectedRoute';
import SecretaryDashboard from './pages/dashboard/secretaryDashboard'; // Corrected import
import About from './about';
import ContactUs from './contact';
import RegisterOwner from './pages/forms/registerOwner';
import AddAmenities from './pages/forms/addAmenties';
import AddAnnouncement from './pages/forms/addAnnouncement';
import OwnerDashboard from './pages/dashboard/ownerDashboard';
import AmenitiesTable from './pages/table/amenitiesTable';
import AnnouncementsTable from './pages/table/announcementTable';
import Home from './Home';

function App() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/about" component={About} />
      <Route path="/contact" component={ContactUs} />

      <Route path="/login" component={LoginForm} />
      <Route path="/registerOwner" component={RegisterOwner} />
      <Route path="/registerSociety" component={RegisterSociety} />
      <Route path="/registerSecretary" component={RegisterSecretary} />


      <Route path="/addAmenities" component={AddAmenities} />
      <Route path="/addAnnouncement" component={AddAnnouncement} />


      <Route path="/amenitiesTable" component={AmenitiesTable} />
      <Route path="/announcementTable" component={AnnouncementsTable} />

      {/* Protected routes */}
      <ProtectedRoute path="/adminDashboard" component={AdminDashboard} />
      <ProtectedRoute path="/ownerDashboard" component={OwnerDashboard} />
      <ProtectedRoute path="/secretaryDashboard" component={SecretaryDashboard} /> {/* Corrected component name */}
      
      {/* Redirect to login page if route not found */}
      <Route path="/" exact component={Home} />
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
