import React, { Component } from 'react'
import withAuth from '../components/withAuth';


import Countdown from '../components/Countdown.jsx'
import Popup from '../components/PopupActivities.jsx'
import PopupUpdate from '../components/PopupUpdate.jsx'

import tripsService from '../services/trips-service';
import moment from 'moment';

class Dashboard extends Component {

  state = {
    country: '',
    date: '',
    name: '',
    showPopup: false,
    updatePopup: false,
    activities: []
  }

  componentDidMount() {
    const id = this.props.match.params.id
    tripsService.activitiesList (id)
    .then( (response) => {    
      console.log(response);
       
      this.setState({
        name: response.name,
        country: response.country,
        date: response.date,
        activities: response.activities
      })   
    })
    .catch(error => console.log(error) )
  }

  handleDelete(id) {
    tripsService.activityDelete(id)
    .then((response) => {
      this.setState({
        activities: response
      })
    })
  }

 

  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    })
  }
  togglePopupUpdate(id) {  
    this.setState({  
         updatePopup: !this.state.updatePopup,
         activitiId: id
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
          : null 
        }
        {this.state.updatePopup ?  
          <PopupUpdate  
            text='Update activity'  
            closePopup={this.togglePopupUpdate.bind(this)}  
            props={this.props}
          /> 
          : null 
        }
           <>
          <article className='card'>
          {/* <Countdown tripdate={moment(this.state.date).format('MMMM Do YYYY, h:mm a')} /> */}
          <Countdown timeTillDate={moment(this.state.date).format('MMMM DD YYYY, h:mm a')} timeFormat="MM DD YYYY, h:mm a" />
          </article>
          <article className='card'>
            <button onClick={this.togglePopup.bind(this)}>Add new activity</button> 
            {/* {console.log(this.state.activities) } */}
            {this.state.activities.length > 0 ? this.state.activities.map((activity) => {
              return (
                <article>
                  <h3>{activity.name}</h3>
                  <button onClick={() => {this.handleDelete(activity._id)}}>X</button>
                  <button onClick={this.togglePopupUpdate.bind(this, activity._id)}>Edit</button> 
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