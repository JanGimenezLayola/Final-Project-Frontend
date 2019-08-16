import React, {Component} from 'react';
import {BrowserRouter as Router, Route,  Switch} from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NotFound from './pages/NotFound'
import CreateTrip from './pages/CreateTrip'

import Navbar from './components/Navbar';
import PrivateRoute from './components/routes/PrivateRoute';

import AuthProvider from './context/auth-context'
import AnonRoute from './components/routes/AnonRoute';

import './styles/App.scss';


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
              <PrivateRoute exact path="/trip/create" component={CreateTrip} />              
              <Route component={NotFound}/>
            </Switch>
          </div>
        </AuthProvider>
      </Router>
    )
  }
}

export default App;
