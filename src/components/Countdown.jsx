import React, { Component } from "react";
import Clock from "./Clock";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      deadline: ""
    };
  }

  componentDidMount(props) {
    console.log(this.props);
    
    this.setState({
      deadline: this.props.tripDate
    
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-title">Countdown Timer</div>
        <div className="App-date">{this.state.deadline}</div>
        <Clock deadline={this.state.deadline} />
      </div>
    );
  }
}
export default App;