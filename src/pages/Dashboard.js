import React, { Component } from 'react'
import withAuth from '../components/withAuth';


import Countdown from '../components/Countdown.jsx'
import Popup from '../components/PopupActivities.jsx'

import tripsService from '../services/trips-service';

class Dashboard extends Component {

  state = {
    country: '',
    date: '',
    name: '',
    showPopup: false,
    activities: {
      name: '',
      date: '',
      id: ''
    }
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
      tripsService.activitiesList(id)
      .then( (response) => {
        console.log(response);
        this.setState({
          activities: response
        })
      })
        .catch( error => console.log(error) )
    })
    .catch(error => console.log(error) );
  };




  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    })
  }

  render() { 
    console.log(this.state);
    
    return (
      <section className='dashboard-container'>
        <h1 className='trip-name'>{this.state.name}</h1>
        {this.state.showPopup ?  
          <Popup  
            text='Add a new activity'  
            closePopup={this.togglePopup.bind(this)}  
            props={this.props}
          /> 
          : null } <>
          <article className='card'>
          <Countdown tripDate={this.state.date} />
          </article>
          <article className='card'>
            <button onClick={this.togglePopup.bind(this)}>Add new activity</button> 
            {this.state.activities.activities ? this.state.activities.activities.map((activity) => {
              return (
                <article>
                  <h3>{activity.name}</h3>
                </article>
              )
            }): null }
          </article>         
          <article className='card'>
          </article>
          <article className='card'>
            
          </article>
          </>   
        
      </section>
    )
  }
}

export default withAuth(Dashboard);