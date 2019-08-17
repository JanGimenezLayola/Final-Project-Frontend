import React, { Component } from 'react'
import withAuth from '../components/withAuth';


// import Countdown from '../components/Countdown.jsx'

import tripsService from '../services/trips-service';

class Dashboard extends Component {

  state = {
    country: '',
    date: '',
    name: '',
  }

  componentDidMount() {
    const id = this.props.match.params.id
    tripsService.view(id)
    .then( (response) => {
      this.setState({
        name: response[0].name,
        country: response[0].country,
        date: response[0].date
      })     
    })
  }

  render() { 
  
    console.log(this.props)
    // const tripId = ;
    // console.log(tripId);
    // tripsArray.map((trip) => {
    //   if(trip.props.user)
    // })
    return (
      <>
        <h1>{this.state.name}</h1>
        <article>
          {/* <Countdown /> */}
        </article>
        
      </>
    )
  }
}

export default withAuth(Dashboard);