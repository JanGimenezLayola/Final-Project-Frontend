import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import withAuth from './withAuth';

// import tripsService from '../services/trips-service';

import NavbarButton from './navbar-button'


class Navbar extends Component {

  state = {
    menu: false,
    userWithTrips: [],
    selectCountry: false
  }

  setMenuFalse() {
    this.setState({
      menu: false
    })
  }

  setMenuFalseAndLogout() {
    this.props.logout()
    this.setState({
      menu: false
    })
  }

  componentDidMount() {    
    this.props.me()
    .then (() => {
      this.setState({
        menu: false
      })      
    })
  }

  handleClick = () => {
      this.setState({
        menu: !this.state.menu
      })
  }  

  
  render() {   
    
     return (
      <>
        {this.props.isLoggedIn ? ( console.log('render', this.state),
          <nav  className={this.state.menu ? 'navbar-opened' : 'navbar-closed'}>
            {this.state.menu ? <p>Open</p> : <p>Closed</p>}
            <div className='click-navbar' onClick={this.handleClick}></div>
            <section className='img-section'>
              <div className='image-container'>
                <img src={this.props.user.image} alt="profile"/>
                <section id='profile-edit'>
                  <Link to='/'><p>edit profile</p></Link>
                </section>
              </div>
              <section className='nav-buttons buttons-links'>
                <NavbarButton route='/' title='My Tickets'/>
                <NavbarButton route='/' title='Budget'/>
                <NavbarButton route='/' title='Information'/>
                <button className='logout-button' onClick={() => this.setMenuFalseAndLogout()}>Logout</button>
              </section>
            </section>
            <section>
              <Link to='/' onClick={() => this.setMenuFalse()} className='country-selector'>Select your trip</Link>
            </section>
          </nav>
        ) : null }   
      </>
    )
  }
}

export default withAuth(Navbar);