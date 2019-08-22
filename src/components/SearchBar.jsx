import React, { Component } from 'react'

import withAuth from './../components/withAuth';

import usersService from '../services/users-services';
import tripsService from '../services/trips-service';


class SearchBar extends Component {

  state = {
    value: this.props.value,
    users: [],
    showingUsers: [],
    searchValue: null,
    usersInTrip: [],
    searchbar: false
  }

  componentDidMount = () => {
    const id = this.props.props.match.params.id
    usersService.usersInTrip(id)
    .then ( (response) => {
      this.setState({
        usersInTrip: response
      })      
    })
    usersService.getUsers()
    .then((response) =>{      
      this.setState({
        users: response,
        showingUsers: []
      })
    })
    .catch(error =>{
      console.log(error)
    })
  }

  handleChange = (event) => {  
    const {value} = event.target;
        this.setState({
          value,
          searchValue: value.toLowerCase()
        });        
    const newArray = this.state.users.filter(user => {  
      return user.email.toLowerCase().includes(this.state.searchValue)
    })    
    this.setState({
      showingUsers: newArray
    })
  }

  handleClickAddUser(userId) {
    const id = this.props.props.match.params.id    
    tripsService.addUser(id, userId)
    .then((response) => {
      usersService.usersInTrip(id)
    .then ( (response) => {
      this.setState({
        usersInTrip: response
      })      
    })
    })
  }

  toggleSearchbar() {    
    this.setState({  
      searchbar: !this.state.searchbar,
    })
  }

  render() {
    return (
      <div className='searchbar'>
        {this.state.searchbar ? <button className='addButton' onClick={() => this.toggleSearchbar()}><img  src='./../../delete-icon.png'  alt='add activity'></img></button> : <button className='addButton' onClick={() => this.toggleSearchbar()}><img src='./../../add.png' alt='add activity'></img></button> }
        {this.state.searchbar ?   <form>
          <input type="text" onChange={this.handleChange} value={this.state.value} placeholder='Search users'/>
        </form> : null}
      
        {this.state.showingUsers ? this.state.showingUsers.map((user) => {
          return <button onClick={() => this.handleClickAddUser(user._id)} >{user.name}</button>
        }) : null}
        <section>
          {this.state.usersInTrip ? this.state.usersInTrip.map((user) => {
            if (user) {
              return ( 
              <section>
                <img src={user.image} alt='user'></img>
                <p>{user.name}</p>
              </section>
              )
            }
          }) : <p>Invite your coleagues and plan your trip together</p>}
        </section>
      </div>
    )
  }
}

export default withAuth(SearchBar);
