import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import * as sessionActions from "./store/session";
import Navigation from './components/Navigation';
import SpotList from './components/SpotBrowser';
import SpotDetail from './components/SpotDetail';
import CreateSpotForm from './components/CreateSpotForm';

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
          <Route path="/">

          </Route>
        </Switch>
      )}
    </>
  );
}


export default App;