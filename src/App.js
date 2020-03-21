import React from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8080');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const payload = JSON.parse(message.data)
      console.log(payload)
      if (payload.count) {
        this.setState({ count: payload.count })
        console.log('Updated Count ===', payload.count)
      }
    };
  }

  webClick() {
    const count = this.state.count < 5 ? this.state.count + 1 : 0
    this.setState({ count })

    console.log('CLICK ' + count)

    const payload = {
      source: 'Crowd',
      count
    }
    client.send(JSON.stringify(payload))
  }

  render() {
    return (
      <div className="App" >
        <h1>THE CROWD</h1>
        <button onClick={() => this.webClick()}>PRESS ME</button>
        <h1>Current count {this.state.count}</h1>
      </div>
    )
  }
}

export default App;
