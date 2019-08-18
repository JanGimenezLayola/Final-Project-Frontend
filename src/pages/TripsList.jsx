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

  // handleDelete(id) {
  //   console.log('im handleDelete');
  //   tripsService.delete(id)
  //   .then( (response) => {
  //     console.log('----frontend response', response);
      
  //     return response;
  //   })
  //   .catch( error => console.log(error) )
  // }


  
  render() {   
    return (
      <>
            <section className='dashboard-container'>
                <a className='card' id='button-create' href="/trip/create"><p>Create a new trip</p></a>
                {this.state.userWithTrips.trips ? this.state.userWithTrips.trips.map((trip)=> {
                  return (
                    <section className='card'>
                      <a href={`/dashboard/${trip._id}`}>
                        <h1>{trip.name}</h1>
                        <h3>{trip.country}</h3>
                        <p>{trip.date}</p>
                      </a>
                      <section className='card-buttons'>
                        <button >Edit</button>
                        {/* <button onClick={this.handleDelete(trip._id)}>Delete</button> */}
                      </section>
                    </section>
                  ) 
                }) : null}
            </section>
      </>
    )
  }
}

export default withAuth(TripsList);