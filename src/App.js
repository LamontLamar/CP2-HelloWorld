import React, { Component } from 'react';
import './App.css';

var wisdoms = [
  "Amazon Video.",
  "Hulu.",
  "HBO.",
  "Showtime.",
  "Youtube Now",
  "Sling Tv",
  "Netflix."
]


class App extends Component {
  constructor(props) {
    super(props);
    
    var index = Math.floor(Math.random() * wisdoms.length);
    
    this.state = {
      wisdom: wisdoms[index]
    };
    
    this.setRandomWisdom = this.setRandomWisdom.bind(this);
    this.addWisdom = this.addWisdom.bind(this);
    
    this.websocket = new WebSocket('ws://' + window.location.host + '/comm');
    this.websocket.onmessage = this.handleMessage.bind(this);
    // this.websocket.open();
  }
  
  handleMessage(event) {
    var msg = JSON.parse(event.data);
    wisdoms.push(msg.wisdom);
    this.setWisdom(wisdoms.length-1);
  }
  
  setRandomWisdom() {
    var index = Math.floor(Math.random() * wisdoms.length);
    
    this.setWisdom(index);
  }
  
  setWisdom(index) {
    this.setState(function(state) { 
      return {
        wisdom: wisdoms[index]
      }
    });
  }
  
  addWisdom() {
    let wisdom = prompt("What new wisdom do you offer?");
    
    this.websocket.send(JSON.stringify({type: "broadcast", wisdom: wisdom}));
  }
  
  removeCurrentWisdom() {
    var index = wisdoms.indexOf(this.state.wisdom);
    wisdoms.splice(index, 1);
  }
  
  render() {
    return (
      <div className="App">
        {this.state.wisdom}
        <button className="more" onClick={this.setRandomWisdom}>Another</button>
        <button className="new-wisdom" onClick={this.addWisdom}>New</button>
      </div>
    );
  }
}

export default App;
