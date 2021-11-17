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
import { loadUserEnvironments } from './store/environments';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (sessionUser) {
      dispatch(loadUserEnvironments(sessionUser.id))
    }
  }, [dispatch, sessionUser])
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
        <ProtectedRoute path='/environments/:environmentHash' exact={true} >
          <EnvironmentPage/>
        </ProtectedRoute>
        <ProtectedRoute path='/jobs/:jobHash' exact={true} >
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
