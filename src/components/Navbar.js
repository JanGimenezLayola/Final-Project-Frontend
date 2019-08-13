import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import withAuth from './withAuth';


class Navbar extends Component {
  render() {  
    return (
      <div>
        {this.props.isLoggedIn ? (
          <>
            <p>username: {this.props.user.username}</p>
            <button onClick={this.props.logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </>
        )}   
      </div>
    )
  }
}

export default withAuth(Navbar);