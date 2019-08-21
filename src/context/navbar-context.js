import React, { Component } from 'react';


export const NavbarContext = React.createContext();

class NavbarProvider extends Component {

  state = {
    isNavbarOpen: false
  }

  navOpen = () => {
    return (
      this.setState({
        isNavbarOpen: true,
      }))
  }

  render() {
    const { isNavbarOpen } = this.state;
    return (
      <>
          <NavbarContext.Provider value={
            {
              isNavbarOpen: this.isNavbarOpen
            }
          }> 
            {this.props.children}
          </NavbarContext.Provider>
      </>
    )
  }
}

export default NavbarProvider;