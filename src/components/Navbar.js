import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import withAuth from './withAuth';

import NavbarButton from './navbar-button'


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
              {this.state.menu}
              <section id='profile-edit'>
                <Link to='/'><p>edit profile</p></Link>
                <h3>Welcome {this.props.user.email}</h3>
              </section>
            </div>
            <section className='nav-buttons'>
              <NavbarButton route='/' title='My Tickets'/>
              <NavbarButton route='/' title='Budget'/>
              <NavbarButton route='/' title='Information'/>
              <button className='logout-button' onClick={this.props.logout}>Logout</button>
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