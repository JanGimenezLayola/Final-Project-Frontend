import React, { Component } from 'react';

import withAuth from './../components/withAuth';

import tripsService from '../services/trips-service';


class TripsList extends Component {

  state = {
    userWithTrips: [],
  }



  componentDidMount() {
    tripsService.list()
    .then( (user) => {
      return this.setState({
        userWithTrips: user,
      });
      
    })
    .catch( error => console.log(error) )
  }


  
  render() {   
    return (
      <>
            <section>
              <section className=''>
                <a href="/trip/create">Create a new trip</a>
                {this.state.userWithTrips.trips ? this.state.userWithTrips.trips.map((trip)=> {
                  return <a href={`/dashboard/${trip._id}`}>{trip.name}</a>
                }) : null}
              </section>
            </section>
      </>
    )
  }
}

export default withAuth(TripsList);