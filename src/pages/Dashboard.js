import React, { Component } from 'react'
import withAuth from '../components/withAuth';

import tripsService from '../services/trips-service';


class Dashboard extends Component {

  state = {
    userWithTrips: [],
  }

  componentDidMount() {
    tripsService.view()
    .then( (user) => {
      console.log(user, ' --- frontend trips user')
      return this.setState({
        userWithTrips: user,
      });
    })
    .catch( error => console.log(error) )
  }

  render() { 
    console.log(this.state.userWithTrips.length)
    console.log(this.state.userWithTrips.trips)
    return (
      <>
        {this.state.userWithTrips.trips ? this.state.userWithTrips.trips.map((trip)=> {
          return <p>{trip.name}</p>
        }) : null}
      </>
    )
  }
}

export default withAuth(Dashboard);