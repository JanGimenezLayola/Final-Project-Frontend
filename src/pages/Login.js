import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup'

import withAuth from '../components/withAuth';

class Login extends Component {
  state = {
    email: '',
    password: '',
  }

  render() {
    return (
      <section className="main-splash">
        <Form autoComplete="off" >
          <section className='form-sections'>
            <Field type='email' name='email' placeholder='email' />
            {this.props.touched.email && this.props.errors.email && <p className='form-error'>{this.props.errors.email}</p>}
          </section>
          <section className='form-sections'>
            <Field type='password'name='password' placeholder='password' />
          {this.props.touched.password && this.props.errors.password && <p className='form-error'>{this.props.errors.password}</p>}
          </section>
          <section className='form-sections'>
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
    // if(re(200))
    .then( () => {
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
  }),
})(Login));