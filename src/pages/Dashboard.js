import React, { Component } from 'react'
import withAuth from '../components/withAuth';


import Countdown from '../components/Countdown.jsx'
import Popup from '../components/PopupActivities.jsx'
import PopupUpdate from '../components/PopupUpdate.jsx'
import SearchBar from '../components/SearchBar.jsx'

import tripsService from '../services/trips-service';
import usersService from '../services/users-services';
import tripInfoService from '../services/trip-info-service';

import moment from 'moment';

class Dashboard extends Component {

  state = {
    country: '',
    date: '',
    name: '',
    showPopup: false,
    updatePopup: false,
    activities: [],
    users: []
  }

  componentDidMount() {
 
    const id = this.props.match.params.id
    const userId = this.props.user._id

    tripInfoService.getInfo()
    .then ((response) => { console.log(response)})
    tripsService.activitiesList (id)
    .then( (response) => {    
      response.activities.sort(function(a, b) {
        return a.date>b.date ? 1 : a.date<b.date ? -1 : 0
      });
      
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

 handleSearchBarChange(props) {

 }

  togglePopup() {  
    this.setState({  
         showPopup: !this.state.showPopup  
    })
  }
  togglePopupUpdate(id) {      
    this.setState({  
         updatePopup: !this.state.updatePopup,
         activityId: id
    })
  }

  render() {     
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
            activityId={this.state.activityId}
            props={this.props}
          /> 
          : null 
        }
           <>
          <article className='card'>
            {moment().format('MMMM DD YYYY, h:mm a') > moment(this.state.date).format('MMMM DD YYYY, h:mm a') ?
             <Countdown timeTillDate={moment(this.state.date).format('MMMM DD YYYY, h:mm a')} timeFormat="MM DD YYYY, h:mm a" /> 
             :
             <h3>Enjoy your trip!</h3>}
          </article>
          <article className='card card-activities'>
            <button onClick={this.togglePopup.bind(this)}>Add new activity</button> 
            {this.state.activities.length > 0 ? this.state.activities.map((activity) => {
              return (
                <article className='activities'>
                  <section className='date-hour'>
                    <h3>{moment(activity.date).format('H:mm')}</h3>
                    <section>
                      <h3>{moment(activity.date).format('DD')}</h3>
                      <h3>/</h3>
                      <h3>{moment(activity.date).format('MMM')}</h3>
                    </section>
                  </section>
                  <h3 >{activity.name}</h3>  
                  <section>
                    <button onClick={() => {this.handleDelete(activity._id)}}>X</button>
                    <button onClick={this.togglePopupUpdate.bind(this, activity._id)}>Edit</button> 
                  </section>
                </article>
              )
            }): null }
          </article>         
          <article className='card card-activities'>
            <SearchBar props={this.props} />
          </article>
          <article className='card'>

          </article>
          </>   
        
      </section>
    )
  }
}

export default withAuth(Dashboard);