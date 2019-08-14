import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withAuth from '../components/withAuth';

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state

    this.props.login({ email, password })
    .then( (user) => {
      console.log(user)
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { email, password } = this.state;
    return (
      <section className="main-splash">
        <form onSubmit={this.handleFormSubmit}>
          <input id='email' type='email' name='email' placeholder='email' value={email} onChange={this.handleChange} autoComplete="email" />
          <input id='password' type='password' name='password' placeholder='password' value={password} onChange={this.handleChange} autoComplete="current-password"/>
          <input className='submit-button' type='submit' value='Login' />
        </form>

        <p>You don't have an accout yet?
            <Link to={'/signup'}>Signup</Link>
        </p>
      </section>
    )
  }
}

export default withAuth(Login);