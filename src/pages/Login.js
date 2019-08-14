import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'

import withAuth from '../components/withAuth';

class Login extends Component {
  state = {
    username: '',
    password: '',
  }

  // handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   const { email, password } = this.state

  //   this.props.login({ email, password })
  //   .then( (user) => {
  //     console.log(user)
  //   })
  //   .catch( error => console.log(error) )
  // }

  handleChange = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
  }

  render() {
    const { email, password } = this.state;
    return (
      <section className="main-splash">
        <Form autoComplete="off" >
          <section>
            <Field type='email' name='email' placeholder='email' />
            {/* <input id='email' type='email' name='email' placeholder='email' value={email} onChange={this.handleChange} autoComplete="email" /> */}
          </section>
          <section>
            <Field type='password'name='password' placeholder='password' />
            {/* <input id='password' type='password' name='password' placeholder='password' value={password} onChange={this.handleChange} autoComplete="current-password"/> */}
          </section>
          <section>
            <button className='submit-button' type='submit'>Login</button>
            <p>You don't have an accout yet?
              <Link to={'/signup'}>Signup</Link>
            </p>
          </section>
        </Form>

        
      </section>
    )
  }
}

export default withAuth(withFormik({
  mapPropsToValues({ email, password }) {
    return ({
      email: email || '',
      password: password || '',
    })		
  },
  handleSubmit(values, bag)  {
    const email = values.email;
    const password = values.password;
    bag.props.login({ email, password })
    .then( (user) => {
      this.setState({
          email: '',
          password: '',
      })
    })
    .catch( error => console.log(error) )
  },
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .email('wrong email')
      .required('email is required'),
    password: Yup.string()
      .required('password is required')
      .min(8),
  }),
})(Login));