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
           <section className='dashboard-container'>
                <a className='card' id='button-create' href="/trip/create"><p>Create a new trip</p></a>
                {this.state.trips.length ? this.state.trips.map((trip)=> {
                  return (
                    <section className='card'>
                      <Link to={`/dashboard/${trip._id}`} >
                        <h1>{trip.name}</h1>
                        <h3>{trip.country}</h3>
                        <p>{moment(trip.date).format('LL')}</p>
                      </Link>
                      <section className='card-buttons'>
                        {/* <button >Edit</button> */}
                        <img onClick={() => this.handleDelete(trip._id)} src='./../../delete-icon.png' alt='delete trip'></img>
                      </section>
                    </section>
                  ) 
                }) : 
                <section className='no-trips-container'>
                  <h3 className='not-trip'> You didn't create any trip yet, <a href="/trip/create">create one</a> or ask another user to add in her trip.</h3>
                  <img src='../../travel.png' alt='world and tipic travel things'></img>
                </section>
                }
            </section>
    )
  }
}

export default withAuth(TripsList);