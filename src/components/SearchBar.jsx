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

  }

  componentDidMount = () => {
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
      console.log('ClickAddUser RESPONSE', response);
      
    })
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" onChange={this.handleChange} value={this.state.value}/>
        </form>
        {this.state.showingUsers ? this.state.showingUsers.map((user) => {
          return <button onClick={() => this.handleClickAddUser(user._id)} >{user.email}</button>
        }) : null}
      </div>
    )
  }
}

export default withAuth(SearchBar);
