import React, { Component } from 'react';
import withAuth from './withAuth';


class Navbar extends Component {

  state = {
    menu: false
  }

  handleClick = () => {
    if(this.state.menu){
      this.setState({
        menu: false
      })
    }else{
      this.setState({
        menu: true
      })
    }
    
  }

  render() {   
    const classMenu = this.state.menu ? 'navbar-opened' : 'navbar-closed';
    return (
      <>
        {this.props.isLoggedIn ? (
          <nav  className={classMenu} onClick={this.handleClick}>
            <div className='image-container'>
              <img src={this.props.user.image} alt="hola"/>
            </div>
            <section className='nav-buttons'>
              <h1>Welcome {this.props.user.email}</h1>
              <button onClick={this.props.logout}>Logout</button>
            </section>
            <section>
              <h1>Select your trip</h1>
            </section>
          </nav>
        ) : null }   
      </>
    )
  }
}

export default withAuth(Navbar);