import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import EnvironmentPage from './pages/EnvironmentPage';
import HomePage from './pages/HomePage';
import JobBoardPage from './pages/JobBoardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SplashPage from './pages/SplashPage';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact={true} >
          <SplashPage />
        </Route>
        <Route path='/login' exact={true}>
          <LoginPage />
        </Route>
        <Route path='/signup' exact={true}>
          <SignupPage />
        </Route>
        <ProtectedRoute path='/environments/:environmentId' exact={true} >
          <EnvironmentPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/jobs/:jobId' exact={true} >
          <JobBoardPage />
        </ProtectedRoute>
        <ProtectedRoute path='/home' exact={true} >
          <HomePage/>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
