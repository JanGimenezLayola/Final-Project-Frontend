import React, {Component} from 'react';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound'

import Navbar from './components/Navbar';
import PrivateRoute from './components/routes/PrivateRoute';

import AuthProvider from './context/auth-context'
import AnonRoute from './components/routes/AnonRoute';

import './App.scss';


class App extends Component {
  render() {
    return (
      <Router>
        <AuthProvider>
          <div className="container">
            <Navbar />
            <Switch>
              <AnonRoute exact path="/" component={Login} />
              <AnonRoute exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <Route component={NotFound}/>
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
