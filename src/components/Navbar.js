import React, { Component } from 'react';
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
        ) : null }   
      </div>
    )
  }
}

export default withAuth(Navbar);