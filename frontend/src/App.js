import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import SpotList from './components/SpotBrowser';
import SpotDetail from './components/SpotDetail';
import EditSpotForm from './components/EditSpotForm';
import EditBookingForm from './components/EditBookingForm';
import PageNotFound from './components/PageNotFound';
import CreateSpotForm from './components/CreateSpotForm';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path={['/', '/spots']} exact>
            <SpotList />
          </Route>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route exact path="/new">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
          <Route exact path="/bookings/:bookingId/edit">
            <EditBookingForm />
          </Route>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      )}
      {/* {!isLoaded && (
        <Redirect to="/login" />
      )} */}
      <Footer />
    </>
  );
}


export default App;