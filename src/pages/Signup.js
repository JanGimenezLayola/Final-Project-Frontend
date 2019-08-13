import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import withAuth from '../components/withAuth';


class Signup extends Component {

  state = {
    email: '',
    password: '',
    passwordRepeat: '',
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const passwordRepeat = this.state.passwordRepeat;

    this.props.signup({ email, password, passwordRepeat })
      .then( (user) => {
        console.log(user)
        this.setState({
            email: '',
            password: '',
            passwordRepeat: '',
        });
      })
      .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { email, password , passwordRepeat} = this.state;
    return (
      <section className="main-splash">
        <form onSubmit={this.handleFormSubmit}>
          <input id='email' type='email' name='email' placeholder='email' value={email} onChange={this.handleChange} autoComplete="username"/>
          <input id='password' type='password' name='password' placeholder='password' value={password} onChange={this.handleChange} autoComplete="new-password" />
          <input id='passwordRepeat' type='password' name='passwordRepeat' placeholder=' repeat password' value={passwordRepeat} onChange={this.handleChange} autoComplete="new-password" />
          <input className='submit-button' type='submit' value='Signup' />
        </form>

        <p>Already have account? 
          <Link to={'/'}> Login</Link>
        </p>

      </section>
    )
  }
}

export default withAuth(Signup);