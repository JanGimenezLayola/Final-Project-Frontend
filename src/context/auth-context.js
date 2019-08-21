import React, { Component } from 'react';

import authService from '../services/auth-service'

export const AuthContext = React.createContext();

class AuthProvider extends Component {

  state = {
    isLoggedIn: false,
    user: {},
    isLoading: true
  }

  userSignUp = (user) => {
    console.log(user)
    return authService.signup(user)
    .then((user) => {
      this.setState({
        isLoggedIn: true,
        user,
        isLoading: false
      })
    })
  }

  userLogin = (user) => {
    return authService.login(user)
    .then((user) => {
      this.setState({
        isLoggedIn: true,
        user,
        isLoading: false
      })
    })
  }

  userLogout = () => {
    return authService.logout()
    .then(() => {
      this.setState({
        isLoggedIn: false,
        user: {},
        isLoading: false
      })
    })
    .catch((error) => {
      this.setState({
        isLoggedIn: false,
        user: {},
        isLoading: false
      })
    })
  }

  getMe = () => {
    return (authService.me()
    .then((user) => {
      this.setState({
        user,
        isLoggedIn: true,
        isLoading: false
      })
    }).catch((user)=>{
      this.setState({
        user,
        isLoggedIn: false,
        isLoading: false
      })
    }))
  }

  componentDidMount() {
    this.getMe();
  }

  render() {
    const { user, isLoggedIn, isLoading } = this.state;
    return (
      <>
        {isLoading ? (<section className='loading'><img src='./../../loading.gif' alt='Loading'></img></section>) : (
          <AuthContext.Provider value={
            {
              user,
              isLoggedIn,
              login: this.userLogin,
              signup: this.userSignUp,
              logout: this.userLogout,
              me: this.getMe
            }
          }> 
            {this.props.children}
          </AuthContext.Provider>
        )}
      </>
    )
  }
}

export default AuthProvider;
