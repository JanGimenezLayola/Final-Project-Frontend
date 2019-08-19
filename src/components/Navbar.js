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

  componentDidMount() {
    this.setState({
      menu: false
    })
  }


  // componentDidMount() {
  //   tripsService.list()
  //   .then( (user) => {
  //     return this.setState({
  //       userWithTrips: user,
  //     });
  //   })
  //   .catch( error => console.log(error) )
  // }

  render() {   
    const classMenu = this.state.menu ? 'navbar-opened' : 'navbar-closed';
     return (
      <>
        {this.props.isLoggedIn ? (
          <nav  className={classMenu}>
            <div className='click-navbar'onClick={this.handleClick}></div>
            <section className='img-section'>
              <div className='image-container'>
                <img src={this.props.user.image} alt="hola"/>
                <section id='profile-edit'>
                  <Link to='/'><p>edit profile</p></Link>
                </section>
              </div>
              <section className='nav-buttons buttons-links'>
                <NavbarButton route='/' title='My Tickets'/>
                <NavbarButton route='/' title='Budget'/>
                <NavbarButton route='/' title='Information'/>
                <button className='logout-button' onClick={this.props.logout}>Logout</button>
              </section>
            </section>
            <section>
              <Link to='/' className='country-selector'>Select your trip</Link>
            </section>
          </nav>
        ) : null }   
      </>
    )
  }
}

export default withAuth(Navbar);