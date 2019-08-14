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
    if(password === passwordRepeat) {
      console.log(email, password)
      this.props.signup({ email, password})
      .then( (user) => {
          console.log('Estic al then')
          this.setState({
              email: '',
              password: '',
              passwordRepeat: '',
          })
        })
      .catch( error => console.log(error) )
    } else {
      console.log('Maaaaaaal')
    }
  } 

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  };

  render() {
    const { email, password , passwordRepeat} = this.state;
    console.log(passwordRepeat)
    return (
      <section className="main-splash">
        <form onSubmit={this.handleFormSubmit}>
          <input id='email' type='email' name='email' placeholder='email' value={email} onChange={this.handleChange} autoComplete="email"/>
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