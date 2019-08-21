import React, { Component } from 'react';

import { Link } from 'react-router-dom'

import withAuth from './../components/withAuth';

import tripsService from '../services/trips-service';

import moment from 'moment';


class TripsList extends Component {

  state = {
    trips: [],
  }



  componentDidMount() {        
    this.props.me()
    .then (() => {
      tripsService.list()
    .then( (user) => {
      return this.setState({
        trips: user.trips,
      });
    })
    .catch( error => console.log(error) )
    })
    
    
  }
    
  handleDelete(id) {
    tripsService.delete(id)
    .then( (response) => {            
      return this.setState({
        trips: response,
      });
    })
    .catch( error => console.log(error) )
  }


  
  render() {       
    return (
      <>
            <section className='dashboard-container'>
                <a className='card' id='button-create' href="/trip/create"><p>Create a new trip</p></a>
                {this.state.trips ? this.state.trips.map((trip)=> {
                  return (
                    <section className='card'>
                      <Link to={`/dashboard/${trip._id}`} >
                        <h1>{trip.name}</h1>
                        <h3>{trip.country}</h3>
                        <p>{moment(trip.date).format('LL')}</p>
                      </Link>
                      <section className='card-buttons'>
                        <button >Edit</button>
                        <button onClick={() => this.handleDelete(trip._id)}>Delete</button>
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