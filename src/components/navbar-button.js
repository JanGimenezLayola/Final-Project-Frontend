import React, { Component } from 'react'

import { Link } from 'react-router-dom'

class NavbarButton extends Component {

render() {
  return (
    <Link to={this.props.route}>
      <button className='navbar-button'>{this.props.title}</button>
    </Link>
  )
}
}

export default NavbarButton
