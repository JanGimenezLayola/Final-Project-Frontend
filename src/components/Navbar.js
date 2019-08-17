import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import withAuth from './withAuth';

import tripsService from '../services/trips-service';

import NavbarButton from './navbar-button'


class Navbar extends Component {

  state = {
    menu: false,
    userWithTrips: [],
    selectCountry: false
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
  
  handleSelect = () => {
    if(this.state.selectCountry){
      this.setState({
        selectCountry: false
      })
    }else{
      this.setState({
        selectCountry: true
      })
    }
  }

  componentDidMount() {
    tripsService.list()
    .then( (user) => {
      console.log(user, ' --- frontend trips user')
      return this.setState({
        userWithTrips: user,
      });
    })
    .catch( error => console.log(error) )
  }

  render() {   
    const classMenu = this.state.menu ? 'navbar-opened' : 'navbar-closed';
    const classSelector = this.state.selectCountry ? 'selector-opened' : 'selector-closed';    
    return (
      <>
        {this.props.isLoggedIn ? (
          <nav  className={classMenu}>
            <div className='click-navbar'onClick={this.handleClick}></div>
            <div className='image-container'>
              <img src={this.props.user.image} alt="hola"/>
              {this.state.menu}
              <section id='profile-edit'>
                <Link to='/'><p>edit profile</p></Link>
              </section>
            </div>
            <section className='nav-buttons buttons-links'>
              <h3>Welcome {this.props.user.email}</h3>
              <NavbarButton route='/' title='My Tickets'/>
              <NavbarButton route='/' title='Budget'/>
              <NavbarButton route='/' title='Information'/>
              <button className='logout-button' onClick={this.props.logout}>Logout</button>
            </section>
            <section>
              <section className={classSelector}>
                {this.state.userWithTrips.trips ? this.state.userWithTrips.trips.map((trip)=> {
                  return <a href={`/dashboard/${trip._id}`}>{trip.name}</a>
                }) : null}
              </section>
              <p onClick={this.handleSelect} className='country-selector'>Select your trip</p>
            </section>
          </nav>
        ) : null }   
      </>
    )
  }
}

export default withAuth(Navbar);