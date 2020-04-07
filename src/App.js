import React from 'react';
import './App.css';
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket('ws://127.0.0.1:8080');
// const client = new W3CWebSocket('wss://g298l0uqlc.execute-api.us-east-1.amazonaws.com/dev');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      currentConn: {
        id: "",
        performance_id: 0,
        attendee_id: 0,
        aws_connection_id: "",
        created_at: "",
        source: "crowd"
      }
    };
  }

  componentWillMount() {
    client.onopen = message => {
      const params = {
        source: 'crowd'
      }
      console.log('WebSocket Client Connected\n', message);
      client.send(JSON.stringify({ action: 'connect-source', params }))
    };
    client.onmessage = (message) => {
      const raw = JSON.parse(message.data)
      console.log(raw)

      if (raw.action === 'local-server') {
        console.log(raw.currentConn)
        const fakeAWSID = `${Math.floor(Math.random() * 10000)}`
        const params = {
          source: 'crowd',
          aws_connection_id: fakeAWSID
        }
        client.send(JSON.stringify({ action: 'connect-source', params }))
        raw.currentConn.aws_connection_id = fakeAWSID
        this.setState({ currentConn: raw.currentConn })
      }

      if (raw.action === 'conn-update') {
        console.log(raw.currentConnection)
        this.setState({ currentConn: raw.currentConnection })

      }
    };
  }

  webClick() {
    console.log(this.state)
    const count = this.state.count < 5 ? this.state.count + 1 : 0
    this.setState({ count })

    console.log('CLICK ' + count)

    const payload = {
      source: 'crowd',
      count
    }
    client.send(JSON.stringify(payload))
  }


  render() {
    return (
      <div className="App" >
        <h1>Crowd</h1>
        <button onClick={() => this.webClick()}>PRESS ME</button>
        <h1>Current count {this.state.count}</h1>
        <div>{JSON.stringify(this.state.currentConn)}</div>
      </div>
    )
  }
}

export default App;
